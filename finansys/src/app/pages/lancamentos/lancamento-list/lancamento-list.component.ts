import { Component } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.compont';
import { Lancamento } from '../shared/lancamento.model';
import { LancamentoService } from '../shared/lancamento.service';

@Component({
  selector: 'app-lancamento-list',
  templateUrl: './lancamento-list.component.html',
  styleUrls: ['./lancamento-list.component.css']
})
export class LancamentoListComponent extends BaseResourceListComponent<Lancamento> {

  constructor(protected lancamentoService: LancamentoService) {
    super(lancamentoService);
   }

}
