import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { BaseResourceService } from 'src/app/shared/services/base-resources.services';
import { CategoriaService } from '../../categorias/shared/categoria.service';
import { Lancamento } from './lancamento.model';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService extends BaseResourceService<Lancamento> {

  constructor(protected injector: Injector, private categoriaService: CategoriaService) {
    super('api/lancamentos', injector);
  }

  adiciona(lancamento: Lancamento): Observable<Lancamento> {
    return this.categoriaService.getPorId(lancamento.categoriaId).pipe(
      flatMap(categoria => {
        lancamento.categoria = categoria;
        return super.adiciona(lancamento);
      })
    );
  }

  atualiza(lancamento: Lancamento): Observable<Lancamento> {
    return this.categoriaService.getPorId(lancamento.categoriaId).pipe(
      flatMap(categoria => {
        lancamento.categoria = categoria;
        return super.atualiza(lancamento);
      }
    ));
  }

 protected jsonDataToEntidades(jsonData: any[]): Lancamento[] {
    const lancamentos: Lancamento[] = [];
     jsonData.forEach((element) => {
        lancamentos.push(Object.assign (new Lancamento(), element));
     });
      return lancamentos;
  }

  protected jsonDataToEntidade(jsonData: any): Lancamento {
    return Object.assign (new Lancamento(), jsonData);
  }

}
