import { Component, OnInit } from '@angular/core';
import { ScrapService } from '../../../proxy/reports/scrap.service';

@Component({
  selector: 'app-scrap',
  templateUrl: './scrap.component.html',
  styleUrls: ['./scrap.component.scss'],
})
export class ScrapComponent implements OnInit {
  ip: string = '134.234.422.12';
  scrapData: any;

  constructor(private scrapService: ScrapService) {}

  ngOnInit(): void {
    this.setScrapData();
  }

  setScrapData() {
    this.scrapService
      .getByIp(this.ip)
      .toPromise()
      .then((result) => {
        console.log(result);
        this.scrapData = result;
      });
  }
}
