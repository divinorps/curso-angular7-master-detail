import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Categoria } from './categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  readonly URL = 'api/categorias';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Categoria[]> {
    return this.http.get(this.URL).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategorias)
    );
  }

  getPorId(id: number): Observable<Categoria> {
    const url = `${this.URL}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategoria)
    );
  }

  adiciona(categoria: Categoria): Observable<Categoria> {
    return this.http.post(this.URL, categoria).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategoria)
    );
  }

  atualiza(categoria: Categoria): Observable<Categoria> {
    const url = `${this.URL}/${categoria.id}`;
    return this.http.put(url, categoria).pipe(
      catchError(this.handleError),
      map(() => categoria)
    );
  }

  delete(id: number): Observable<any>{
    const url = `${this.URL}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }
  jsonDataToCategorias(jsonData: any[]): Categoria[] {
    const categorias: Categoria[] = [];
     jsonData.forEach(element => {
        const categoria = Object.assign (new Categoria(), element)
        categorias.push(categoria);
     });
     console.log( categorias);
      return categorias;
  }

  jsonDataToCategoria(jsonData: any): Categoria {
    return Object.assign (new Categoria(), jsonData);
  }

  handleError(error: any): Observable<any> {
    console.log('Erro na requisição => ', error);
    return throwError(error);
  }

}

