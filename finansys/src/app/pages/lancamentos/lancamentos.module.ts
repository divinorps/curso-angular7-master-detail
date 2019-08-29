import { NgModule } from '@angular/core';
import { IMaskModule } from 'angular-imask';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from 'src/app/shared/shared.module';
import { LancamentoFormComponent } from './lancamento-form/lancamento-form.component';
import { LancamentoListComponent } from './lancamento-list/lancamento-list.component';
import { LancamentosRoutingModule } from './lancamentos-routing.module';
import { LancamentoService } from './shared/lancamento.service';

@NgModule({
  declarations: [LancamentoListComponent, LancamentoFormComponent],
  imports: [
    SharedModule,
    LancamentosRoutingModule,
    CalendarModule,
    IMaskModule
  ],
  providers: [LancamentoService]
})
export class LancamentosModule { }
