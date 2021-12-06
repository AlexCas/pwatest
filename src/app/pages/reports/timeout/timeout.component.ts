import { Component, OnInit } from '@angular/core';
import { DeadTimeService } from '../../../proxy/reports/dead-time.service';
import { data } from './data';

@Component({
  selector: 'app-timeout',
  templateUrl: './timeout.component.html',
  styleUrls: ['./timeout.component.scss']
})
export class TimeoutComponent implements OnInit {
	tmData: any;
  ip: string = '134.234.422.12';

  constructor(private deadTimeService: DeadTimeService) { }

  ngOnInit(): void {     
      this.setTmData(); 
  }

  setTmData(){
    this.deadTimeService.getByIp(this.ip).toPromise().then(resp => {
      this.tmData = resp;
    })
  }

}
