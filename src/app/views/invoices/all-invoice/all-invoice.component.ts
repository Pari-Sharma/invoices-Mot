import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-all-invoice',
  templateUrl: './all-invoice.component.html',
  styleUrls: ['./all-invoice.component.scss'],
})
export class AllInvoiceComponent implements OnInit {
  // Declaring variables

  url = '';
  isInvoice = true;
  data: any;

  /* Initialising cookies and HttpClient in Constructor*/

  constructor(private cookie: CookieService, private http: HttpClient) {}
  ngOnInit(): void {

    // Getting UserID by using  cookies and putting it into Url

    this.url = `https://localhost:44323/api/app/users/${this.cookie.get('uid')}/invoices`;

    // Getting invoices from Backend
    this.http.get(this.url).subscribe((result) => {
      this.data = Object.values(result);
      console.log(this.data);
    });
  }
}
