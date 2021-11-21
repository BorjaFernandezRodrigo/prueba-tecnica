import { ENTER, SEMICOLON } from '@angular/cdk/keycodes';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Options } from './types/search.type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnChanges {
  @Output() valuesOutput: EventEmitter<Array<any>> = new EventEmitter();

  @Input() valuesInput: any[];

  @Input() titulo: string;

  @Input() options: Options;

  @Input() keysSearch: { name?: string; prop: string }[];

  @ViewChild('keyInput', { static: false })
  fieldInput: ElementRef<HTMLInputElement>;

  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  @ViewChild(MatAutocompleteTrigger, { static: false })
  autocomplete: MatAutocompleteTrigger;

  separatorKeysCodes: number[] = [ENTER, SEMICOLON];

  public keySearch: string;

  public paramsSerach: string[] = [];

  public form = new FormControl();

  public valuesSearch: Array<any>;

  public filteredkeys: Observable<{ name?: string; prop: string }[]>;

  public selectOption: boolean;

  public disableAutoComplete: boolean;

  constructor() {
    this.filteredkeys = this.form.valueChanges.pipe(
      startWith(null),
      map((names: { name?: string; prop: string }) => {
        return names ? this._filter(names) : this.keysSearch;
      }),
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.valuesInput && !changes.valuesInput.isFirstChange()) {
      this.initParam();
    }
  }

  ngOnInit() {
    this.initParam();
  }

  initParam() {
    this.disableAutoComplete = false;
    this.selectOption = false;
    this.valuesSearch = [];
    this.OnEnableAutocomplete();
    this.valuesOutput.emit(this.valuesInput);
    if (!this.keysSearch && this.valuesInput) {
      this.keysSearch = this.buildKeysSearch();
    }
  }

  OnEnableAutocomplete() {
    this.form.valueChanges.subscribe((value) => {
      if ((value && value !== '') || this.paramsSerach.length > 0) {
        this.disableAutoComplete = true;
      } else {
        this.disableAutoComplete = false;
      }
    });
  }

  buildKeysSearch() {
    const aux = [];
    if (this.valuesInput[0]) {
      Object.keys(this.valuesInput[0]).forEach((value) => {
        aux.push({ prop: value });
      });
    }
    return aux;
  }

  onClearall() {
    this.paramsSerach = [];
    this.form.setValue('');
    this.valuesSearch = [];
    this.valuesOutput.emit(this.valuesInput);
  }

  onClearInput() {
    this.form.setValue('');
  }

  selectedKey(event: any) {
    this.selectOption = true;
    this.fieldInput.nativeElement.value = event.option.viewValue + ':';
    this.autocomplete.closePanel();
  }

  removeChip(paramSerach) {
    const index = this.paramsSerach.indexOf(paramSerach);
    if (index >= 0) {
      this.paramsSerach.splice(index, 1);
      if (this.paramsSerach.length === 0) {
        this.onClearall();
        this.disableAutoComplete = this.fieldInput.nativeElement.value.length > 0;
      } else {
        const ParamsSearch = this.formatParamsSearch(paramSerach);
        const valueSearch = this.searchValues({
          name: ParamsSearch.name,
          value: ParamsSearch.value,
        });
        this.valuesSearch = this.valuesSearch.filter((val) => {
          return valueSearch.indexOf(val) === -1;
        });
        this.valuesOutput.emit(this.valuesSearch);
      }
    }
  }

  addChip(event: MatChipInputEvent) {
    if (
      (!this.matAutocomplete || !this.matAutocomplete.isOpen) &&
      !this.selectOption &&
      event.value.substring(event.value.indexOf(':') + 1, event.value.length).trim()
    ) {
      const input = event.input;
      const value = event.value;
      this.paramsSerach.push(value.trim());
      this.newParamSerach(value.trim());
      if (input) {
        input.value = '';
      }
      this.disableAutoComplete = true;
      this.onClearInput();
    }
    this.selectOption = false;
  }

  private _filter(
    value: string | { name?: string; prop: string },
  ): { name?: string; prop: string }[] {
    this.disableAutoComplete = false;
    if (typeof value === 'object') {
      return this.keysSearch.filter((keySearch) => {
        return (
          (keySearch.prop &&
            keySearch.prop
              .toString()
              .toLowerCase()
              .indexOf((value.prop || '').toLowerCase()) === 0) ||
          (keySearch.name && keySearch.name.toLowerCase().indexOf(value.name.toLowerCase()) === 0)
        );
      });
    } else if (typeof value === 'string') {
      return this.keysSearch.filter(
        (keySearch) =>
          (keySearch.prop &&
            keySearch.prop.toString().toLowerCase().indexOf(value.toLowerCase()) === 0) ||
          (keySearch.name && keySearch.name.toLowerCase().indexOf(value.toLowerCase()) === 0),
      );
    }
    return [];
  }

  newParamSerach(paramSerach: string) {
    const paramsSearch = this.formatParamsSearch(paramSerach);
    const valueSearch = this.searchValues({
      name: paramsSearch.name,
      value: paramsSearch.value,
    });
    if (valueSearch.length > 0) {
      this.valuesSearch = this.valuesSearch.concat(valueSearch);
      this.valuesSearch = this.valuesSearch.filter((item, index) => {
        return this.valuesSearch.indexOf(item) === index;
      });
    }
    this.valuesOutput.emit(this.valuesSearch);
  }

  formatParamsSearch(paramSerach): { name: string; value: string } {
    let name: string;
    let value: string;
    if (this.keysSearch.length > 1) {
      if (paramSerach.indexOf(':') > 0) {
        name = this.keysSearch.find(
          (find) =>
            find.prop === paramSerach.substr(0, paramSerach.indexOf(':')) ||
            find.name === paramSerach.substr(0, paramSerach.indexOf(':')),
        ).prop;
        value = paramSerach.substr(paramSerach.indexOf(':') + 1);
      } else {
        name = null;
        value = paramSerach;
      }
    } else {
      name = this.buildKeysSearch()[0].name;
      value = paramSerach;
    }
    return { name, value };
  }

  searchValues(paramSearch: { name: string; value: string }) {
    let aux = [];
    if (paramSearch.name) {
      aux = this.valuesInput.filter(this.funcFilter(paramSearch.value, paramSearch.name));
    } else {
      this.keysSearch.forEach((column) => {
        const temp = this.valuesInput.filter(this.funcFilter(paramSearch.value, column.prop));
        if (temp.length !== 0) {
          if (aux.length !== 0) {
            aux = aux.concat(temp);
          } else {
            aux = temp;
          }
        }
      });
    }
    return aux;
  }

  selectChip(paramSerach) {
    this.fieldInput.nativeElement.value = paramSerach;
    this.disableAutoComplete = true;
    this.removeChip(paramSerach);
    this.autocomplete.closePanel();
  }

  funcFilter(value, prop) {
    if (value.indexOf('>=') === 0) {
      return (filtro) => {
        return Number(filtro[prop]) >= Number(value.trim().substr(2).trim());
      };
    } else if (value.indexOf('<=') === 0) {
      return (filtro) => {
        return Number(filtro[prop]) <= Number(value.trim().substr(2).trim());
      };
    } else if (value.indexOf('<') === 0) {
      return (filtro) => {
        return Number(filtro[prop]) < Number(value.trim().substr(1).trim());
      };
    } else if (value.indexOf('>') === 0) {
      return (filtro) => {
        return (
          filtro[prop] !== null && Number(filtro[prop]) > Number(value.trim().substr(1).trim())
        );
      };
    } else if (value.indexOf('!=') === 0) {
      return (filtro) => {
        return (
          filtro[prop] !== null &&
          filtro[prop].toString().trim().toLowerCase() !== value.substr(2).trim().toLowerCase()
        );
      };
    } else if (value.replace(/[^*]/g, '').length > 0) {
      const paramsSearch = this.formatValueSearch(value.split('*'));
      let regexp = '';
      paramsSearch.forEach((values) => {
        let aux = '(?=.*(';
        const codificacion = values.split('*');
        if (codificacion[0] === '' && codificacion[2] === '') {
          aux = aux + codificacion[1].trim();
        } else if (codificacion[0] === '' && codificacion[2] === undefined) {
          aux = aux + codificacion[1].trim() + '$';
        } else if (codificacion[0] !== '' && codificacion[1] === '') {
          aux = aux + '^' + codificacion[0].trim();
        }
        aux = aux + '))';
        regexp = regexp + aux;
      });
      return (filtro) => {
        return new RegExp(regexp, 'gi').test(filtro[prop]);
      };
    } else {
      return (filtro) => {
        return filtro[prop].toString().trim() === value.toString().trim();
      };
    }
  }

  formatValueSearch(values: []) {
    let valueSearch = '';
    const valuesSearch: any = [];
    values.forEach((value, index) => {
      if (value !== '') {
        if (
          (values[index - 1] || values[index - 1] === '') &&
          (values[index + 1] || values[index + 1] === '')
        ) {
          valueSearch = '*' + value + '*';
          valuesSearch.push(valueSearch);
          valueSearch = '';
        } else if (
          (values[index - 1] === '' || values[index - 1]) &&
          values[index + 1] === undefined
        ) {
          valueSearch = '*' + value;
          valuesSearch.push(valueSearch);
          valueSearch = '';
        } else if (
          values[index - 1] === undefined &&
          (values[index + 1] === '' || values[index + 1])
        ) {
          valueSearch = value + '*';
          valuesSearch.push(valueSearch);
          valueSearch = '';
        }
      }
    });
    return valuesSearch;
  }
}
