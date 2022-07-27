import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss']
})
export class NewInvoiceComponent implements OnInit {

   //variable and array for customer static data shipping and billing address enable and disable ,
  //new cust for fetching data from array close result for modals and isAlert for alert function
  address = false;
  Customers:any=['pari']
  newCust = '';
  CustId:any;
  value:any;
  closeResult = '';
  isAlert=false;
  GetCustURL='https://localhost:44323/api/app/users/3a054b4b-5f47-f638-50ab-5c6ccb80947a/customers';
  PostUrlInvoice='https://localhost:44323/api/app/users/3a0541f3-ca4a-6cca-67e7-2d6dfb2ba95d/invoices';
  addressurl='https://localhost:44323/api/app/customers/3a054afe-d6ff-91c4-af98-635c6cbdded0/addresses';
  InvoiceForm !:FormGroup;
  Invoices:any=[];
  BillingForm !:FormGroup;
  ShippingForm !:FormGroup;
  BillingTo !:FormGroup;
  Shipping:any=[];
  BillingCustomer:any=[];
  Billing:any=[];
  //add item
  title = 'AddItems';
  vvvv = ""
  total = 0;
  itemArray : any[] = []
  @ViewChild('content4') someElement!: ElementRef 
  constructor(private route: ActivatedRoute,private http:HttpClient, private modalService: NgbModal,private formbuilder:FormBuilder) {
    this.Invoices=[];
    this.Billing=[];
    this.Shipping=[];
    this.BillingCustomer=[];
    this.InvoiceForm=this.formbuilder.group({
      InvoiceNo:new FormControl('',[Validators.required]),
      InvoiceDescription:new FormControl('',[Validators.required]),
      IssueDate:new FormControl('',[Validators.required]),
      ExpiryDate:new FormControl('',[Validators.required]),
      CustomerNotes:new FormControl('',[Validators.required]),
      TermsAndConditions:new FormControl('',[Validators.required]),
      Status:new FormControl('',[Validators.required]),
      Customers: new FormControl('', [Validators.required]),
      BillingForm:new FormGroup({
        AddLine3:new FormControl('',[Validators.required]),
        AddLine4:new FormControl('',[Validators.required]),
        ZipCode2:new FormControl('',[Validators.required]),
        City2:new FormControl('',[Validators.required]),
        State2:new FormControl('',[Validators.required]),
      }),

    BillingTo:new FormGroup({ 
      Customers:new FormControl('',),


   
    ShippingForm:new FormGroup({
    AddLine1:new FormControl('',[Validators.required]),
    AddLine2:new FormControl('',[Validators.required]),
    ZipCode:new FormControl('',[Validators.required]),
    City:new FormControl('',[Validators.required]),
    State:new FormControl('',[Validators.required]),
  })
})

})
  }
  date = new Date();
  currentYear = this.date.getUTCFullYear();
  currentMonth = this.date.getUTCMonth() + 1;
  currentDay = this.date.getUTCDate();
  //YYYY-MM-DD
  TodayDate = '2022-05-15';
  FinalMonth: any;
  FinalDay: any;
  ngOnInit(): void {
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
    this.change();
  }
  newCustomer(data: any) {
    this.newCust = data.target.value;
  }
  change() {
    if (this.newCust.length != 0) {
      return false;
    }
    return true;
  }
  onSubmit(){
    console.log(this.InvoiceForm)
  }
  
  public AddInvoice():void{
    console.log(this.Invoices);
    this.http.post(this.PostUrlInvoice,{
      "invoiceNumber": this.InvoiceForm.value.InvoiceNo,
      "description":this.InvoiceForm.value.InvoiceDescription,
      "issueDate":this.InvoiceForm.value.IssueDate,
      "expiryDate":this.InvoiceForm.value.ExpiryDate,
      "customerNote":this.InvoiceForm.value.CustomerNotes,
      "termsAndCondition":this.InvoiceForm.value.TermsAndConditions,
      "status":"Issued",
      "billingAddressId":this.BillingForm,
      "shippingAddressId":this.BillingForm,
      "customerId":this.InvoiceForm.value.BillingCustomer,
     }).subscribe((result: any)=>{
     this.Invoices.push(this.InvoiceForm.value);
     console.log(this.Invoices)
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
  getcustomer(){
    this.Billing = [];
    this.http.get(this.GetCustURL)
    .subscribe((response: any) => {
      console.log(response)
      this.Billing = response;
    });
  }
  //funtion for modal shipping and Billing
  open1(content1: any) {
    this.modalService
      .open(content1, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
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
  alert(isAlert:any){
    if(this.isAlert==false){
      this.isAlert=true;

    }
    else{
      this.isAlert= false;
    }
  }
  AddBillingAddress()
  {
    this.Billing.push(this.BillingForm);
    console.log(this.Billing);
  }
  AddShippingAddress()
  {
    this.Shipping.push(this.ShippingForm);
    console.log(this.Shipping);
  }
  AddCustomer(){
    this.BillingCustomer.push(this.ShippingForm,this.BillingForm)
  }
  public Address():void{
    console.log(this.InvoiceForm)
    console.log(this.BillingForm);
  //   this.http.post(this.addressurl,{
  //     "addressLine1": 'line 1',
  //     "addressLine2": 'line 2',
  //     "pinCode": '392011',
  //     "city": 'baroda',
  //     "state": 'Gujarat',
  //     "country": 'India',
  //    }).subscribe(result=>{
  //    this.Billing.push(this.BillingForm.value);
  //    console.log(this.Billing)
  //  });
}
 /* //add item
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
    return this.form.controls.items as FormArray;
  }
  AddOrNotAdd(data:any , index:any){
    console.log(data);
    
    if(data.target.value === "add"){
      console.log(this.someElement);
      this.arrayItem.push(this.ItemForm)
      this.arrayItem.splice(parseInt(index) , parseInt(index)+1)
      this.getAllItems.removeAt(parseInt(index))
      this.modalService.open(this.someElement).result.then((result) => {
      let mn = this.ItemForm.controls.qty.value! * this.ItemForm.controls.rate.value!
      this.total = this.total + mn;
      // const ids = this.arrayItem.map(o => o.name)
      // const filtered = this.arrayItem.filter(({id}, index) => !ids.includes(id, index + 1))
      console.log("filtered value is",this.arrayItem);
      
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
  open4(content4:any) {
    this.modalService.open(content4, {ariaLabelledBy: 'modal-basic-title'})
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
*/
//add item

}
