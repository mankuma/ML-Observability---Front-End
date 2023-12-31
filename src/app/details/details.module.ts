import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { RouterModule, Routes } from '@angular/router';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { NgSelectModule } from '@ng-select/ng-select';



export const Childroutes: Routes = [
  { path: '', component: DetailsComponent },
];

@NgModule({
  declarations: [
    DetailsComponent,
    BarChartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(Childroutes),
    NgSelectModule
  ]
})
export class DetailsModule { }
