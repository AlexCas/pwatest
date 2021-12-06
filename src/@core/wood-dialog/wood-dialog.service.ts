import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ResultCode } from "app/proxy/enums";
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component";
import { WoodDialogComponent } from "./components/wood-dialog/wood-dialog.component";
import { WoodDialogConfig } from "./wood-dialog-config";


@Injectable({
    providedIn: "root"
})
export class WoodDialogService {


    constructor(
        private dialog: MatDialog,
        private router: Router) { }

    public open(config: WoodDialogConfig): Promise<boolean> {
        const dialogRef = this.dialog.open(WoodDialogComponent, {
            width: "370px",
            disableClose: config.dismissible,
            panelClass: 'wood-dialog-container',
            data: {
                title: config.title,
                message: config.message,
            }
        });

        return dialogRef.afterClosed().toPromise();
    }

    public confirm(config: WoodDialogConfig): Promise<boolean> {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: "370px",
            disableClose: !config.dismissible,
            data: {
                title: config.title,
                message: config.message,
            }
        });

        return dialogRef.afterClosed().toPromise();
    }

    public checkPassword(): Promise<boolean> {
        const dialogRef = this.dialog.open(null, {
            width: "370px",
            disableClose: true
        });

        return dialogRef.afterClosed().toPromise();
    }



    public openComponent(component: any, options: any): Promise<boolean> {
        const dialogRef = this.dialog.open(component, {
            width: options.width,
            disableClose: true,
            data: options.data
        });

        return dialogRef.afterClosed().toPromise();
    }



    public handleResult(result: any): Promise<boolean> {

        let type = "";
        if (result.resultCode === ResultCode.Success) {
            type = "success";
        } else if (result.resultCode === ResultCode.Warning) {
            type = "warning";
        } else {
            type = "error";
        }

        const message = result?.message;
        const dialogRef = this.dialog.open(WoodDialogComponent, {
            width: "370px",
            disableClose: true,
            data: {
                title: message?.title,
                message: message?.description,
                type
            }
        });

        return dialogRef.afterClosed()
            .toPromise();

    }

    public handleError(result: any): void {
        let message = "Ocurrió un error en el sistema";
        if (result && result.error && result.error.error) {
            message = result.error.error.message;
        }
        const dialogRef = this.dialog.open(WoodDialogComponent, {
            width: "370px",
            data: {
                title: "Error del sistema",
                message,
                type: "error"
            }
        });
    }

}
