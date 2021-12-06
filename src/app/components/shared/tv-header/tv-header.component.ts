import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tv-header',
  templateUrl: './tv-header.component.html',
  styleUrls: ['./tv-header.component.scss']
})
export class TvHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() backButton: string = "";

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  goHome(){    
      this.router.navigateByUrl('/');
  }


}
