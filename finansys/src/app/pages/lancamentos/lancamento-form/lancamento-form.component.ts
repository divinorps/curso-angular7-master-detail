import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Categoria } from '../../categorias/shared/categoria.model';
import { CategoriaService } from '../../categorias/shared/categoria.service';
import { Lancamento } from '../shared/lancamento.model';
import { LancamentoService } from '../shared/lancamento.service';

@Component({
  selector: 'app-lancamento-form',
  templateUrl: './lancamento-form.component.html',
  styleUrls: ['./lancamento-form.component.css']
})
export class LancamentoFormComponent extends BaseResourceFormComponent<Lancamento> implements OnInit{

  categorias: Array<Categoria>;

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFranctionalZeros: true,
    normalizeZwwros: true,
    radix: ','
  };

  ptBR = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  };

  constructor(protected lancamentoService: LancamentoService, protected injector: Injector, protected categoriaService: CategoriaService) {
    super(injector, new Lancamento(), lancamentoService, Lancamento.fromJson);
   }

   ngOnInit() {
    this.loadCategorias();
    super.ngOnInit();
   }

   private loadCategorias() {
    this.categoriaService.getAll().subscribe(
      categorias => this.categorias = categorias
    );
   }

  get tiposOptions(): Array<any> {
    return Object.entries(Lancamento.tipos).map(
      ([value, texto]) => {
        return {
          texto: texto,
          value: value
        };
      }
    );
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2)]],
      descricao: [null],
      tipo: ['despesa', [Validators.required]],
      valor: [null, [Validators.required]],
      data: [null, [Validators.required]],
      paga: [true, [Validators.required]],
      categoriaId: [null, [Validators.required]],
    });
  }

  setPagamento(paga: boolean) {
      this.resourceForm.get('paga').setValue(paga);
  }

  protected novaPaginaTitulo() {
    return 'Cadastro de novo lançamento';
  }

  protected editarPaginaTitulo() {
    const nomeLancamento = this.resource.nome || '';
    return 'Alteração de lançamento: ' +  nomeLancamento;
  }

}
