import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, flatMap, map } from 'rxjs/operators';
import { CategoriaService } from '../../categorias/shared/categoria.service';
import { Lancamento } from './lancamento.model';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  private apiPath = 'api/lancamentos';

  constructor(private http: HttpClient, private categoriaService: CategoriaService) { }

  getAll(): Observable<Lancamento[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToLancamentos)
    );
  }

  getPorId(id: number): Observable<Lancamento> {
    const url = `${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToLancamento)
    );
  }

  adiciona(lancamento: Lancamento): Observable<Lancamento> {
    return this.categoriaService.getPorId(lancamento.categoriaId).pipe(
      flatMap(categoria => {
        lancamento.categoria = categoria;
        return this.http.post(this.apiPath, lancamento).pipe(
          catchError(this.handleError),
          map(this.jsonDataToLancamento)
        );
      })
    );
  }

  atualiza(lancamento: Lancamento): Observable<Lancamento> {
    const url = `${this.apiPath}/${lancamento.id}`;
    return this.categoriaService.getPorId(lancamento.categoriaId).pipe(
      flatMap(categoria => {
        lancamento.categoria = categoria;
        return this.http.put(url, lancamento).pipe(
          catchError(this.handleError),
          map(() => lancamento));
      }
    ));
  }

  delete(id: number): Observable<any>{
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  jsonDataToLancamentos(jsonData: any[]): Lancamento[] {
    const lancamentos: Lancamento[] = [];
     jsonData.forEach(element => {
        const lancamento = Object.assign (new Lancamento(), element)
        lancamentos.push(lancamento);
     });
     console.log( lancamentos);
      return lancamentos;
  }

  jsonDataToLancamento(jsonData: any): Lancamento {
    return Object.assign (new Lancamento(), jsonData);
  }

  handleError(error: any): Observable<any> {
    console.log('Erro na requisição => ', error);
    return throwError(error);
  }

}

