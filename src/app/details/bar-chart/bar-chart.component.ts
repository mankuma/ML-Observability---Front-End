import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {


  @Input() id: string = '';
  @Input() values: any;

  constructor() { }
  public ngOnInit(): void {
    setTimeout((x: any) => {
      this.showChart();
    })
  }

  public showChart() {
    var barChart = new Chart(this.id, {
      type: 'bar',
      data: {
        labels: this.values['xlabels'],
        datasets: [
          {
            label: this.values['label1'],
            backgroundColor: "#3e95cd",
            data: this.values['totalcart']
          }, {
            label: this.values['label2'],
            backgroundColor: "#8e5ea2",
            data: this.values['totalavg']
          }
        ]
      },
      options: {
        scales: {
          y: {
            suggestedMin: 1000,
            suggestedMax: 500000
          }
        }
      }
    });
  }

}
