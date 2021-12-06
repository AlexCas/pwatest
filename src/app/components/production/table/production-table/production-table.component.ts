import { Component, OnInit, Input } from '@angular/core';
import { DataGridColumn } from '@core/shared/data-grid/data-grid.model';
import { NO_RESULT_TEXT } from '@core/utils/app-messages';
import { pageSizeOptions } from '@core/utils';
import * as moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

@Component({
  selector: 'app-production-table',
  templateUrl: './production-table.component.html',
  styleUrls: ['./production-table.component.scss'],
})
export class ProductionTableComponent implements OnInit {
  @Input() orders: any;

  machineOrders: any = [];
  noResultText: string = NO_RESULT_TEXT;
  pageSizeOptions: any[] = pageSizeOptions;
  objFilter: any = {};
  length: number = 0;
  numberFormat: any;

  columns: DataGridColumn[] = [
    { header: 'Maquina', field: 'machine' },
    { header: 'Fecha de Liberacion', field: 'date' },
    { header: 'No. Orden', field: 'order' },
    { header: 'No. Parte', field: 'articleNumber' },
    { header: 'Descripcion de Parte', field: 'description' },
    { header: 'Cantidad Planeada', field: 'orderedQuantity' },
    { header: 'Cantidad Producida', field: 'quantityCompleted' },
    { header: 'Cumplimiento por Orden', field: 'percentage' },
    { header: 'Cantidad por Completar', field: 'amountToBeCompleted' },
    { header: 'Tiempo Restante por OT', field: 'time' },
    { header: 'Tiempo Restante de Producción', field: 'timeP' },
    { header: 'Estatus de Molde', field: 'molde' },
  ];
  constructor() {}

  ngOnInit(): void {
    console.log(this.orders);
    this.numberFormat = new Intl.NumberFormat('es-MX');
    //this.setOrders();
  }

  formatDate(date: string) {
    const _date = date.slice(0, 10);
    let _day = moment(_date).format('dddd');
    return `${_day.charAt(0).toUpperCase()}${_day.slice(1)} ${moment(
      _date
    ).format('DD/MM/YYYY')}`;
  }

  /*setOrders() {
    this.orders.map((machine) => {
      let orders = machine.map((order) => {
        //order.machine = machine.machine;
        this.machineOrders.push(order);
      });
    });

    console.log(this.machineOrders);
  } */
}
