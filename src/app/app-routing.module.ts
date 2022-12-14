import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { CustomerComponent } from './views/customer/customer.component';
import { AllInvoiceComponent } from './views/invoices/all-invoice/all-invoice.component';
import { NewInvoiceComponent } from './views/invoices/new-invoice/new-invoice.component';
import { UploadInvoicesComponent } from './views/invoices/upload-invoices/upload-invoices.component';
import { ItemsComponent } from './views/items/items.component';
import { LoginComponent } from './views/login/login.component';
import { MainFileUploadComponent } from './views/main-file-upload/main-file-upload.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: $localize`Home`
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      }
    ]
  },
  {
    path: 'customer',
    component: DefaultLayoutComponent,
    data: {
      title: $localize`Customer`
    },
    children: [
      {
        path: '',
        component:CustomerComponent
      }
    ]
  },
  
  {
    path: 'fileupload',
    component: DefaultLayoutComponent,
    data: {
      title: $localize`fileUpload`
    },
    children: [
      {
        path: '',
        component:MainFileUploadComponent
      }
    ]
  },
  {
    path: 'items',
    component: DefaultLayoutComponent,
    data: {
      title: $localize`Item`
    },
    children: [
      {
        path: '',
        component:ItemsComponent
      }
    ]
  },
  // {
  //   path: 'Upload-invoices',
  //   component: DefaultLayoutComponent,
  //   data: {
  //     title: $localize`Upload-invoices`
  //   },
  //   children: [
  //     {
  //       path: '',
  //       component:UploadInvoicesComponent
  //     }
  //   ]
  // },
  {
    path: 'invoices',
    component: DefaultLayoutComponent,
    loadChildren: () =>
      import('./views/invoices/invoices.module').then((m) => m.InvoicesModule)
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
