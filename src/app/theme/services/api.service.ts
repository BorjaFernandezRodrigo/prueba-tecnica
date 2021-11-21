import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'any',
})
export class ApiService {
  private urlBase = environment.urlApi;

  private headers = new HttpHeaders().set('content-type', 'application/json');

  constructor(private http: HttpClient) {}

  public get(url: string): Observable<any> {
    const urlfinal = this.buildUrl(url);
    return this.http.get(urlfinal);
  }

  public delete(url: string): Observable<any> {
    const urlfinal = this.buildUrl(url);
    return this.http.delete(urlfinal);
  }

  public post(url: string, body: any): Observable<any> {
    const urlfinal = this.buildUrl(url);
    return this.http.post(urlfinal, body, { headers: this.headers });
  }

  public put(url: string, body: any): Observable<any> {
    const urlfinal = this.buildUrl(url);
    return this.http.put(urlfinal, body, { headers: this.headers });
  }

  private buildUrl(url: string) {
    let urlFinal = `${this.urlBase}/${url}`;
    return urlFinal;
  }

  createHeader(): Headers {
    const headers = new Headers();
    headers.append('Content-type', 'application/json; charset=UTF-8');
    return headers;
  }
}
