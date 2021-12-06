import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { WoodDialogConfig } from "@core/wood-dialog/wood-dialog-config";

@Component({
    selector: "app-wood-dialog",
    templateUrl: "./wood-dialog.component.html",
    styleUrls: ["./wood-dialog.component.scss"]
})


export class WoodDialogComponent {
    public title: string;
    public message: string;
    public icon: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public config: WoodDialogConfig) {
        this.title = config.title;
        this.message = config.message;
    }
}
