import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { NewInvoiceComponent } from './new-invoice/new-invoice.component';
import { AllInvoiceComponent } from './all-invoice/all-invoice.component';
import { ModalModule , CardModule , FormModule } from '@coreui/angular-pro';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadInvoicesComponent } from './upload-invoices/upload-invoices.component';
import { AllUploadedInvoicesComponent } from './all-uploaded-invoices/all-uploaded-invoices.component';

@NgModule({
  declarations: [
    NewInvoiceComponent,
    AllInvoiceComponent,
    UploadInvoicesComponent,
    AllUploadedInvoicesComponent,
    
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,CardModule,ModalModule,FormModule,
    ReactiveFormsModule, FormsModule
  ],
  exports:[
    NewInvoiceComponent,
    AllInvoiceComponent,
    UploadInvoicesComponent,
    AllUploadedInvoicesComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class InvoicesModule { }
