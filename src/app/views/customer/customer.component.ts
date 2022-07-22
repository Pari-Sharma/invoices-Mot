import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MD5 } from 'crypto-js';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  customer_id: any;
  numb: number = 2;
  allCustomer: any[] = [];
  form = new FormGroup({
    companyName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    contactNo: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    gstIn: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.-]*$'),
      Validators.maxLength(15),
      Validators.minLength(15),
    ]),
  });
  public visible = false;
  public edit = false;
  toggleLiveDemo() {
    this.form.reset();
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  toggleLiveEdit(i: any) {
    if (i != -1) {
      let p = this.allCustomer[parseInt(i)];
      this.customer_id = i;
      this.form.patchValue({
        companyName: p.name,
        contactNo: p.contactNumber,
        email: p.email,
        gstIn: p.gstin,
      });
    }
    this.edit = !this.edit;
  }

  handleLiveEditChange(event1: any) {
    this.edit = event1;
  }

  AddCustomer() {
    this.visible = !this.visible;
    console.log(this.form.value);
    console.log(this.form.value.companyName);
    let mn = {
      id: MD5(this.form.value.companyName!),
      name: this.form.value.companyName,
      contactNumber: this.form.value.contactNo,
      email: this.form.value.email,
      gstin: this.form.value.gstIn,
    };
    this.form.reset();
    // this.allCustomer.push(mn);
    console.log(mn);

    this.http
      .post(
        'https://localhost:44323/api/app/users/3a053181-1a15-fd06-fe02-d02979d0460b/customers',
        {
          name: mn.name,
          email: mn.email,
          contactNumber: mn.contactNumber,
          gstin: mn.gstin,
        }
      )
      .subscribe((result) => {
        mn.id = Object.values(result)[0];
        console.log("Mn is ",mn);
        
        this.allCustomer.push(mn);
        console.log(result);
      });
    
  }

  EditCustomer() {
    console.log(this.form.value);
    let mn = this.allCustomer[parseInt(this.customer_id)];
    console.log(this.customer_id);
    
    console.log(mn);
    
    let p = {
      id: mn.id,
      name: this.form.value.companyName,
      contactNumber: this.form.value.contactNo,
      email: this.form.value.email,
      gstin: this.form.value.gstIn,
    };
    console.log("Id to change the value",p.id);
    console.log(" name to change the value",p.name);
    console.log(" Email to change the value",p.email);
    console.log(" contactNumber to change the value",p.contactNumber);
    
    this.http
      .put(
        `https://localhost:44323/api/app/users/3a053181-1a15-fd06-fe02-d02979d0460b/customers/${mn.id}`,
        {
          name: p.name,
          email: p.email,
          contactNumber: p.contactNumber,
          gstin: p.gstin,
        }
      )
      .subscribe((result) => {
        console.log(result);
      });
    this.allCustomer[parseInt(this.customer_id)] = p;
    this.form.reset();
    this.edit = !this.edit;
  }

  get f() {
    return this.form.controls;
  }

  constructor(private modalService: NgbModal, private http: HttpClient) {}
  ngOnInit(): void {
    let userId = '3a053181-1a15-fd06-fe02-d02979d0460b';
    let url = `https://localhost:44323/api/app/users/${userId}/customers`;
    this.http.get(url).subscribe((result) => {
      // console.log(Object.values(result));
      this.allCustomer = Object.values(result);
      console.log(this.allCustomer);
      
    });
  }

  updateValue(data: any, value: string) {
    this.form.get(value)?.setValue(data.target.value);
  }
}
