import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoriaForm();
    this.loadCategoria();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
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
}
