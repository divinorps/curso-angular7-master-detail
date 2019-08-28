import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IMaskModule } from 'angular-imask';
import { CalendarModule } from 'primeng/calendar';
import { LancamentoFormComponent } from './lancamento-form/lancamento-form.component';
import { LancamentoListComponent } from './lancamento-list/lancamento-list.component';
import { LancamentosRoutingModule } from './lancamentos-routing.module';
import { LancamentoService } from './shared/lancamento.service';

@NgModule({
  declarations: [LancamentoListComponent, LancamentoFormComponent],
  imports: [
    CommonModule,
    LancamentosRoutingModule,
    ReactiveFormsModule,
    CalendarModule,
    IMaskModule
  ],
  providers: [LancamentoService]
})
export class LancamentosModule { }
