import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Categoria } from '../shared/categoria.model';
import { CategoriaService } from '../shared/categoria.service';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent extends BaseResourceFormComponent<Categoria> {

  constructor(protected categoriaService: CategoriaService, protected injector: Injector) {
    super(injector, new Categoria(), categoriaService, Categoria.fromJson);
   }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2)]],
      descricao: [null]
    }
    );
  }

  protected novaPaginaTitulo() {
    return 'Cadastro de nova categoria';
  }

  protected editarPaginaTitulo() {
    const nomeCategoria = this.resource.nome || '';
    return 'Alteração de categoria: ' +  nomeCategoria;
  }

}
