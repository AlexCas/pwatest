import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { DataGridColumn } from '@core/shared/data-grid/data-grid.model';
import { parse } from 'path';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  multi = [
    {
      name: 'Ordenada',
      series: [
        {
          name: 'OT00NV0301',
          value: 3000,
        },
        {
          name: 'OT00NV0302',
          value: 2500,
        },
        {
          name: 'OT00NV0303',
          value: 1100,
        },
        {
          name: 'OT00NV0304',
          value: 1200,
        },
        {
          name: 'OT00NV0305',
          value: 1300,
        },        
      ],
    },

    {
      name: 'Completada',
      series: [
        {
          name: 'OT00NV0301',
          value: 2500,
        },
        {
          name: 'OT00NV0302',
          value: 2000,
        },
        {
          name: 'OT00NV0303',
          value: 1000,
        },
        {
          name: 'OT00NV0304',
          value: 900,
        },
        {
          name: 'OT00NV0305',
          value: 700,
        },        
      ],
    },
  ];

  materiaPrima = [
    {
      name: 'Requerida',
      series: [
        {
          name: 'OT00NV0301',
          value: 3000,
        },
        {
          name: 'OT00NV0302',
          value: 2500,
        },
        {
          name: 'OT00NV0303',
          value: 1100,
        },
        {
          name: 'OT00NV0304',
          value: 1200,
        },
        {
          name: 'OT00NV0305',
          value: 1300,
        },        
      ],
    },

    {
      name: 'Consumida',
      series: [
        {
          name: 'OT00NV0301',
          value: 2500,
        },
        {
          name: 'OT00NV0302',
          value: 2000,
        },
        {
          name: 'OT00NV0303',
          value: 1000,
        },
        {
          name: 'OT00NV0304',
          value: 900,
        },
        {
          name: 'OT00NV0305',
          value: 700,
        },        
      ],
    },
    {
      name: 'Por Surtir',
      series: [
        {
          name: 'OT00NV0301',
          value: 500,
        },
        {
          name: 'OT00NV0302',
          value: 400,
        },
        {
          name: 'OT00NV0303',
          value: 800,
        },
        {
          name: 'OT00NV0304',
          value: 300,
        },
        {
          name: 'OT00NV0305',
          value: 110,
        },        
      ],
    },
  ];

  table: any = [];
  tableMP: any = [];

  colorScheme: Color = {
    name: '',
    selectable: false,
    group: ScaleType.Ordinal,
    domain: [
      '#FF5733',
      '#884EA0',
      '#2471A3',
      '#17A589',
      '#D4AC0D',
      '#BA4A00',
      '#A6ACAF',
      '#AEB6BF',
      '#F5B7B1',
      '#D6EAF8',
    ],
  };

  view: any[] = [700, 400];

  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  animations: boolean = true;
  xAxisLabel: string = 'Unidades';
  showXAxisLabel: boolean = true;
  currentColor: string = "blue";
  legendPosition: any = 'right';
  legendTitle: string = 'Orden de Trabajo';

  columns: DataGridColumn[] = [
    { header: 'OT', field: 'ot' },
    { header: 'Articulo', field: 'articulo' },
    { header: 'Desc', field: 'desc' },
    { header: 'Maquina', field: 'maq' },
    { header: 'Semaforo', field: 'semaforo' },
  ];

  columnsMP: DataGridColumn[] = [
    { header: 'OT', field: 'ot' },
    { header: 'Articulo', field: 'articulo' },
    { header: 'Desc', field: 'desc' },
    { header: 'Vales de Surtimiento', field: 'vale' },
  ];

  constructor() {}

  ngOnInit() {
    this.fillTable();
    this.fillTableMP();
  }

  private fillTable () {
    let _array = [];
    const colors = ["red-color", "yellow-color", "green-color"];
    for (let i = 1; i <= 5; i++){
      _array.push({
        ot: `OT00NV030${i}`,
        articulo: `Articulo ${i}`,
        desc: "Descripcion de prueba corta",
        maq: `Maquina ${i < 10 ? '0' + i : i}`,
        semaforo: colors[parseInt(this.getRandomArbitrary(1,3).toFixed(0)) - 1]
      });
    }
    this.table = _array;    
  }

  private fillTableMP () {
    let _array = [];
    for (let i = 1; i <= 5; i++){
      _array.push({
        ot: `OT00NV030${i}`,
        articulo: `Articulo ${i}`,
        desc: "Descripcion de prueba corta",
        vale: "String de 30 caracteres"     
      });
    }
    this.tableMP = _array;    
  }

  private getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}
