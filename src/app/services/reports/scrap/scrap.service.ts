import { Injectable } from '@angular/core';
import { IndicatorColorServiceService } from '../../shared/indicator-color-service.service';
import * as Highcharts from 'highcharts';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class ScrapHighchartsService {
  constructor(private indicatorColorService: IndicatorColorServiceService) {}

  setOptionsSuppliesFactory(factory: any, type: string): Highcharts.Options {
    let categories = [];
    let machines = [];
    let cat = '';

    let primaryColor = type == 'warehouse' ? '#223ea2' : '#7291ff';
    let focusColor = '#7291ff';

    let options = { style: 'currency', currency: 'MXN' };
    var numberFormat = new Intl.NumberFormat('es-MX', options);

    if (factory?.machines) {
      cat = 'factory';
      machines = factory.machines.map((machine) => {
        return machine;
      });
    } else {
      cat = 'warehouse';
      machines = factory.items.map((machine) => {
        return machine;
      });
    }

    categories = machines.map((machine) => {
      return machine.machine;
    });
    return {
      chart: {
        type: 'column',
        events: {
          load: function () {
            categories.map((category) => {
              const container = document.getElementById(
                `factory-${category}-${cat}`
              );
              const html = `<div class="row text-center-gscrap">
                <div class="col-12 text-center p-0 scrap-machine">${category}</div>
                <div class="col-12 text-center p-0 scrap-subtitle">Cantidad Completada: ${machines
                  .map((machine) => {
                    let quantity = 0;
                    if (machine.machine == category) {
                      quantity = machine.completedQuantity;
                    }

                    return quantity == 0 ? '' : quantity;
                  })
                  .join('')}</div>
                <div class="col-12 text-center p-0 scrap-subtitle">Cantidad Scrap: ${machines
                  .map((machine) => {
                    let quantity = 0;
                    if (machine.machine == category) {
                      quantity = machine.scrapQuantity;
                    }

                    return quantity == 0 ? '' : quantity;
                  })
                  .join('')}</div>
                <div class="col-12 text-center p-0 col-warehouse-alert scrap-subtitle">Porcentaje Scrap: ${machines
                  .map((machine) => {
                    let quantity = 0;
                    if (machine.machine == category) {
                      quantity = machine.gnlScrapPercentage;
                    }

                    return quantity == 0 ? '' : quantity;
                  })
                  .join('')}%</div>
                <div class="col-12 text-center p-0 d-flex justify-content-center">
                <div class="warehouse-alert warehouse-alert__${machines
                  .map((machine) => {
                    let quantity = 0;
                    if (machine.machine == category) {
                      quantity = machine.colorId;
                    }

                    return quantity == 0 ? '' : quantity;
                  })
                  .join('')}"></div>
                </div>
              </div>`;
              container.innerHTML = html;
            });
          },
        },
      },
      title: null,
      xAxis: {
        categories: categories,
        labels: {
          useHTML: true,
          format: `<div class='scrap-factory' id='factory-{text}-${cat}'>{text}</div>`,
        },
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Costos',
          style: {
            fontWeight: 'bold',
            color: '#223ea2',
          },
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y}%</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
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
          showInLegend: false,
          data: machines.map((machine) => {
            return {
              y: machine.scrapCost,
              name: machine.gnlCostPercentage,
              color: machine.isInTop ? focusColor : primaryColor,
            };
          }),
          color: '#92aaff',
          dataLabels: {
            useHTML: true,
            enabled: true,
            formatter: function () {
              if ((this.point.y * 100) / this.series.yAxis.max >= 80) {
                return `<div class="labels-container scrap-label-percentage scrap-label-absolute"><span>${
                  this.point.name
                }%</span> <br /> <span class="labels-container-percent">${numberFormat.format(
                  this.point.y
                )}</span></div>`;
              } else {
                return `<div class="labels-container scrap-label-percentage"><span>${
                  this.point.name
                }%</span> <br /> <span class="labels-container-percent">${numberFormat.format(
                  this.point.y
                )}</span></div>`;
              }
            },
            color: '#223ea2',
            style: {
              fontSize: '1.4vh',
            },
          },
        },
      ],
    };
  }

  setOptionsMoldeMobileFactory(machines: any): Highcharts.Options {
    let options = { style: 'currency', currency: 'MXN' };
    var numberFormat = new Intl.NumberFormat('es-MX', options);

    return {
      chart: {
        type: 'column',
      },
      title: null,
      legend: {
        enabled: false,
      },
      yAxis: {
        title: null,
      },
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
      credits: {
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
          pointWidth: 35,
          dataLabels: {
            formatter: function () {
              if ((this.point.y * 100) / this.series.yAxis.max >= 80) {
                const _machines = machines
                  .map((m: any) => {
                    if (m.articleNumber == this.point.y) {
                      return `<div class="text-center"><div class="scrap-label-molde-absolute scrap-molde-mobile-percentage">${m.scrapPercentage} %</div> <div class="scrap-molde-mobile-article">${m.articleNumber}</div></div>`;
                    } else {
                      return '';
                    }
                  })
                  .join('');
                return _machines;
              } else {
                const _machines = machines
                  .map((m: any) => {
                    if (m.articleNumber == this.point.y) {
                      return `<div class="text-center"><div class="scrap-molde-mobile-percentage">${m.scrapPercentage} %</div> <div class="scrap-molde-mobile-article">${m.articleNumber}</div></div>`;
                    } else {
                      return '';
                    }
                  })
                  .join('');
                return _machines;
              }
            },
          },
          data: machines.map((m) => {
            return {
              y: m.articleNumber,
              name: `<div class="tp-title">${
                m.machine
              }</div> <div class="tp-subtitle">${
                m.mold
              }</div> <div class="tp-subtitle">Costo Scrap</div> <div class="tp-subtitle">${numberFormat.format(
                m.scrapCost
              )}<div class="tp-subtitle mt-1">${moment(
                m.date
              ).format('DD/MM/YY')}</div>
              </div> <div class="tp-subtitle-reason">${m.reasonCode
                .split(' ')
                .map((l) => `${l}<br/>`)
                .join(' ')}</div>
                </div>`,
              color: '#99119c',
            };
          }),
        },
      ],
    };
  }

  setOptionsSuppliesMobileFactory(
    factory: any,
    type: string
  ): Highcharts.Options {
    let categories = [];
    let machines = [];
    let cat = '';

    let primaryColor = type == 'warehouse' ? '#223ea2' : '#7291ff';
    let focusColor = '#7291ff';

    let options = { style: 'currency', currency: 'MXN' };
    var numberFormat = new Intl.NumberFormat('es-MX', options);

    if (factory?.machines) {
      cat = 'factory';
      machines = factory.machines.map((machine) => {
        return machine;
      });
    } else {
      cat = 'warehouse';
      machines = factory.items.map((machine) => {
        return machine;
      });
    }

    categories = machines.map((machine) => {
      return machine.machine;
    });
    return {
      chart: {
        type: 'column',
        events: {
          load: function () {
            categories.map((category, index) => {
              const container = document.getElementById(
                `factory-${category}-${cat}-${index}`
              );
              const html = `<div class="row text-center-gscrap">
                <div class="col-12 text-center p-0 scrap-machine-mobile">${category}</div>
                <div class="col-12 text-center p-0 scrap-subtitle-mobile">Cant. Comp.: ${machines
                  .map((machine, index2) => {
                    let quantity;
                    if (machine.machine == category && index == index2) {
                      quantity = machine.completedQuantity;
                    }

                    return quantity == '' && quantity != 0 ? '' : quantity;
                  })
                  .join('')}</div>
                <div class="col-12 text-center p-0 scrap-subtitle-mobile">Cant. Scrap: ${machines
                  .map((machine, index2) => {
                    let quantity;
                    if (machine.machine == category && index == index2) {
                      quantity = machine.scrapQuantity;
                    }

                    return quantity == '' && quantity != 0 ? '' : quantity;
                  })
                  .join('')}</div>
                <div class="col-12 text-center p-0 col-warehouse-alert scrap-subtitle-mobile">% Scrap: ${machines
                  .map((machine, index2) => {
                    let quantity;
                    if (machine.machine == category && index == index2) {
                      quantity = machine.gnlScrapPercentage;
                    }                    

                    return quantity == '' && quantity != 0 ? '' : quantity;
                  })
                  .join('')}%</div>
                <div class="col-12 text-center p-0 d-flex justify-content-center">
                <div class="warehouse-alert-mobile warehouse-alert__${machines
                  .map((machine, index2) => {
                    let quantity = 0;
                    if (machine.machine == category && index == index2) {
                      quantity = machine.colorId;
                    }

                    return quantity == 0 ? '' : quantity;
                  })
                  .join('')}"></div>                  
                </div>
                <div class="col-12 text-center p-0 mt-1 col-warehouse-alert scrap-subtitle-mobile">${machines
                  .map((machine, index2) => {
                    let quantity = '';
                    if (machine.machine == category && index == index2) {
                      quantity = moment(machine.date).format('DD/MM/YY');
                    }

                    return quantity;
                  })
                  .join('')}</div>
              </div>`;
              container.innerHTML = html;
            });
          },
        },
      },
      title: null,
      xAxis: {
        categories: categories.map((category, index) => {
          return `<div class='scrap-factory column-${index}' id='factory-${category}-${cat}-${index}'>${category}</div>`;
        }),
        labels: {
          useHTML: true,
        },
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: null,
      },
      tooltip: {
        enabled: false,
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y}%</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
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
          showInLegend: false,
          pointWidth: 35,
          groupPadding: 0.1,
          pointPadding: 0,
          borderWidth: 0,
          data: machines.map((machine) => {
            return {
              y: machine.scrapCost,
              name:
                cat == 'factory'
                  ? machine.gnlCostPercentage
                  : machine.scrapCostPercentage,
              color: machine.isInTop ? focusColor : primaryColor,
            };
          }),
          color: '#92aaff',
          dataLabels: {
            useHTML: true,
            enabled: true,
            formatter: function () {
              if ((this.point.y * 100) / this.series.yAxis.max >= 80) {
                return `<div class="labels-container scrap-label-percentage-mobile scrap-label-absolute-mobile"><span>${
                  this.point.name
                }%</span> <br /> <span class="labels-container-percent">${numberFormat.format(
                  this.point.y
                )}</span></div>`;
              } else {
                return `<div class="labels-container scrap-label-percentage-mobile"><span>${
                  this.point.name
                }%</span> <br /> <span class="labels-container-percent">${numberFormat.format(
                  this.point.y
                )}</span></div>`;
              }
            },
            color: '#223ea2',
            style: {
              fontSize: '1.4vh',
            },
          },
        },
      ],
    };
  }

  setOptionsSuppliesWarehouse(wareHouse: any): Highcharts.Options {
    let categories = wareHouse.items.map((machine) => {
      return machine.machine;
    });
    return {
      chart: {
        type: 'column',
        events: {
          load: function () {
            categories.map((category) => {
              const container = document.getElementById(`category-${category}`);
              const html = `<div class="row text-center-gscrap">
                <div class="col-12 p-0 text-center scrap-machine">${category}</div>
                <div class="col-12 p-0 text-center scrap-subtitle">Cantidad Completada:</div>
                <div class="col-12 p-0 text-center scrap-subtitle">${wareHouse.items
                  .map((machine) => {
                    let quantity = 0;
                    if (machine.machine == category) {
                      quantity = machine.completedQuantity;
                    }

                    return quantity == 0 ? '' : quantity;
                  })
                  .join('')}</div>
              </div>`;
              container.innerHTML = html;
            });
          },
        },
      },
      title: null,
      xAxis: {
        categories: categories,
        labels: {
          useHTML: true,
          format:
            "<div class='scrap-category' id='category-{text}'>{text}</div>",
        },
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: null,
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y}%</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
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
          showInLegend: false,
          data: wareHouse.items.map((machine) => {
            return {
              y: machine.scrapCost,
              name: machine.gnlCostPercentage,
            };
          }),
          color: 'darkorange',
          dataLabels: {
            useHTML: true,
            enabled: true,
            formatter: function () {
              if ((this.point.y * 100) / this.series.yAxis.max >= 90) {
                return `<div class="labels-container scrap-label-percentage scrap-label-absolute"><span>${this.point.name}%</span> <br /> <span class="labels-container-percent">${this.point.y}</span></div>`;
              } else {
                return `<div class="labels-container scrap-label-percentage"><span>${this.point.name}%</span> <br /> <span class="labels-container-percent">${this.point.y}</span></div>`;
              }
            },
            color: '#223ea2',
            style: {
              fontSize: '1.3vh',
            },
          },
        },
        {
          type: 'column',
          showInLegend: false,
          data: wareHouse.items.map((machine) => {
            return {
              y: machine.scrapQuantity,
              name: machine.gnlScrapPercentage,
              color:
                this.indicatorColorService.getHexadecimalColorByColorNumber(
                  machine.colorId
                ),
            };
          }),
          color: '#cacaca',
          dataLabels: {
            useHTML: true,
            enabled: true,
            formatter: function () {
              if ((this.point.y * 100) / this.series.yAxis.max >= 90) {
                return `<div class="labels-container scrap-label-percentage scrap-label-absolute"><span>${this.point.name}%</span> <br /> <span class="labels-container-percent">${this.point.y}</span></div>`;
              } else {
                return `<div class="labels-container scrap-label-percentage"><span>${this.point.name}%</span> <br /> <span class="labels-container-percent">${this.point.y}</span></div>`;
              }
            },
            color: '#223ea2',
            style: {
              fontSize: '1.3vh',
            },
          },
        },
      ],
    };
  }
}
