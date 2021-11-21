import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'any',
})
export class ApiService {
  private urlBase = environment.urlApi;

  constructor(private http: HttpClient) {}

  public get(url: string, resources?: string | number): Observable<any> {
    const urlfinal = this.buildUrl(url, resources);
    return this.http.get(urlfinal);
  }

  private buildUrl(url: string, resources?: string | number) {
    let urlFinal = `${this.urlBase}/${url}`;
    if (resources) {
      urlFinal += `/${resources}`;
    }
    return urlFinal;
  }
}
