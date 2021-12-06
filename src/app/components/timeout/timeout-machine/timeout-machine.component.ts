import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-timeout-machine',
  templateUrl: './timeout-machine.component.html',
  styleUrls: ['./timeout-machine.component.scss'],
})
export class TimeoutMachineComponent implements OnInit {
  @Input() timeout: any;
  title: string;

  Highcharts: typeof Highcharts = Highcharts;

  chartOptionsTm: Highcharts.Options;

  constructor() {}

  ngOnInit(): void {
    this.chartOptionsTm = this.setChartOptions(this.timeout);
    this.title = this.timeout?.factory
      ? `Planta ${this.timeout?.factory}`
      : this.timeout?.name;
  }

  setChartOptions(timeout: any): Highcharts.Options {
    return {
      chart: {
        type: 'column',
      },
      title: null,
      subtitle: null,
      xAxis: {
        type: 'category',
        labels: {
          style: {
            fontSize: '1.3vh',
            fontWeight: 'bold',
          },
        },
      },
      yAxis: {
        title: {
          text: 'Tiempo Muerto',
          style: {
            fontWeight: 'bold',
            fontSize: '1.3vh',
            color: '#223ea2',
          },
        },
      },
      legend: {
        enabled: true,
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          color: '#223ea2',
          dataLabels: {
            useHTML: true,
            enabled: true,
            //format: '{point.y:.1f}%',
            style: {
              fontWeight: 'bold',
              fontSize: '15px',
            },
          },
        },
      },

      series: [
        {
          type: 'column',
          name: '% Tiempo Muerto en Maquina',
          dataLabels: {
            formatter: function () {
              if ((this.point.y * 100) / this.series.yAxis.max >= 80) {
                return `<div class="labels-container scrap-label-percentage time-label-absolute"><span>${this.point.y}</span></div>`;
              } else {
                return `<div class="labels-container scrap-label-percentage"><span>${this.point.y}</span></div>`;
              }
            },
          },
          data: timeout.items.map((machine: any) => {
            return {
              name: `${machine.machine} - ${machine.reason}`,
              y: machine.percentage,
							color: "#223ea2",
              drilldown: null,
            };
          }),
        },
      ],
    };
  }
}
