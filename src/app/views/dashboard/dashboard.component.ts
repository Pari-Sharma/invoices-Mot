import { Component , OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private cookie: CookieService){}
  userId:string = '';
  ngOnInit(): void {
      this.userId = this.cookie.get('id');
  }
}
