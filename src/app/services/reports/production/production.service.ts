import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';
import { IndicatorColorServiceService } from '../../shared/indicator-color-service.service';

@Injectable({
  providedIn: 'root',
})
export class ProductionService {
  constructor(private colorService: IndicatorColorServiceService) {}

  getOptionsForProductionDayMachine(machines: any): Highcharts.Options {
    const numberFormat = new Intl.NumberFormat('es-MX');
    const barSize = 30;
    const categories = machines.map((machine) => {
      return machine.machine;
    });

    return {
      chart: {
        type: 'column',
        events: {
          load: function () {
            categories.map((category) => {
              const container = document.getElementById(`category-${category}`);
              const html = `<div class="row text-center-deadTime">
                <div class="col-12 p-0 text-center" style="font-size: 1.7vh; font-weight: bold; color: #223ea2;">${category}</div>
                <div class="col-12 p-0 text-center" style="font-size: 1.7vh;"><strong>${machines
                  .map((machineA) => {
                    let quantity = 0;
                    if (machineA.machine == category) {
                      quantity = machineA.percentage;
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
        enabled: false,
      },
      xAxis: {
        categories: machines.map((machine) => {
          return machine.machine;
        }),

        labels: {
          useHTML: true,
          format: `<div class='scrap-category' id='category-{text}'>{text}</div>`,
        },

        crosshair: true,
      },
      yAxis: {
        title: {
          text: 'Piezas por Máquina',
          style: {
            fontWeight: 'bold',
            fontSize: '1.7vh',
            color: '#223ea2',
          },
        },
      },
      tooltip: {
        enabled: false,
        useHTML: true,
      },
      plotOptions: {
        
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [
        {
          type: 'column',
          name: 'Cantidad Ordenada',
          pointWidth: barSize,
          pointPadding: 0.06,
          borderWidth: 0,

          data: machines.map((machine) => {
            return { y: machine.orderedQuantity, color: '#223ea2' };
          }),
          dataLabels: {
            enabled: true,
            useHTML: true,
            formatter: function () {
              if ((this.point.y * 100) / this.series.yAxis.max >= 80) {
                return `<div class="labels-container time2-label-percentage time-label-absolute-production"><span>${numberFormat.format(
                  this.point.y
                )}</span></div>`;
              } else {
                return `<div class="labels-container time2-label-percentage"><span>${numberFormat.format(
                  this.point.y
                )}</span></div>`;
              }
            },
            style: {
              fontSize: '1.6vh',
            },
          },
        },
        {
          type: 'column',
          name: 'Cantidad Completada',
          pointWidth: barSize,
          pointPadding: 0.06,
          borderWidth: 0,

          data: machines.map((machine) => {
            return {
              y: machine.quantityCompleted,
              color: this.colorService.getHexadecimalColorByColorNumber(
                machine.colorId
              ),
            };
          }),
          dataLabels: {
            enabled: true,
            useHTML: true,
            formatter: function () {
              if ((this.point.y * 100) / this.series.yAxis.max >= 80) {
                return `<div class="labels-container time2-label-percentage time-label-absolute-production"><span>${numberFormat.format(
                  this.point.y
                )}</span></div>`;
              } else {
                return `<div class="labels-container time2-label-percentage"><span>${numberFormat.format(
                  this.point.y
                )}</span></div>`;
              }
            },
            style: {
              fontSize: '1.6vh',
            },
          },
        },
        {
          type: 'column',
          name: 'Cantidad por Completar',
          pointWidth: barSize,
          pointPadding: 0.06,
          borderWidth: 0,

          data: machines.map((machine) => {
            return {
              y: machine.amountToBeCompleted,
              color: '#98297a',
            };
          }),
          dataLabels: {
            enabled: true,
            useHTML: true,
            formatter: function () {
              if ((this.point.y * 100) / this.series.yAxis.max >= 80) {
                return `<div class="labels-container time2-label-percentage time-label-absolute"><span>${numberFormat.format(
                  this.point.y
                )}</span></div>`;
              } else {
                return `<div class="labels-container time2-label-percentage"><span>${numberFormat.format(
                  this.point.y
                )}</span></div>`;
              }
            },
            style: {
              fontSize: '1.6vh',
            },
          },
        },
        {
          type: 'line',

          name: 'Cantidad por Completar',
          data: machines.map((machine) => {
            return {
              y: machine.amountToBeCompleted,
              color: '#98297a',
            };
          }),
          pointPlacement: 0.20
        },
      ],
    };
  }

  getOptionsForProductionDayMachineMobile(machines: any): Highcharts.Options {
    const numberFormat = new Intl.NumberFormat('es-MX');
    const barSize = 8;
    const categories = machines.map((machine) => {
      return machine.machine;
    });

    return {
      chart: {
        type: 'column',
        events: {
          load: function () {
            categories.map((category) => {
              const container = document.getElementById(`category-${category}`);
              const html = `<div class="row text-center-deadTime">
                <div class="col-12 p-0 text-center" style="font-size: .8em; font-weight: bold; color: #223ea2;">${category}</div>
                <div class="col-12 p-0 text-center" style="font-size: .7em;"><strong>${machines
                  .map((machineA) => {
                    let quantity = 0;
                    if (machineA.machine == category) {
                      quantity = machineA.percentage;
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
        enabled: false,
      },
      xAxis: {
        categories: machines.map((machine) => {
          return machine.machine;
        }),

        labels: {
          useHTML: true,
          format: `<div class='scrap-category-mobile' id='category-{text}'>{text}</div>`,
        },

        crosshair: true,
      },
      yAxis: {
        title: null
      },
      tooltip: {
        enabled: false,
        useHTML: true,
      },
      plotOptions: {
        
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [
        {
          type: 'column',
          name: 'Cantidad Ordenada',
          pointWidth: barSize,
          pointPadding: 0.09,
          borderWidth: 0,

          data: machines.map((machine) => {
            return { y: machine.orderedQuantity, color: '#223ea2' };
          }),
          dataLabels: {
            enabled: true,
            useHTML: true,
            formatter: function () {
              if ((this.point.y * 100) / this.series.yAxis.max >= 80) {
                return `<div class="labels-container labels-container-percent-mobile time-label-absolute-production"><span>${numberFormat.format(
                  this.point.y
                )}</span></div>`;
              } else {
                return `<div class="labels-container labels-container-percent-mobile"><span>${numberFormat.format(
                  this.point.y
                )}</span></div>`;
              }
            },
            style: {
              fontSize: '.8em',
            },
          },
        },
        {
          type: 'column',
          name: 'Cantidad Completada',
          pointWidth: barSize,
          pointPadding: 0.09,
          borderWidth: 0,

          data: machines.map((machine) => {
            return {
              y: machine.quantityCompleted,
              color: this.colorService.getHexadecimalColorByColorNumber(
                machine.colorId
              ),
            };
          }),
          dataLabels: {
            enabled: true,
            useHTML: true,
            formatter: function () {
              if ((this.point.y * 100) / this.series.yAxis.max >= 80) {
                return `<div class="labels-container labels-container-percent-mobile time-label-absolute-production"><span>${numberFormat.format(
                  this.point.y
                )}</span></div>`;
              } else {
                return `<div class="labels-container labels-container-percent-mobile"><span>${numberFormat.format(
                  this.point.y
                )}</span></div>`;
              }
            },
            style: {
              fontSize: '.8em',
            },
          },
        },
        {
          type: 'column',
          name: 'Cantidad por Completar',
          pointWidth: barSize,
          pointPadding: 0.09,
          borderWidth: 0,

          data: machines.map((machine) => {
            return {
              y: machine.amountToBeCompleted,
              color: '#98297a',
            };
          }),
          dataLabels: {
            enabled: true,
            useHTML: true,
            formatter: function () {
              if ((this.point.y * 100) / this.series.yAxis.max >= 80) {
                return `<div class="labels-container labels-container-percent-mobile time-label-absolute"><span>${numberFormat.format(
                  this.point.y
                )}</span></div>`;
              } else {
                return `<div class="labels-container labels-container-percent-mobile"><span>${numberFormat.format(
                  this.point.y
                )}</span></div>`;
              }
            },
            style: {
              fontSize: '.8em',
            },
          },
        },
        {
          type: 'line',

          name: 'Cantidad por Completar',
          data: machines.map((machine) => {
            return {
              y: machine.amountToBeCompleted,
              name: machine.percentage,
              color: '#98297a',
            };
          }),
          pointPlacement: 0.20
        },
      ],
    };
  }

  getProductionWeekMobile(production: any): Highcharts.Options {
    const numberFormat = new Intl.NumberFormat('es-MX');
    return {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
      },
      title: {
        text: `${production.percentage} %`,
        align: 'center',
        verticalAlign: 'middle',
        y: 35,
        style: {
          fontSize: '1em',
          fontWeight: 'bold',
          color: '#223ea2',
        },
      },
      tooltip: {
        enabled: false,
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: true,
            distance: -20,
            useHTML: true,
            formatter: function () {
              return numberFormat.format(this.point.y);
            },
            style: {
              fontSize: '.8em',
            },
          },
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '115%'],
          size: '250%',
        },
      },
      series: [
        {
          type: 'pie',
          name: 'Day',
          innerSize: '50%',
          data: [
            {
              y: production.orderedQuantity,
              name: numberFormat.format(production.orderedQuantity),
              color: '#5f376b',
              dataLabels: {
                enabled: true,
                style: {
                  fontSize: '.6em',
                  color: 'white',
                },
              },
            },
            {
              y: production.quantityCompleted,
              name: numberFormat.format(production.quantityCompleted),
              color: this.colorService.getHexadecimalColorByColorNumber(
                production.colorId
              ),
              dataLabels: {
                enabled: true,
                style: {
                  fontSize: '.6em',
                },
              },
            },
          ],
        },
      ],
    };
  }

  getProductionWeek(production: any): Highcharts.Options {
    const numberFormat = new Intl.NumberFormat('es-MX');
    return {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
      },
      title: {
        text: `${production.percentage} %`,
        align: 'center',
        verticalAlign: 'middle',
        y: 60,
        style: {
          fontSize: '2vh',
          fontWeight: 'bold',
          color: '#223ea2',
        },
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: true,
            distance: -35,
            useHTML: true,
            formatter: function () {
              return numberFormat.format(this.point.y);
            },
            style: {
              fontSize: '1.4vh',
            },
          },
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '75%'],
          size: '150%',
        },
      },
      series: [
        {
          type: 'pie',
          name: 'Day',
          innerSize: '50%',
          data: [
            {
              y: production.orderedQuantity,
              name: numberFormat.format(production.orderedQuantity),
              color: '#5f376b',
              dataLabels: {
                enabled: true,
                style: {
                  fontSize: '1.9vh',
                  color: 'white',
                },
              },
            },
            {
              y: production.quantityCompleted,
              name: numberFormat.format(production.quantityCompleted),
              color: this.colorService.getHexadecimalColorByColorNumber(
                production.colorId
              ),
              dataLabels: {
                enabled: true,
                style: {
                  fontSize: '1.9vh',
                },
              },
            },
          ],
        },
      ],
    };
  }
}
