import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss'],
})
export class NewInvoiceComponent implements OnInit {
  //variable and array for customer static data shipping and OnChaning address enable and disable ,
  //new cust for fetching data from array close result for modals and isAlert for alert function
  address = false;
  newCustSelected = {
    companyName: '',
    billingId: '',
    shippingId: '',
    CustomerID: '',
    name: '',
    billingAddress: '',
    shippingAddress: '',
  };
  CustId: any;
  value: any;
  closeResult = '';
  isAlert = false;
  AddressURL = '';
  GetCustURL =
    'https://localhost:44323/api/app/users/3a054b4b-5f47-f638-50ab-5c6ccb80947a/customers';
  PostUrlInvoice = '';
  addressurl =
    'https://localhost:44323/api/app/customers/3a054afe-d6ff-91c4-af98-635c6cbdded0/addresses';
  //InvoiceForm !: FormGroup;
  Invoices: any = [];

  BillingAddressForm = new FormGroup({
    AddLine1: new FormControl('', [Validators.required]),
    AddLine2: new FormControl('', [Validators.required]),
    ZipCode: new FormControl('', [Validators.required]),
    City: new FormControl('', [Validators.required]),
    State: new FormControl('', [Validators.required]),
  });

  ShippingForm = new FormGroup({
    AddLine1: new FormControl('', [Validators.required]),
    AddLine2: new FormControl('', [Validators.required]),
    ZipCode: new FormControl('', [Validators.required]),
    City: new FormControl('', [Validators.required]),
    State: new FormControl('', [Validators.required]),
  });

  InvoiceForm = new FormGroup({
    InvoiceNo: new FormControl('', [Validators.required]),
    InvoiceDescription: new FormControl('', [Validators.required]),
    IssueDate: new FormControl('', [Validators.required]),
    ExpiryDate: new FormControl('', [Validators.required]),
    CustomerNotes: new FormControl('', [Validators.required]),
    TermsAndConditions: new FormControl('', [Validators.required]),
    Status: new FormControl('', [Validators.required]),
  });

  invoiceFormChange(data: any, value: any) {
    console.log('value is ', data.target.value);
    this.InvoiceForm.get(value)?.patchValue(data.target.value);
    console.log(this.InvoiceForm.value);
  }

