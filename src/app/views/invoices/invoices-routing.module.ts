import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllInvoiceComponent } from './all-invoice/all-invoice.component';
import { NewInvoiceComponent } from './new-invoice/new-invoice.component';
import { UploadInvoicesComponent } from './upload-invoices/upload-invoices.component';

const routes: Routes = [
  {
    path:'',
    data:{
      title:'Invoices',
    },
    children:[
      {
        path:'new',
        component:NewInvoiceComponent
      },
      {
        path:'',
        component:AllInvoiceComponent
      },
      {
        path:'Upload-invoices',
        component:UploadInvoicesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
