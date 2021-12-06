import { Injectable } from '@angular/core';
import { IndicatorColorServiceService } from '../../shared/indicator-color-service.service';
import * as Highcharts from 'highcharts';

@Injectable({
  providedIn: 'root',
})
export class OeeReportServiceService {
  constructor(private indicatorColorService: IndicatorColorServiceService) {}

  setChartOeeOptions(warehouse: any): Highcharts.Options {
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
            fontWeight: 'bold',
            fontSize: '1.5vh',
          },
        },
      },
      tooltip: {
        enabled: false,
      },
      yAxis: {
        title: {
          text: 'Porcentaje',
          style: {
            color: '#223ea2',
            fontWeight: 'bold',
          },
        },
      },
      legend: {
        enabled: true,
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          color: '#8181ff',
          dataLabels: {
            useHTML: true,
            enabled: true,
            format: '{point.y:.1f}%',
            style: {
              fontWeight: 'bold',
              fontSize: '15px',
              color: '#223ea2',
            },
          },
        },
      },

      series: [
        {
          type: 'column',
          showInLegend: false,
          data: [
            {
              name: 'Disponibilidad',
              y: warehouse.availability,
              color:
                this.indicatorColorService.getHexadecimalColorByColorNumber(
                  warehouse.availabilityColorId
                ),
              drilldown: null,
            },
            {
              name: 'Eficiencia',
              y: warehouse.efficiency,
              color:
                this.indicatorColorService.getHexadecimalColorByColorNumber(
                  warehouse.efficiencyColorId
                ),
              drilldown: null,
            },
            {
              name: 'Calidad',
              y: warehouse.quality,
              color:
                this.indicatorColorService.getHexadecimalColorByColorNumber(
                  warehouse.qualityColorId
                ),
              drilldown: null,
            },
          ],
        },
      ],
    };
  }

  setOeeGaugeChartOptions(warehouse: any): Highcharts.Options {
    return {
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        height: '280vh',
      },
      title: null,
      pane: {
        startAngle: -65,
        endAngle: 65,
        background: null,
        center: ['50%', '145%'],
        size: 570,
      },
      yAxis: [
        {
          min: -10,
          max: 110,
          minorTickPosition: 'outside',
          tickPosition: 'outside',
          labels: {
            distance: 45,
            style: {
              fontSize: '15px',
              fontWeight: 'bold',
            },
          },
          plotBands: [
            {
              from: -10,
              to: 75,
              color: '#DF5353',
              innerRadius: '110%',
              outerRadius: '100%',
            },
            {
              from: 75,
              to: 80,
              color: '#DDDF0D',
              innerRadius: '110%',
              outerRadius: '100%',
            },
            {
              from: 80,
              to: 85,
              color: '#55BF3B',
              innerRadius: '110%',
              outerRadius: '100%',
            },
            {
              from: 85,
              to: 300,
              color: '#6adcf2',
              innerRadius: '110%',
              outerRadius: '100%',
            },
          ],
          pane: 0,
          title: {
            text: '% OEE',
            style: {
              fontSize: '20px',
              fontWeight: 'bold',
            },
            y: -40,
          },
        },
      ],

      plotOptions: {
        gauge: {
          dataLabels: {
            enabled: true,
            format: '{point.y}%',
            style: {
              fontSize: '25px',
              color: '#223ea2',
            },
          },
        },
      },

      series: [
        {
          type: 'gauge',
          data: [
            {
              y: warehouse.oee,
              color: 'black',
            },
          ],
          yAxis: 0,
          dial: {
            baseWidth: 10,
            radius: '95px',
            backgroundColor: 'black',
          },
        },
      ],
    };
  }

  setOeeGaugeChartMobileOptions(warehouse: any): Highcharts.Options {
    console.log(warehouse);
    return {
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        height: '220vh',
      },

      title: null,
      pane: {
        startAngle: -95,
        endAngle: 95,
        background: null,
        center: ['50%', '100%'],
        size: 250,
      },
      yAxis: [
        {
          min: -10,
          max: 110,
          minorTickPosition: 'outside',
          tickPosition: 'outside',
          labels: {
            distance: 45,
            style: {
              fontSize: '15px',
              fontWeight: 'bold',
            },
          },
          plotBands: [
            {
              from: -10,
              to: 75,
              color: '#DF5353',
              innerRadius: '110%',
              outerRadius: '100%',
            },
            {
              from: 75,
              to: 80,
              color: '#DDDF0D',
              innerRadius: '110%',
              outerRadius: '100%',
            },
            {
              from: 80,
              to: 85,
              color: '#55BF3B',
              innerRadius: '110%',
              outerRadius: '100%',
            },
            {
              from: 85,
              to: 300,
              color: '#6adcf2',
              innerRadius: '110%',
              outerRadius: '100%',
            },
          ],
          pane: 0,
          title: {
            text: '% OEE',
            style: {
              fontSize: '20px',
              fontWeight: 'bold',
            },
            y: -40,
          },
        },
      ],

      plotOptions: {
        gauge: {
          dataLabels: {
            enabled: true,
            formatter: function () {
              return `${this.point.y > 100 ? 100 : this.point.y.toFixed()}%`;
            },
            style: {
              fontSize: '25px',
              color: '#223ea2',
            },
          },
        },
      },

      series: [
        {
          type: 'gauge',
          data: [
            {
              y: warehouse.oee,
              color: 'black',
            },
          ],
          yAxis: 0,
          dial: {
            baseWidth: 10,
            radius: '95px',
            backgroundColor: 'black',
          },
        },
      ],
    };
  }

  setOptionsOeeGeneral(factory: any): Highcharts.Options {
    return {
      chart: {
        type: 'column',
      },
      title: null,
      xAxis: {
        categories: factory.warehouses.map((warehouse) => {
          return warehouse.warehouse;
        }),
        crosshair: true,
        labels: {
          style: {
            fontSize: '1.5vh',
            fontWeight: 'bold',
          },
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Porcentaje',
          style: {
            color: '#223ea2',
            fontWeight: 'bold',
          },
        },
        stackLabels: {
          enabled: true,
        },
      },
      tooltip: {
        enabled: false,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
        series: {
          dataLabels: {
            enabled: true,
            color: '#223ea2',
          },
        },
      },
      series: [
        {
          type: 'column',
          showInLegend: false,
          pointWidth: 32,
          groupPadding: 0.1,
          pointPadding: 0.1,
          borderWidth: 0,
          data: factory.warehouses.map((warehouse) => {
            return {
              name: 'Disponibilidad',
              y: warehouse.availability,
              color:
                this.indicatorColorService.getHexadecimalColorByColorNumber(
                  warehouse.availabilityColorId
                ),
            };
          }),
          dataLabels: {
            enabled: true,
            color: '#223ea2',
            useHTML: true,
            formatter: function () {
              if ((this.point.y * 100) / this.series.yAxis.max >= 90) {
                return `<div class="datalabel" style="position: relative; top: -28px;"><span style="font-size: 15px"><b>${
                  this.point.y
                }%</b></span></div><br/><div class="datalabelInside" style="position: absolute; position: absolute; bottom: ${
                  (this.point.y * -92) / 89
                }px; transform: rotate(270deg); right: -26px; color: black;">${
                  this.point.name
                }</div>`;
              } else {
                return `<div class="datalabel" style="position: relative; top: 20px;"><span style="font-size: 15px"><b>${
                  this.point.y
                }%</b></span></div><br/><div class="datalabelInside" style="position: absolute; position: absolute; bottom: ${
                  (this.point.y * -110) / 89 - 4
                }px; transform: rotate(270deg); right: -28px; color: black;">${
                  this.point.name
                }</div>`;
              }
            },

            style: {
              fontSize: '1.3vh',
            },
          },
        },
        {
          type: 'column',
          showInLegend: false,
          pointWidth: 32,
          groupPadding: 0.1,
          pointPadding: 0.1,
          borderWidth: 0,
          data: factory.warehouses.map((warehouse) => {
            return {
              y: warehouse.efficiency,
              name: 'Eficiencia',
              color:
                this.indicatorColorService.getHexadecimalColorByColorNumber(
                  warehouse.efficiencyColorId
                ),
            };
          }),
          dataLabels: {
            enabled: true,
            useHTML: true,
            formatter: function () {
              if ((this.point.y * 100) / this.series.yAxis.max >= 83) {
                return `<div class="datalabel" style="position: relative; top: -28px;"><span style="font-size: 15px"><b>${
                  this.point.y
                }%</b></span></div><br/><div class="datalabelInside" style="position: absolute; position: absolute; bottom: ${
                  (this.point.y * -98) / 89
                }px; transform: rotate(270deg); right: -12px; color: black;">${
                  this.point.name
                }</div>`;
              } else {
                return `<div class="datalabel" style="position: relative; top: 20px;"><span style="font-size: 15px"><b>${
                  this.point.y
                }%</b></span></div><br/><div class="datalabelInside" style="position: absolute; position: absolute; bottom: ${
                  (this.point.y * -110) / 89 - 6
                }px; transform: rotate(270deg); right: -12px; color: black;">${
                  this.point.name
                }</div>`;
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
          pointWidth: 32,
          groupPadding: 0.1,
          pointPadding: 0.1,
          borderWidth: 0,
          data: factory.warehouses.map((warehouse) => {
            return {
              y: warehouse.quality,
              name: 'Calidad',
              color:
                this.indicatorColorService.getHexadecimalColorByColorNumber(
                  warehouse.qualityColorId
                ),
            };
          }),
          dataLabels: {
            enabled: true,
            useHTML: true,
            formatter: function () {
              if ((this.point.y * 100) / this.series.yAxis.max >= 80) {
                return `<div class="datalabel" style="position: relative; top: -28px;"><span style="font-size: 15px"><b>${
                  this.point.y
                }%</b></span></div><br/><div class="datalabelInside" style="position: absolute; position: absolute; bottom: ${
                  (this.point.y * -100) / 89
                }px; transform: rotate(270deg); right: -8px; color: black;">${
                  this.point.name
                }</div>`;
              } else {
                return `<div class="datalabel" style="position: relative; top: 20px;"><span style="font-size: 15px"><b>${
                  this.point.y
                }%</b></span></div><br/><div class="datalabelInside" style="position: absolute; position: absolute; bottom: ${
                  (this.point.y * -110) / 89 - 6
                }px; transform: rotate(270deg); right: -8px; color: black;">${
                  this.point.name
                }</div>`;
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

  setOptionsOeeGnlMobile2(factory: any): Highcharts.Options {
    return {
      chart: {
        type: 'bar',
      },
      title: null,
      xAxis: {
        categories: factory.warehouses.map((warehouse) => {
          return warehouse.warehouse;
        }),
        crosshair: true,
        labels: {
          style: {
            fontSize: '1.2vh',
            fontWeight: 'bold',
          },
        },
      },
      yAxis: {
        min: 0,
        max: 100,
        title: {
          text: 'Porcentaje (%)',
          align: 'high',
        },
        labels: {
          overflow: 'justify',
        },
      },
      tooltip: {
        enabled: false,
        valueSuffix: ' millions',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          type: 'bar',
          dataLabels: {
            inside: true,
            useHTML: true,
            format: '{point.name} - {point.y}%',
            style: {
              color: 'black'
            }
          },
          pointWidth: 16,
          groupPadding: 0.04,
          pointPadding: 0.1,
          borderWidth: 0,
          data: factory.warehouses.map((warehouse) => {
            return {
              name: 'Disponibilidad',
              y: warehouse.availability,
              color:
                this.indicatorColorService.getHexadecimalColorByColorNumber(
                  warehouse.availabilityColorId
                ),
            };
          }),
        },
        {
          type: 'bar',
          dataLabels: {
            inside: true,
            useHTML: true,
            format: '{point.name} - {point.y}%',
            style: {
              color: 'black'
            }
          },
          pointWidth: 16,
          groupPadding: 0.04,
          pointPadding: 0.1,
          borderWidth: 0,
          data: factory.warehouses.map((warehouse) => {
            return {
              y: warehouse.efficiency,
              name: 'Eficiencia',
              color:
                this.indicatorColorService.getHexadecimalColorByColorNumber(
                  warehouse.efficiencyColorId
                ),
            };
          }),
        },
        {
          type: 'bar',
          dataLabels: {
            inside: true,
            useHTML: true,
            format: '{point.name} - {point.y}%',
            style: {
              color: 'black'
            }
          },
          pointWidth: 16,
          groupPadding: 0.04,
          pointPadding: 0.1,
          borderWidth: 0,
          data: factory.warehouses.map((warehouse) => {
            return {
              y: warehouse.quality,
              name: 'Calidad',
              color:
                this.indicatorColorService.getHexadecimalColorByColorNumber(
                  warehouse.qualityColorId
                ),
            };
          }),
        },        
      ],
    };
  }

  setOptionsOeeGeneralMobile(factory: any): Highcharts.Options {
    return {
      chart: {
        type: 'column',
      },
      title: null,
      xAxis: {
        categories: factory.warehouses.map((warehouse) => {
          return warehouse.warehouse;
        }),
        crosshair: true,
        labels: {
          style: {
            fontSize: '1.5vh',
            fontWeight: 'bold',
          },
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
            color: '#223ea2',
          },
        },
      },
      series: [
        {
          type: 'column',
          showInLegend: false,
          pointWidth: 11,
          groupPadding: 0.9,
          pointPadding: 1,
          borderWidth: 0,
          data: factory.warehouses.map((warehouse) => {
            return {
              name: 'Disponibilidad',
              y: warehouse.availability,
              color:
                this.indicatorColorService.getHexadecimalColorByColorNumber(
                  warehouse.availabilityColorId
                ),
            };
          }),
          dataLabels: {
            enabled: true,
            color: '#223ea2',
            useHTML: true,
            formatter: function () {
              if ((this.point.y * 100) / this.series.yAxis.max >= 87) {
                return `<div class="datalabel" style="position: relative; top: -21px;"><span style="font-size: 9px"><b>${this.point.y.toFixed(
                  0
                )}%</b></span></div><br/><div class="datalabelInsideMobile" style="position: absolute; position: absolute; bottom: ${
                  (this.point.y * -66) / 89 - 4
                }px; transform: rotate(270deg); right: 3.3vh; color: black;">${
                  this.point.name
                }</div>`;
              } else {
                return `<div class="datalabel" style="position: relative; top: 20px;"><span style="font-size: 9px"><b>${this.point.y.toFixed(
                  0
                )}%</b></span></div><br/><div class="datalabelInsideMobile" style="position: absolute; position: absolute; bottom: ${
                  (this.point.y * -140) / 89 - 4
                }px; transform: rotate(270deg); right: 3.3vh; color: black;">${
                  this.point.name
                }</div>`;
              }
            },

            style: {
              fontSize: '1.3vh',
            },
          },
        },
        {
          type: 'column',
          showInLegend: false,
          pointWidth: 11,
          groupPadding: 0.9,
          pointPadding: 1,
          borderWidth: 0,
          data: factory.warehouses.map((warehouse) => {
            return {
              y: warehouse.efficiency,
              name: 'Eficiencia',
              color:
                this.indicatorColorService.getHexadecimalColorByColorNumber(
                  warehouse.efficiencyColorId
                ),
            };
          }),
          dataLabels: {
            enabled: true,
            useHTML: true,
            formatter: function () {
              if ((this.point.y * 100) / this.series.yAxis.max >= 90) {
                return `<div class="datalabel" style="position: relative; top: -21px;"><span style="font-size: 9px"><b>${this.point.y.toFixed(
                  0
                )}%</b></span></div><br/><div class="datalabelInsideMobile" style="position: absolute; position: absolute; bottom: ${
                  (this.point.y * -72) / 89 - 4
                }px; transform: rotate(270deg); right: -1.7vh; color: black;">${
                  this.point.name
                }</div>`;
              } else {
                return `<div class="datalabel" style="position: relative; top: 20px;"><span style="font-size: 9px"><b>${this.point.y.toFixed(
                  0
                )}%</b></span></div><br/><div class="datalabelInsideMobile" style="position: absolute; position: absolute; bottom: ${
                  (this.point.y * -140) / 89 - 4
                }px; transform: rotate(270deg); right: -1.7vh; color: black;">${
                  this.point.name
                }</div>`;
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
          pointWidth: 11,
          groupPadding: 0.9,
          pointPadding: 1,
          borderWidth: 0,
          data: factory.warehouses.map((warehouse) => {
            return {
              y: warehouse.quality,
              name: 'Calidad',
              color:
                this.indicatorColorService.getHexadecimalColorByColorNumber(
                  warehouse.qualityColorId
                ),
            };
          }),
          dataLabels: {
            enabled: true,
            useHTML: true,
            formatter: function () {
              if ((this.point.y * 100) / this.series.yAxis.max >= 85) {
                return `<div class="datalabel" style="position: relative; top: -21px;"><span style="font-size: 9px"><b>${this.point.y.toFixed(
                  0
                )}%</b></span></div><br/><div class="datalabelInsideMobile" style="position: absolute; position: absolute; bottom: ${
                  (this.point.y * -75) / 89 - 4
                }px; transform: rotate(270deg); right: -8vh; color: black;">${
                  this.point.name
                }</div>`;
              } else {
                return `<div class="datalabel" style="position: relative; top: 20px;"><span style="font-size: 9px"><b>${this.point.y.toFixed(
                  0
                )}%</b></span></div><br/><div class="datalabelInsideMobile" style="position: absolute; position: absolute; bottom: ${
                  (this.point.y * -140) / 89 - 4
                }px; transform: rotate(270deg); right: -8vh; color: black;">${
                  this.point.name
                }</div>`;
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
