import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { NewInvoiceComponent } from './new-invoice/new-invoice.component';
import { AllInvoiceComponent } from './all-invoice/all-invoice.component';
import { ModalModule , CardModule , FormModule } from '@coreui/angular-pro';

@NgModule({
  declarations: [
    NewInvoiceComponent,
    AllInvoiceComponent,
    
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,CardModule,ModalModule,FormModule
  ],
  exports:[
    NewInvoiceComponent,
    AllInvoiceComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class InvoicesModule { }
