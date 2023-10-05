import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmanadaHomeComponent } from './amanada-home/amanada-home.component';
import { RouterModule, Routes } from '@angular/router';

export const Childroutes: Routes = [
  { path: '', component: AmanadaHomeComponent },
];

@NgModule({
  declarations: [
    AmanadaHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(Childroutes),
  ]
})
export class AmanadaHomeModule { }
