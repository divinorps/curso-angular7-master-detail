import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { Categoria } from '../shared/categoria.model';
import { CategoriaService } from '../shared/categoria.service';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  categoriaForm: FormGroup;
  pageTitulo: string;
  ServerErrorMessages: string[] = null;
  submmitingForm = false;
  categoria: Categoria = new Categoria();

  constructor(private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoriaForm();
    this.loadCategoria();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  enviarForm() {
    this.submmitingForm = true;
    if (this.currentAction === 'new') {
      this.adicionarCategoria();
    } else {
      this.atualizarCategoria();
    }

  }

  private setCurrentAction() {
    if(this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  private buildCategoriaForm() {
    this.categoriaForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2)]],
      descricao: [null]
    }
    );
  }

  private loadCategoria() {
    if (this.currentAction === 'edit'){
      this.route.paramMap.pipe(
        switchMap(params => this.categoriaService.getPorId(+params.get('id')))
      )
      .subscribe(
        (categoria) => {
          this.categoria = categoria;
          this.categoriaForm.patchValue(categoria);
        },
        (error) => alert ('Ocorreu um erro no servidor. Tente novamente mais tarde!')
        );
    }
  }

  setPageTitle() {
    if (this.currentAction === 'new'){
      this.pageTitulo = 'Cadastro de nova categoria';
    } else {
      const categoriaNome = this.categoria.nome || '';
      this.pageTitulo = 'Alterando categoria: ' + categoriaNome;
    }
  }

  private adicionarCategoria() {
    const categoria: Categoria = Object.assign(new Categoria(), this.categoriaForm.value);
    this.categoriaService.adiciona(categoria)
    .subscribe(
      (categoria) => this.actionsForSuccess(categoria)),
      (error: any) => this.actionsForError(error);
  }

  private atualizarCategoria() {
    const categoria: Categoria = Object.assign(new Categoria(), this.categoriaForm.value);
    this.categoriaService.atualiza(categoria)
    .subscribe(
      (categoria) => this.actionsForSuccess(categoria)),
      (error: any) => this.actionsForError(error);
  }

  private actionsForSuccess(categoria: Categoria) {
    this.toastr.success('Solicitação processada com sucesso.');
    this.router.navigateByUrl('categorias', { skipLocationChange: true}).then(
      () => this.router.navigate(['categorias', categoria.id, 'edit'])
    );

  }

  private actionsForError(error: any) {
    this.toastr.error('Ocorreu um erro ao processar sua solicitação');
    this.submmitingForm = false;
    if (error.status === 422) {
      this.ServerErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.ServerErrorMessages = ['Falha na comiunicação com o servidor. Tente mais novamente mais tarde!'];
    }
  }
}
