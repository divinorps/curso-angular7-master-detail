import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseResourceModel } from '../models/base-resource.model';

export abstract class BaseResourceService<T extends BaseResourceModel> {

  protected http: HttpClient;

  constructor(protected URL: string, protected injector: Injector) {
    this.http = injector.get(HttpClient);
   }

  getAll(): Observable<T[]> {
    return this.http.get(this.URL).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntidades)
    );
  }

  getPorId(id: number): Observable<T> {
    const url = `${this.URL}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntidade)
    );
  }

  adiciona(entidade: T): Observable<T> {
    return this.http.post(this.URL, entidade).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntidade)
    );
  }

  atualiza(entidade: T): Observable<T> {
    const url = `${this.URL}/${entidade.id}`;
    return this.http.put(url, entidade).pipe(
      catchError(this.handleError),
      map(() => entidade)
    );
  }

  delete(id: number): Observable<any>{
    const url = `${this.URL}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  protected jsonDataToEntidades(jsonData: any[]): T[] {
    const entidades: T[] = [];
     jsonData.forEach(element => {
        const entidade = Object.assign (element)
        entidades.push(entidade);
     });
     console.log( entidades );
      return entidades;
  }

  protected jsonDataToEntidade(jsonData: any): T {
    return Object.assign (jsonData);
  }

  protected handleError(error: any): Observable<any> {
    console.log('Erro na requisição => ', error);
    return throwError(error);
  }

}
