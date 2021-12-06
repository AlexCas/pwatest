import { Injectable } from '@angular/core';
import { IndicatorColorServiceService } from '../../shared/indicator-color-service.service';
import * as Highcharts from 'highcharts';

@Injectable({
  providedIn: 'root',
})
export class DeadTimeChartService {
  constructor(private indicatorColorService: IndicatorColorServiceService) {}

  Highcharts: typeof Highcharts = Highcharts;

  setChartTRvRMOptions(wareHouse: any): Highcharts.Options {
    let categories = wareHouse.trcItems.map((machine) => {
      return machine.machine;
    });
    return {
      chart: {
        type: 'column',
        events: {
          load: function () {
            categories.map((category, index) => {
              const container = document.getElementById(
                `category-${category}-${
                  wareHouse?.factory ? wareHouse.factory : wareHouse.name
                }-${index}`
              );
              const html = `<div class="row text-center-deadTime" style="padding-right: 2.7vh;">
                <div class="col-12 p-0 text-center" style="font-size: .7em; font-weight: bold; color: #223ea2;">${category}</div>
                <div class="col-12 p-0 text-center" style="font-size: .6em;"><strong>${wareHouse.trcItems
                  .map((machine, index2) => {
                    let quantity = 0;
                    if (machine.machine == category && index == index2) {
                      quantity = machine.percentage;
                    }

                    return quantity == 0 ? '' : quantity.toFixed(2);
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
        enabled: false,
      },
      xAxis: {
        categories: categories.map((c, index) => {
          return `<div class='deadtime-category column-${index}' id='category-${c}-${
            wareHouse?.factory ? wareHouse.factory : wareHouse.name
          }-${index}'>${c}</div>`
        }),
        title: null,
        labels: {
          useHTML: true,
        },
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: null
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
            enabled: false,
            color: 'black',
          },
        },
        {
          type: 'column',
          name: 'Tiempo Muerto',
          pointWidth: 7,
          groupPadding: 0.3,
          pointPadding: 0,
          borderWidth: 0,
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
              fontSize: '.7em',
            },
          },
        },
        {
          type: 'column',
          name: 'Tiempo Real de Corrida',
          pointWidth: 7,
          groupPadding: 1,
          pointPadding: 0,
          borderWidth: 0,
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
              fontSize: '.7em',
            },
          },
        },
      ],
    };
  }

  setChartWarehouseColumnOptions(timeout: any): Highcharts.Options {
    return {
      chart: {
        type: 'column',
      },
      title: null,
      subtitle: null,
      xAxis: {        
        type: 'category',
        labels: {
          useHTML: true,
          style: {
            textAlign: 'center',
            fontSize: '.8em',
            fontWeight: 'bold',
          },
        },
      },
      tooltip: {
        enabled: false,
      },
      yAxis: {
        title: null,
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          color: 'darkgoldenrod',
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
          data: timeout.items.map((machine: any, index: any) => {
            return {
              name: `<div class="tp-title ${index}">${machine.machine}</div> ${machine.reason.substring(0, 4)}`,
              y: machine.percentage,
              color: '#223ea2',
              drilldown: null,
            };
          }),
        },
      ],
    };
  }
}
