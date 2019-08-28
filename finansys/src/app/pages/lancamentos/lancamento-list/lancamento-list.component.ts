import { Component, OnInit } from '@angular/core';
import { Lancamento } from '../shared/lancamento.model';
import { LancamentoService } from '../shared/lancamento.service';

@Component({
  selector: 'app-lancamento-list',
  templateUrl: './lancamento-list.component.html',
  styleUrls: ['./lancamento-list.component.css']
})
export class LancamentoListComponent implements OnInit {

  lancamentos: Lancamento[] = [];

  constructor(private lancamentoService: LancamentoService) { }

  ngOnInit() {
    this.lancamentoService.getAll().subscribe(
      lancamentos => this.lancamentos = lancamentos.sort((a, b) => b.id - a.id),
      error => alert('Erro ao listar lançamentos')
    );
  }

  removeLancamento(lancamento: Lancamento) {
    const confirmouExclusao = confirm('Deseja realmente remover este lançamento?');
    if (confirmouExclusao) {
      this.lancamentoService.delete(lancamento.id).subscribe(
        () => this.lancamentos = this.lancamentos.filter(lanc => lanc !== lancamento),
        () => alert('Erro ao tentar excluir lançamento!')
      );
    }
  }

}
