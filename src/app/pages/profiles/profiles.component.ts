import { Component, OnInit } from '@angular/core';
import { DataGridColumn } from '@core/shared/data-grid/data-grid.model';
import { profiles } from './data';
import { ProfilingService } from 'app/proxy/profilings/profiling.service';
import { ProfilingDto } from 'app/proxy/profilings/models';
import { NO_RESULT_TEXT } from '@core/utils/app-messages';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
})
export class ProfilesComponent implements OnInit {
  title: string = 'Administracion de Perfiles';
  profilesData: any;
  noResultText: string = NO_RESULT_TEXT;
  objFilter: any = {};
  query: any = { pageSize: 5, pageIndex: 0 };
  length: number = 0;

  columns: DataGridColumn[] = [
    { header: 'Perfil', field: 'profile' },
    { header: 'Tipo de Usuario', field: 'userTypeName' },
    { header: 'Planta', field: 'factory' },
    { header: 'Nave', field: 'warehouses' },
    { header: 'Indicadores', field: 'indicators' },
  ];

  constructor(private profilingService: ProfilingService) {
    this.getProfilingList();
  }

  public getWarehouses(factories: any) {
    let warehousesArray = [];
    factories.map((factory) => {
      factory.warehouses.map((warehouse) =>
        warehousesArray.push({
          warehouse: warehouse.warehouseName,
          factoryId: factory.factoryId
        })
      );
    });

    console.log(warehousesArray);

    return warehousesArray;
  }

  public getFactories(factories: any) {
    const factoriesArray = factories.map((factory) => {
      return factory?.factoryName;
    });

    return factoriesArray;
  }

  public getProfilingList() {
    console.log(this.objFilter.searchTerm);

    this.profilingService
      .getList(this.objFilter.searchTerm)
      .toPromise()
      .then((result) => {
        this.profilesData = result;
      });
  }

  public onSearch() {
    this.getProfilingList();
  }

  public getIndicators(factories: any, warehouse: any) {
    let indicatorsArray = [];
    factories.map((factory) => {
      if (factory.factoryId == warehouse.factoryId){
        const _warehouse = factory.warehouses.find(
          (_warehouse) => _warehouse.warehouseName == warehouse.warehouse
        );      
        if (_warehouse) {
          console.log(_warehouse.indicators);
          indicatorsArray.push(_warehouse.indicators);
        }
      }      
    });

    console.log(`Nave: ${warehouse} - Indicadores: ${indicatorsArray}`)

    return indicatorsArray[0]
      .map((result) => {
        return result.name;
      })
      .join(', ');
  }

  ngOnInit(): void {}
}
