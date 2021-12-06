import { Component, OnInit } from '@angular/core';
import { QualityAlertService } from 'app/proxy/reports/quality-alert.service';
import { DomSanitizer } from '@angular/platform-browser';
import { IndicatorService, UpdateIndicatorDto } from 'app/proxy/indicators';

@Component({
  selector: 'app-quality-alerts',
  templateUrl: './quality-alerts.component.html',
  styleUrls: ['./quality-alerts.component.scss']
})
export class QualityAlertsComponent implements OnInit {
  ip: string = '134.234.422.12';
  pdfSrc: string;
  qualityAlerts: any;
  qualityAlertsArray: any;
  actualIndex: any = 0;
  timeToChangeScreen = 0;
  appUrl: any;

  indicatorsList: any;
  reportName: string = "Alertas de Calidad";
  reportSelected: any;

  minutes: any = 0;
  seconds: any = 0;

  constructor(private qualityAlertsService: QualityAlertService, private sanitizer: DomSanitizer, private indicatorService: IndicatorService,) { 
    this.pdfSrc = `${location.origin}/assets/files/alerta-ejemplo.pdf`;
  }

  ngOnInit(): void {
    this.getIndicatorList();    
    this.appUrl =
      window.location.hostname == 'localhost'
        ? 'http://windevvm.westus2.cloudapp.azure.com:83'
        : 'http://windevvm.westus2.cloudapp.azure.com:89';       
  }

  sanitizeUrl(url) {
    const _url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return _url;
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
      }      
    });

    this.getAlerts();
  }

  setArray(){
    let _alerts = [];
    let _alertsTemp = [];

    this.qualityAlerts.map(alert => {
      console.log(alert);      
      console.log(_alertsTemp.length);
      if (_alertsTemp.length <= 2){
        _alertsTemp.push(alert);
      }   

      if (_alertsTemp.length == 2) {
        _alerts.push(_alertsTemp);
        _alertsTemp = [];
      }         
    })

    console.log(_alerts);
    this.qualityAlertsArray = _alerts;
    this.start(_alerts.length);
  }

  getAlerts(){
    this.qualityAlertsService.getListByIp(this.ip).toPromise().then(result => {
      console.log(result);
      this.qualityAlerts = result;
      this.setArray();  
    })
  }

  start(length) {
    let parentThis = this;
    if (this.timeToChangeScreen == 0){
      this.timeToChangeScreen = (this.minutes * 60) + this.seconds;
    }

    console.log(this.timeToChangeScreen);
    setTimeout(function () {
      const itemsCount = length;

      if (parentThis.actualIndex < itemsCount - 1){
        parentThis.actualIndex += 1;
      }else {
        parentThis.actualIndex = 0;
      }

      console.log(`ActualIndex: ${parentThis.actualIndex}`);

      // Again
      parentThis.start(length);

    }, this.timeToChangeScreen * 1000);
  }

}
