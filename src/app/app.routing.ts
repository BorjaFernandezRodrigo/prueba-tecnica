/* eslint-disable prettier/prettier */
import { ModuleWithProviders } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PagesComponent } from './pages/pages.component';
import { PostComponent } from './pages/post/post.component';

export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { breadcrumb: 'Publicaciones' },
      },
      {
        path: 'mantenimiento',
        component: MaintenanceComponent,
        data: { breadcrumb: 'Mantenimiento' },
      },
      {
        path: 'post',
        component: PostComponent,
        data: { breadcrumb: 'Post' },
      },
      { path: '**', component: NotFoundComponent, data: { breadcrumb: 'No encontradoi' } },
    ],
  },
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(routes, {
  enableTracing: false, // <- si se pone a true se puede ver la traza de las rutas en la consola
  preloadingStrategy: PreloadAllModules, // <- comment this line for activate lazy load
});
