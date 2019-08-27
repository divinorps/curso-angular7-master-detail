import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LancamentoFormComponent } from './lancamento-form/lancamento-form.component';
import { LancamentoListComponent } from './lancamento-list/lancamento-list.component';
import { LancamentosRoutingModule } from './lancamentos-routing.module';
import { LancamentoService } from './shared/lancamento.service';

@NgModule({
  declarations: [LancamentoListComponent, LancamentoFormComponent],
  imports: [
    CommonModule,
    LancamentosRoutingModule,
    ReactiveFormsModule
  ],
  providers: [LancamentoService]
})
export class LancamentosModule { }
