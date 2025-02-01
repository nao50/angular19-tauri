import { Routes } from '@angular/router';
import { TopComponent } from './top/top.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./top/top.component').then((m) => m.TopComponent),
  },
  // {
  //   path: '',
  //   component: TopComponent
  // },
];
