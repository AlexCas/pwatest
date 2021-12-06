import { Injectable } from '@angular/core';
import { IndicatorColorServiceService } from '../../shared/indicator-color-service.service';
import * as Highcharts from 'highcharts';

@Injectable({
  providedIn: 'root',
})
export class SuppliesService {
  constructor(private indicatorColorService: IndicatorColorServiceService) {}

  setOptionsSupplies(warehouse: any): Highcharts.Options {
    return {
      chart: {
        type: 'column',        
      },
      title: null,

      xAxis: {
        type: 'category',
        crosshair: true,
        labels: {
          useHTML: true,
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Porcentaje',
          style: {
            fontWeight: 'bold',
            color: '#223ea2',
          },
        },
      },

      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
        series: {
          dataLabels: {
            useHTML: true,
            enabled: true,
            format: '{point.y}%',
            color: '#223ea2',
          },
        },
      },
      series: [
        {
          type: 'column',
          showInLegend: false,
          pointWidth: 75,
          data: warehouse.items.map((machine, index) => {
            return {
              y: machine.percentage,
              name: `<div class="col-12 p-0 text-center scrap-machine column-${index}">${machine.machine}</div> <div class="col-12 p-0 text-center supplies-subtitle">Vales Extra: ${machine.voucher}</div>`,
              color:
                this.indicatorColorService.getHexadecimalColorByColorNumber(
                  machine.colorId
                ),
            };
          }),
          dataLabels: {
            style: {
              fontSize: '1.3vh',
            },
          },
        },
      ],
    };
  }

  setOptionsSuppliesMobile(warehouse: any): Highcharts.Options {
    return {
      chart: {
        type: 'column',
      },
      title: null,

      xAxis: {
        type: 'category',
        crosshair: true,
        labels: {
          useHTML: true,
        },
      },
      yAxis: {
        min: 0,
        title: null,
      },

      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
        series: {
          dataLabels: {
            enabled: true,
            format: '{point.y}%',
            color: '#223ea2',
          },
        },
      },
      series: [
        {
          type: 'column',
          pointWidth: 23,
          showInLegend: false,
          data: warehouse.items.map((machine, index) => {
            return {
              y: machine.percentage,
              name: `<div class="text-center supp-machine column-${index}">${machine.machine}</div> <div class="text-center supp-subtitle">Vales Extra:</div> <div class="text-center supp-subtitle">${machine.voucher}</div>`,
              color:
                this.indicatorColorService.getHexadecimalColorByColorNumber(
                  machine.colorId
                ),
            };
          }),
          dataLabels: {
            style: {
              fontSize: '10px',
            },
          },
        },
      ],
    };
  }
}
