import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, flatMap } from 'rxjs/operators';
import { BaseResourceService } from 'src/app/shared/services/base-resources.services';
import { CategoriaService } from '../../categorias/shared/categoria.service';
import { Lancamento } from './lancamento.model';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService extends BaseResourceService<Lancamento> {

  constructor(protected injector: Injector, private categoriaService: CategoriaService) {
    super('api/lancamentos', injector, Lancamento.fromJson);
 }

  adiciona(lancamento: Lancamento): Observable<Lancamento> {
    return this.setCategoriaAndSendToServer(lancamento, super.adiciona.bind(this));
  }

  atualiza(lancamento: Lancamento): Observable<Lancamento> {
    return this.setCategoriaAndSendToServer(lancamento, super.atualiza.bind(this));
  }

  private setCategoriaAndSendToServer(lancamento: Lancamento, sendFc: any): Observable<Lancamento> {
    return this.categoriaService.getPorId(lancamento.categoriaId).pipe(
      flatMap(categoria => {
        lancamento.categoria = categoria;
        return sendFc(lancamento);
      }),
      catchError(this.handleError)
    );
}
}
