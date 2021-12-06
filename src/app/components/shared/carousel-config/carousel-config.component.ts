import { Component, OnInit, Input } from '@angular/core';
import { IndicatorService, UpdateIndicatorDto } from 'app/proxy/indicators';
import { WoodDialogService } from '@core/wood-dialog/wood-dialog.service';
import { ResultCode } from 'app/proxy/enums';

@Component({
  selector: 'app-carousel-config',
  templateUrl: './carousel-config.component.html',
  styleUrls: ['./carousel-config.component.scss'],
})
export class CarouselConfigComponent implements OnInit {
  @Input() reportName: any;

  indicatorsList: any;
  reportSelected: any;

  seconds: any = 0;
  minutes: any = 0;

  indicatorObj: any;

  constructor(
    private indicatorService: IndicatorService,
    private woodDialogService: WoodDialogService
  ) {}

  ngOnInit(): void {
    this.getIndicatorList();
  }

  getIndicatorList() {
    this.indicatorService
      .getList()
      .toPromise()
      .then((result) => {
        this.indicatorsList = result;
        this.getIndicatorForReport();
      });
  }

  getSelectedTimedInSeconds() {
    const _minToSec = this.minutes * 60;
    const _totalSeconds = _minToSec + this.seconds;

    const _obj = {
      id: this.indicatorObj.id,
      name: this.indicatorObj.name,
      interval: _totalSeconds,
      order: this.indicatorObj.order,
    };

    this.indicatorService
      .update(_obj)
      .toPromise()
      .then((result) => {
        this.woodDialogService.handleResult(result).then(() => {
          if (result.resultCode == ResultCode.Success) {
            console.log(result);
          }
        });
      });

    console.log(_obj);
  }

  getIndicatorForReport() {
    this.indicatorsList.map((i) => {
      if (i.name == this.reportName) {
        this.reportSelected = i;
        const _minutes = this.reportSelected.interval / 60;
        const _seconds = this.reportSelected.interval % 60;

        if (_minutes >= 1) {
          this.minutes = _minutes.toFixed(0);
        }
        this.seconds = _seconds;

        this.indicatorObj = i;
      }
    });
  }
}
