import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxLoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: NgxLoginComponent,
    children: [
      {
        path: 'login',
        component: NgxLoginComponent, // <---
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}
