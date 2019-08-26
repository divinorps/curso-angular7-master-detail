import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';
import { CategoriaListComponent } from './categoria-list/categoria-list.component';
import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriaService } from './shared/categoria.service';

@NgModule({
  declarations: [CategoriaListComponent, CategoriaFormComponent],
  imports: [
    CommonModule,
    CategoriasRoutingModule
  ],
  providers: [ CategoriaService ]
})
export class CategoriasModule { }
