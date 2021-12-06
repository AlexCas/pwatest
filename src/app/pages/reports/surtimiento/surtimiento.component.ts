import { Component, OnInit } from '@angular/core';
import { PendingSupplyService } from '../../../proxy/reports/pending-supply.service';

@Component({
  selector: 'app-surtimiento',
  templateUrl: './surtimiento.component.html',
  styleUrls: ['./surtimiento.component.scss'],
})
export class SurtimientoComponent implements OnInit {
  suppliesData: any;
  ip: string = '134.234.422.12';

  constructor(private pendingSupplyService: PendingSupplyService) {}

  ngOnInit(): void {
    this.setSuppliesData();
  }

  setSuppliesData() {
    this.pendingSupplyService
      .getByIp(this.ip)
      .toPromise()
      .then((result) => {
        this.suppliesData = result;
      });
  }
}
