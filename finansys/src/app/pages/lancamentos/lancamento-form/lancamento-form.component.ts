import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { Categoria } from '../../categorias/shared/categoria.model';
import { CategoriaService } from '../../categorias/shared/categoria.service';
import { Lancamento } from '../shared/lancamento.model';
import { LancamentoService } from '../shared/lancamento.service';

@Component({
  selector: 'app-lancamento-form',
  templateUrl: './lancamento-form.component.html',
  styleUrls: ['./lancamento-form.component.css']
})
export class LancamentoFormComponent implements OnInit, AfterContentChecked {
  currentAction: string;
  lancamentoForm: FormGroup;
  pageTitulo: string;
  ServerErrorMessages: string[] = null;
  submmitingForm = false;
  lancamento: Lancamento = new Lancamento();
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

  constructor(private lancamentoService: LancamentoService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildLancamentoForm();
    this.loadLancamento();
    this. loadCategorias();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  enviarForm() {
    this.submmitingForm = true;
    if (this.currentAction === 'new') {
      this.adicionarLancamento();
    } else {
      this.atualizarLancamento();
    }
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

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  private buildLancamentoForm() {
    this.lancamentoForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2)]],
      descricao: [null],
      tipo: ['despesa', [Validators.required]],
      valor: [null, [Validators.required]],
      data: [null, [Validators.required]],
      paga: [true, [Validators.required]],
      categoriaId: [null, [Validators.required]],
    }
    );
  }

  private loadLancamento() {
    if (this.currentAction === 'edit'){
      this.route.paramMap.pipe(
        switchMap(params => this.lancamentoService.getPorId(+params.get('id')))
      )
      .subscribe(
        (lancamento) => {
          this.lancamento = lancamento;
          this.lancamentoForm.patchValue(lancamento);
        },
        (error) => alert ('Ocorreu um erro no servidor. Tente novamente mais tarde!')
        );
    }
  }

  loadCategorias() {
    this.categoriaService.getAll()
    .subscribe(cats => this.categorias = cats);
  }

  setPagamento(paga: boolean) {
      this.lancamentoForm.get('paga').setValue(paga);
  }

  setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitulo = 'Cadastro de novo lancamento';
    } else {
      const lancamentoNome = this.lancamento.nome || '';
      this.pageTitulo = 'Alterando lancamento: ' + lancamentoNome;
    }
  }

  private adicionarLancamento() {
    const lancamento: Lancamento = Lancamento.fromJson(this.lancamentoForm.value);
    this.lancamentoService.adiciona(lancamento)
    .subscribe(
      (lancamento) => this.actionsForSuccess(lancamento)),
      (error: any) => this.actionsForError(error);
  }

  private atualizarLancamento() {
    const lancamento: Lancamento = Lancamento.fromJson(this.lancamentoForm.value);
    this.lancamentoService.atualiza(lancamento)
    .subscribe(
      (lancamento) => this.actionsForSuccess(lancamento)),
      (error: any) => this.actionsForError(error);
  }

  private actionsForSuccess(lancamento: Lancamento) {
    this.toastr.success('Solicitação processada com sucesso.');
    this.router.navigateByUrl('lancamentos', { skipLocationChange: true}).then(
      () => this.router.navigate(['lancamentos', lancamento.id, 'edit'])
    );
  }

  private actionsForError(error: any) {
    this.toastr.error('Ocorreu um erro ao processar sua solicitação');
    this.submmitingForm = false;
    if (error.status === 422) {
      this.ServerErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.ServerErrorMessages = ['Falha na comunicação com o servidor. Tente novamente!'];
    }
  }
}
