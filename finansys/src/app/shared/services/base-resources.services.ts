import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseResourceModel } from '../models/base-resource.model';

export abstract class BaseResourceService<T extends BaseResourceModel> {

  protected http: HttpClient;

  constructor(protected URL: string, protected injector: Injector,
              protected jsonDataToEntidadeFn: (jsonData: any) => T) {
    this.http = injector.get(HttpClient);
   }

  getAll(): Observable<T[]> {
    return this.http.get(this.URL).pipe(
      map(this.jsonDataToEntidades.bind(this)),
      catchError(this.handleError)
    );
  }

  getPorId(id: number): Observable<T> {
    const url = `${this.URL}/${id}`;
    return this.http.get(url).pipe(
      map(this.jsonDataToEntidade.bind(this)),
      catchError(this.handleError)
    );
  }

  adiciona(entidade: T): Observable<T> {
    return this.http.post(this.URL, entidade).pipe(
      map(this.jsonDataToEntidade.bind(this)),
      catchError(this.handleError)
    );
  }

  atualiza(entidade: T): Observable<T> {
    const url = `${this.URL}/${entidade.id}`;
    return this.http.put(url, entidade).pipe(
      map(() => entidade),
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<any>{
    const url = `${this.URL}/${id}`;
    return this.http.delete(url).pipe(
      map(() => null),
      catchError(this.handleError)
    );
  }

  protected jsonDataToEntidades(jsonData: any[]): T[] {
    const entidades: T[] = [];
    jsonData.forEach(element =>  {
      entidades.push( this.jsonDataToEntidadeFn(element) );
    });
    return entidades;
  }

  protected jsonDataToEntidade(jsonData: any): T {
    return  this.jsonDataToEntidadeFn(jsonData);
  }

  protected handleError(error: any): Observable<any> {
    console.log('Erro na requisição => ', error);
    return throwError(error);
  }

}
