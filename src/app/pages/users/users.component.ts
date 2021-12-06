import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { pageSizeOptions } from '@core/utils';
import { NO_RESULT_TEXT } from '@core/utils/app-messages';
import { WoodDialogService } from '@core/wood-dialog/wood-dialog.service';
import { MtxGridColumn } from '@ng-matero/extensions';
import { DepartmentService } from 'app/proxy/departments';
import { FactoryService } from 'app/proxy/factories';
import { UpdateUserStatusDto, UserRequestDto, UserService } from 'app/proxy/users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  //#region ATTRIBUTES 
  title: string = 'Administración de Usuarios'
  users = []
  noResultText: string = NO_RESULT_TEXT
  pageSizeOptions: any[] = pageSizeOptions
  objFilter: any = {};
  query: any = { pageSize: 5, pageIndex: 0 }
  length: number = 0;
  factoryDataSource: any[] = []
  departmentDataSource: any[] = []

  columns: MtxGridColumn[] = [
    { header: 'Nombre Completo', field: 'name' },
    { header: 'Correo Electrónico', field: 'email' },
    { header: 'Planta', field: 'factoryName' },
    { header: 'Departamento', field: 'departmentName' },
    { header: 'Tipo Usuario', field: 'userType' },
    { header: 'Perfil', field: 'roleName' },
    { header: 'Estatus', field: 'status' },
    { header: '', field: 'isActive' }

  ];

  //#endregion

  //#region CONSTRUCTOR
  constructor(
    private userService: UserService,
    private factoryService: FactoryService,
    private departmentService: DepartmentService,
    private woodDialogService: WoodDialogService) { }
  //#endregion

  //#region PUBLIC METHODS
  public ngOnInit() {
    this.getData()
    this.getFactories()
  }

  public onSearch() {
    this.getData()
  }

  public onFactoryChange(event) {
    const { value, selected } = event.source;
    if (event.isUserInput || selected) {
      this.objFilter.factoryId = value;
      this.getDepartments(value)
      this.getData()
    }
  }
  public onDepartmentChange(event) {
    const { value, selected } = event.source;
    if (event.isUserInput || selected) {
      this.objFilter.departmentId = value;
      this.getData()
    }
  }
  public onFilterChange(value: number = null) {
    this.objFilter.isActive = null;
    switch (value) {
      case 0:
        this.objFilter.isActive = false;
        break;
      case 1:
        this.objFilter.isActive = true;
        break;
    }

    this.getData()
  }
  public updateStatus(event, user) {
    const options = {
      title: user?.isActive ? '¿Activar Usuario?' : "¿Inactivar Usuario?",
      message: user?.isActive ? '¿Desea activar el usuario?' : "¿Desea inactivar el usuario?"
    }
    this.woodDialogService.confirm(options)
      .then((dlgResult) => {
        if (dlgResult) {
          const param: UpdateUserStatusDto = {
            id: user?.id,
            isActive: user?.isActive
          }
          this.userService.updateUserStatus(param).toPromise()
            .then(result => {
              this.woodDialogService.handleResult(result)
            })
            .catch(error => {
              this.woodDialogService.handleError(error)
            })
        } else {
          event.source.checked = !event.source.checked;
        }
      })
  }

  public getNextPage(e: PageEvent) {
    this.query.pageIndex = e.pageIndex;
    this.query.pageSize = e.pageSize;
    this.getData();
  }
  //#endregion

  //#region PRIVATE METHODS
  private getData() {
    const param: UserRequestDto = {
      skipCount: this.query.pageIndex * this.query.pageSize,
      maxResultCount: this.query.pageSize,
    }
    if (this.objFilter) {
      if (this.objFilter.factoryId) {
        param.factoryId = this.objFilter.factoryId
      }
      if (this.objFilter.departmentId) {
        param.departmentId = this.objFilter.departmentId
      }
      if (this.objFilter.searchTerm) {
        param.name = this.objFilter.searchTerm
      }
      param.isActive = this.objFilter.isActive
    }

    this.userService.getList(param).toPromise()
      .then((result: any) => {
        this.users = result.items || []
        this.length = result.totalCount
      })
      .catch()
  }
  private getFactories() {
    this.factoryService.getList().toPromise()
      .then(result => {
        this.factoryDataSource = result || []
      })
      .catch()
  }
  private getDepartments(factoryId) {
    console.log("departmentDataSource", this.departmentDataSource)
    this.departmentService.getListByFactoryId(factoryId).toPromise()
      .then(result => {
        console.log(result)
        this.departmentDataSource = result || []
        console.log("departmentDataSource", this.departmentDataSource)
      })
      .catch()
  }


  //#endregion

}