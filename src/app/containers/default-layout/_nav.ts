import { INavData } from '@coreui/angular-pro';

export const navItems: INavData[] = [
  {
    name: $localize`Dashboard`,
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: $localize`NEW`
    }
  },
  {
    name: $localize`Customer`,
    url: '/customer',
    iconComponent: { name: 'cil-People' },
    badge: {
      color: 'info',
      text: $localize`Start`
    }
  },
  {
    name:$localize`Invoices`,
    url:'/invoices',
    iconComponent:{
      name:'cil-EnvelopeOpen',
    }
  },
  {
    name:$localize`Items`,
    url:'/items',
    iconComponent: { name: 'cil-Info' },
    badge: {
      color: 'info',
      text: $localize`NEW`
    }
  },
  {
    name:$localize`File Upload`,
    url:'/fileupload',
    iconComponent: { name: 'cil-Menu' },
    badge: {
      color: 'info',
      text: $localize`NEW`
    }
  }
];
