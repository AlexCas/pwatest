import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-trctm',
  templateUrl: './trctm.component.html',
  styleUrls: ['./trctm.component.scss'],
})
export class TrctmComponent implements OnInit {
  @Input() warehouse: any;
  @Input() cardTitle: any;
  title: string;

  Highcharts: typeof Highcharts = Highcharts;

  chartOptionsTrctm: Highcharts.Options;

  constructor() {}

  ngOnInit(): void {
    console.log(this.warehouse);
    this.chartOptionsTrctm = this.setChartOptions(this.warehouse);
    this.title = this.warehouse?.factory
      ? `Planta ${this.warehouse?.factory}`
      : this.warehouse?.name;
  }

  setChartOptions(wareHouse: any): Highcharts.Options {
    let categories = wareHouse.trcItems.map((machine) => {
      return machine.machine;
    });
    return {
      chart: {
        type: 'column',
        events: {
          load: function () {
            categories.map((category) => {
              const container = document.getElementById(
                `category-${category}-${
                  wareHouse?.factory ? wareHouse.factory : wareHouse.name
                }`
              );
              const html = `<div class="row text-center-deadTime">
                <div class="col-12 p-0 text-center" style="font-size: 12px; font-weight: bold; color: #223ea2;">${category}</div>
                <div class="col-12 p-0 text-center" style="font-size: 12px;"><strong>${wareHouse.trcItems
                  .map((machine) => {
                    let quantity = 0;
                    if (machine.machine == category) {
                      quantity = machine.percentage;
                    }

                    return quantity == 0 ? '' : quantity;
                  })
                  .join('')}%</strong></div>
              </div>`;
              container.innerHTML = html;
            });
          },
        },
      },
      title: null,
      legend: {
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical',
      },
      xAxis: {
        categories: categories,
        title: null,
        labels: {
          useHTML: true,
          format: `<div class='scrap-category' id='category-{text}-${
            wareHouse?.factory ? wareHouse.factory : wareHouse.name
          }'></div>`,
        },
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Horas',
          style: {
            fontWeight: 'bold',
            fontSize: '1.3vh',
            color: '#223ea2',
          },
        },
      },
      tooltip: {
        enabled: false,
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
          },
        },
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [
        {
          type: 'column',
          name: 'Tiempo Real de Corrida',
          pointWidth: 16,
          pointPadding: 0.1,
          data: wareHouse.trcItems.map((machine) => {
            return {
              y: machine.realRunningTime,
            };
          }),
          color: '#55BF3B',
          dataLabels: {
            useHTML: true,
            enabled: true,
            formatter: function () {
              if ((this.point.y * 100) / this.series.yAxis.max >= 80) {
                return `<div class="labels-container time2-label-percentage time-label-absolute"><span>${this.point.y}</span></div>`;
              } else {
                return `<div class="labels-container time2-label-percentage"><span>${this.point.y}</span></div>`;
              }
            },

            color: '#223ea2',
            style: {
              fontSize: '1.3vh',
            },
          },
        },
        {
          type: 'line',
          name: 'Tiempo Muerto',
          data: wareHouse.trcItems.map((machine) => {
            return {
              y: machine.deadTime,
            };
          }),
          color: '#DF5353',
          dataLabels: {
            useHTML: true,
            enabled: true,
            color: 'black',
          },
        },
        {
          type: 'column',
          name: 'Tiempo Muerto',
          pointWidth: 16,
          pointPadding: 0.1,
          data: wareHouse.trcItems.map((machine) => {
            return {
              y: machine.deadTime,
            };
          }),
          color: '#DF5353',
          dataLabels: {
            useHTML: true,
            enabled: true,
            format:
              '<div class="labels-container"><span>{point.y}</span> <br /> <span class="labels-container-percent">{point.name}</span></div>',
            color: 'black',
            style: {
              fontSize: '1.3vh',
            },
          },
        },
      ],
    };
  }
}
