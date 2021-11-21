import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiPost } from 'src/app/theme/types/api.types';
import { MaintenanceService } from './maintenance.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
})
export class MaintenanceComponent implements OnInit {
  public loadSpinner: boolean;

  public hideForm: boolean;

  public postsSearch: ApiPost[];

  public postSelected: ApiPost;

  public form: FormGroup;

  public keySerach = [
    {
      prop: 'userName',
      name: 'Nombre Usuario',
    },
    {
      prop: 'userId',
      name: 'Id Usuario',
    },
    {
      prop: 'title',
      name: 'Titulo',
    },
    {
      prop: 'body',
      name: 'Contenido',
    },
  ];

  public users: {
    id: number;
    name: string;
  }[];

  constructor(public maintenanceService: MaintenanceService, private formBuilder: FormBuilder) {
    this.loadSpinner = true;
    this.hideForm = true;
  }

  ngOnInit(): void {
    this.maintenanceService.loadData().subscribe(() => {
      this.loadSpinner = false;
    });
  }

  selectPost(select: ApiPost) {
    this.postSelected = select;
    this.hideForm = false;
    this.createForm();
  }

  delete(select) {
    this.postSelected = undefined;
    this.loadSpinner = true;
    this.hideForm = true;
    this.maintenanceService.deletePost(select).subscribe(() => {
      this.loadSpinner = false;
    });
  }

  createPost() {
    this.postSelected = undefined;
    this.hideForm = false;
    this.createForm();
  }

  save() {
    if (this.form.value.id) {
      this.maintenanceService.updatePost(this.postSelected.id, this.form.value).subscribe((res) => {
        this.postSelected = res;
      });
    } else {
      this.maintenanceService.createPost(this.form.value).subscribe((res) => {
        this.postSelected = res;
      });
    }
  }

  createForm() {
    this.form = this.formBuilder.group({
      title: [this.postSelected?.title ? this.postSelected.title : '', Validators.required],
      body: [this.postSelected?.body ? this.postSelected.body : '', Validators.required],
      userId: [this.postSelected?.userId ? this.postSelected.userId : '', Validators.required],
      id: [this.postSelected?.id ? this.postSelected.id : '', Validators.required],
    });
  }
}
