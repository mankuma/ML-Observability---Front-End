import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphComponent } from './graph/graph.component';
import { RouterModule, Routes } from '@angular/router';
import { TableauModule } from 'ngx-tableau';



export const Childroutes: Routes = [
  { path: '', component: GraphComponent },
];

@NgModule({
  declarations: [
    GraphComponent
  ],
  imports: [
    CommonModule,
    TableauModule,
    RouterModule.forChild(Childroutes),
  ]
})
export class GraphModule { }