  BillingTo!: FormGroup;
  Shipping: any = [];
  BillingCustomer: any = [];
  Billing: any = [];
  // custForm: any = [];
  Customer: any = [];
  //add Customer
  custForm = new FormGroup({
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

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  title = 'AddItems';
  vvvv = '';
  total = 0;
  itemArray: any[] = [];
  @ViewChild('content4') someElement!: ElementRef;
  @ViewChild('Add') divHello!: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private modalService: NgbModal,
    private formbuilder: FormBuilder,
    private cookie: CookieService
  ) {
    this.Invoices = [];
    this.Billing = [];
    this.Shipping = [];
    this.BillingCustomer = [];
  }
  date = new Date();
  currentYear = this.date.getUTCFullYear();
  currentMonth = this.date.getUTCMonth() + 1;
  currentDay = this.date.getUTCDate();
  //YYYY-MM-DD
  TodayDate = '2022-05-15';
  FinalMonth: any;
  UserId: string = '';
  FinalDay: any;
  ngOnInit(): void {
    this.UserId = this.cookie.get('uid');
    this.PostUrlInvoice = `https://localhost:44323/api/app/users/${this.UserId}/invoices`;
    this.http
      .get(`https://localhost:44323/api/app/users/${this.UserId}/customers`)
      .subscribe((result) => {
        console.log('Value is ', Object.values(result));

        this.Customer = Object.values(result);
        console.log('Customer is ', this.Customer);
      });
    //conditions for default today date and past date disabled
    if (this.currentMonth < 10) {
      this.FinalMonth = '0' + this.currentMonth;
    } else {
      this.FinalMonth = this.currentMonth;
    }
    if (this.currentDay < 10) {
      this.FinalDay = '0' + this.currentDay;
    } else {
      this.FinalDay = this.currentDay;
    }
    this.TodayDate =
      this.currentYear + '-' + this.FinalMonth + '-' + this.FinalDay;
    // this.change();
  }
  get f() {
    return this.custForm.controls;
  }
  public visible = false;
  toggleLiveDemo() {
    this.custForm.reset();
    this.visible = !this.visible;
  }

  newCustomer(data: any) {
    if (data.target.value === 'Add') {
      console.log('IN');
      this.visible = !this.visible;
      this.newCustSelected.companyName = 'Add';
      // this.modalService.open(this.someElement);
    } else {
      this.newCustSelected.companyName = '';
      this.newCustSelected.name = '';
      this.newCustSelected.billingAddress = '';
      this.newCustSelected.companyName = data.target.value;
      this.newCustSelected.name = data.target.value;
      if (this.newCustSelected.billingAddress.length != 0) {
        this.newCustSelected.shippingAddress = '';
        this.newCustSelected.billingAddress = '';
      } else {
        let index123 = -1;
        for (let i = 0; i < this.Customer.length; i++) {
          if (this.Customer[i].name == data.target.value) {
            index123 = i;
          }
        }

        console.log('Value of found element is', this.Customer[index123]);

        this.newCustSelected.CustomerID = this.Customer[index123].id;
        console.log(this.newCustSelected);
        console.log('Addresss is ', this.Customer[index123].addresses[0]);

        if (this.Customer[index123].addresses.length != 0) {
          let p = this.Customer[index123].addresses[0];
          let adddddddd =
            p.addressLine1 +
            ',' +
            p.addressLine2 +
            ',' +
            p.pinCode +
            ',' +
            p.city;
          this.newCustSelected.billingAddress = adddddddd;
        }
      }
    }
  }
  // change() {
  //   if (this.newCustSelected.length != 0) {
  //     return false;
  //   }
  //   return true;
  // }

  onSubmit() {
    console.log(this.InvoiceForm);
  }

  billOnChange(data: any, value: any) {
    console.log('data is ', data.target.value);
    console.log('Value is ', value);
    this.BillingAddressForm.get(value)?.patchValue(data.target.value);
    console.log(
      'Billing Address Form Value is ',
      this.BillingAddressForm.value
    );
  }

  shipOnChange(data: any, value: any) {
    console.log('data is ', data.target.value);
    console.log('Value is ', value);
    this.ShippingForm.get(value)?.patchValue(data.target.value);
    console.log('Billing Address Form Value is ', this.ShippingForm.value);
  }

  showBillOnChange() {
    if (this.newCustSelected.name.length == 0) {
      return false;
    } else if (this.newCustSelected.billingAddress.length != 0) {
      return false;
    }
    return true;
  }

  showBillOnChange1() {
    if (this.newCustSelected.name.length == 0) {
      return false;
    } else if (this.newCustSelected.shippingAddress.length != 0) {
      return false;
    }
    return true;
  }

  public AddInvoice(): void {
    console.log(this.newCustSelected);
    console.log(this.InvoiceForm.value);
    this.http
      .post(this.PostUrlInvoice, {
        invoiceNumber: this.InvoiceForm.value.InvoiceNo,
        description: 'desc',
        issueDate: this.InvoiceForm.value.IssueDate,
        expiryDate: this.InvoiceForm.value.ExpiryDate,
        customerNote: this.InvoiceForm.value.CustomerNotes,
        termsAndCondition: this.InvoiceForm.value.TermsAndConditions,
        status: 0,
        billingAddressId: this.newCustSelected.billingId,
        shippingAddressId: this.newCustSelected.shippingId,
        customerId: this.newCustSelected.CustomerID,
      })
      .subscribe((result: any) => {
        this.Invoices.push(this.InvoiceForm.value);
        // console.log("INVOICE VALUE IS ",this.Invoices);
        console.log('Result is ', result);

        console.log(this.Invoices);
      });
    this.InvoiceForm.reset();
  }

  //modal function
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  //funtion for modal shipping and Billing
  open1(content1: any) {
    this.modalService
      .open(content1, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          console.log('Chsjd ', result);
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  //modal function
  openSm(Content2: any) {
    this.modalService.open(Content2, { size: 'sm' });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  DeleteInvoice(Delete: any) {
    this.modalService.open(Delete, { size: 'sm' });
  }
  //alert after clicking on save invoices
  alert(isAlert: any) {
    if (this.isAlert == false) {
      this.isAlert = true;
    } else {
      this.isAlert = false;
    }
  }

  public Address(value: any): void {
    if (value === 'billing') {
      console.log('Value is ', this.BillingAddressForm.value);
      console.log('Customer ID is ', this.newCustSelected.CustomerID);
      let p =
        this.BillingAddressForm.value.AddLine1 +
        ',' +
        this.BillingAddressForm.value.AddLine2 +
        ',' +
        this.BillingAddressForm.value.ZipCode +
        ',' +
        this.BillingAddressForm.value.City +
        ',' +
        this.BillingAddressForm.value.State;
      this.http
        .post(
          `https://localhost:44323/api/app/customers/${this.newCustSelected.CustomerID}/addresses`,
          {
            addressLine1: this.BillingAddressForm.value.AddLine1,
            addressLine2: this.BillingAddressForm.value.AddLine2,
            pinCode: this.BillingAddressForm.value.ZipCode,
            city: this.BillingAddressForm.value.City,
            state: this.BillingAddressForm.value.State,
            country: 'India',
          }
        )
        .subscribe((result) => {
          console.log('Result is', result);
          this.newCustSelected.billingId = Object.values(result)[0];
          this.newCustSelected.billingAddress = p;
        });
    } else {
      console.log('Value is ', this.ShippingForm.value);
      console.log('Customer ID is ', this.newCustSelected.CustomerID);
      let p =
        this.ShippingForm.value.AddLine1 +
        ',' +
        this.ShippingForm.value.AddLine2 +
        ',' +
        this.ShippingForm.value.ZipCode +
        ',' +
        this.ShippingForm.value.City +
        ',' +
        this.ShippingForm.value.State;
      this.http
        .post(
          `https://localhost:44323/api/app/customers/${this.newCustSelected.CustomerID}/addresses`,
          {
            addressLine1: this.ShippingForm.value.AddLine1,
            addressLine2: this.ShippingForm.value.AddLine2,
            pinCode: this.ShippingForm.value.ZipCode,
            city: this.ShippingForm.value.City,
            state: this.ShippingForm.value.State,
            country: 'India',
          }
        )
        .subscribe((result) => {
          console.log('Result is', result);
          this.newCustSelected.shippingId = Object.values(result)[0];
          this.newCustSelected.shippingAddress = p;
          console.log('Selected Custoemr is ', this.newCustSelected);
        });
    }
  }

  custOnChange(data: any, value: any) {
    console.log('data is ', data.target.value);
    console.log('Value is ', value);
    this.custForm.get(value)?.patchValue(data.target.value);
    console.log('Cust Form Value is ', this.custForm.value);
  }

  //add customer
  public addCustomer(): void {
    this.visible = !this.visible;
    this.http
      .post(`https://localhost:44323/api/app/users/${this.UserId}/customers`, {
        name: this.custForm.value.companyName,
        email: this.custForm.value.email,
        contactNumber: this.custForm.value.contactNo,
        gstin: this.custForm.value.gstIn,
      })
      .subscribe((result) => {
        console.log(this.Customer);
        console.log('Customer Id', Object.values(result)[0]);
        let p = {
          CustomerID: Object.values(result)[0],
          ...this.custForm.value,
        };
        console.log('Value of p is ', p);
        console.log('Value of Customer is ', this.newCustSelected);
        this.Customer.push(p);
        this.newCustSelected.CustomerID = p.CustomerID;
        this.newCustSelected.name = p.companyName;
        // this.newCustSelected = p;
        this.custForm.reset();
      });
  }
  // itemArray : any[] = []
  // closeResult: string = "";
  arrayItem :any[] = []
  ItemForm = new FormGroup({
    name: new FormControl(""),
    rate: new FormControl(0.0),
    description: new FormControl(""),
    qty: new FormControl(1),
    total: new FormControl(0.0),
  })

  form = new FormGroup({
    invoice_no : new FormControl(""),
    summary : new FormControl(""),
    customer : new FormControl(""),
    issue_Date : new FormControl(""),
    expiry_Date : new FormControl(""),
    billingAddress : new FormControl(""),
    shippingAddress : new FormControl(""),
    items : new FormArray([
      this.GetDocumentAndReturnFormGroup()
    ]),
    notes : new FormControl(""),
    TnC : new FormControl(""),
  })


  get getAllItems(){
    return this.form.controls['items'] as FormArray;
  }

  AddOrNotAdd(data:any , index:any){
    console.log(data);
    
    if(data.target.value === "add"){

      console.log(this.someElement);
      this.arrayItem.push(this.ItemForm)
      console.log("Array Item ",this.ItemForm.value);
      
      this.arrayItem.splice(parseInt(index) , parseInt(index)+1)
      this.getAllItems.removeAt(parseInt(index))
      this.modalService.open(this.someElement).result.then((result) => {
      let mn = this.ItemForm.controls['qty'].value! * this.ItemForm.controls['rate'].value!
      this.total = this.total + mn;
      // const ids = this.arrayItem.map(o => o.name)
      // const filtered = this.arrayItem.filter(({id}, index) => !ids.includes(id, index + 1))
      // console.log("filtered value is",this.arrayItem.values);
      
      this.ItemForm.patchValue({
        'total':mn
      })
      this.getAllItems.push(this.ItemForm)
      this.arrayItem.push(this.ItemForm)
      console.log(this.arrayItem);
      
      let tempForm = new FormGroup({
        name: new FormControl(""),
        rate: new FormControl(0.0),
        description: new FormControl(""),
        qty: new FormControl(1),
        total: new FormControl(0.0),
      })
      this.ItemForm = tempForm;


        console.log("ARRAY VALUE ARE ", this.arrayItem);
        
        console.log("All items are ",this.getAllItems.value);
        console.log("All Item forms are ", this.ItemForm.value);
        
        this.closeResult = `Closed with: ${result}`;
        console.log(this.closeResult);
        
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log(this.closeResult);
        
      });
    }
  
    else{
      let mmn : number = -1;
      let bn : any[] = this.getAllItems.value
      for (let index = 0; index < bn.length; index++) {
        const element = bn[index];
        if(element.name === data.target.value){
          mmn = index;
          break;
        }
        // this.AddNewEmptyItems()
      }
      const ids = this.arrayItem.map(o => o.name)
      const filtered = this.arrayItem.filter(({id}, index) => !ids.includes(id, index + 1))
      console.log("filtered value is",filtered);
      if(mmn !=1){
        let {qty , rate , total}  = this.getAllItems.at(mmn).value
        this.getAllItems.at(index).value.qty = qty;
        this.getAllItems.at(index).value.rate = rate;
        this.getAllItems.at(index).value.total = total;
        this.total = this.total + total;
      }else{
        
      }
    }
  }



  AddNewEmptyItems(){
    console.log(this.getAllItems.length);
    this.getAllItems.push(this.GetDocumentAndReturnFormGroup())
    console.log(this.getAllItems.value);
    
  }

  AddDocumentAndReturnFormGroup(data:any){
    return new FormGroup({
      name: new FormControl(data.name),
      rate: new FormControl(data.rate),
      description: new FormControl(data.description),
      qty: new FormControl(data.qty),
      total: new FormControl(data.total),
    })
  }

  GetDocumentAndReturnFormGroup(){
    return new FormGroup({
      name: new FormControl(""),
      rate: new FormControl(0.0),
      description: new FormControl(""),
      qty: new FormControl(1),
      total: new FormControl(0.0),
    })
  }

  EditDocumentAndReturnFormGroup(data:any){
    this.getAllItems.at(data)
  }

  DeleteDocumentAndReturnFormGroup(data:any){
    console.log("DELTE");
    this.total = this.total - this.getAllItems.at(data).value.total
    let {name , qty , rate , description } = this.getAllItems.at(data).value
    this.getAllItems.removeAt(data)
    let innn = -1;
    for (let index = 0; index < this.arrayItem.length; index++) {
      const element = this.arrayItem[index];
      if(element.value.name === name){
        innn = index;
      }
    }
    if(innn != -1)   this.arrayItem.splice(innn , innn+1)
    
    // if(data!=0){
    //   console.log("IN DELETE");
      
    //   this.getAllItems.removeAt(data);
    // }
  }

  valueExistOrNot(data:any){
    if(this.getAllItems.at(data).value.name == ""){
      return true;
    }
    return false;
  }

  getAllExistingArrayValues(){
    let m = this.getAllItems;
    let p : any[] = [];
    for(let i=0;i<m.length;i++){
      // console.log(m.at(i).value.name);
      
      if(m.at(i).value.name != ""){
        p.push(m.at(i).value)
      }
    }
    // console.log(p);
    
    return p;
  }
}
