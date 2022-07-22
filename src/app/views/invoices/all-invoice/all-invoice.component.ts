import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-all-invoice',
  templateUrl: './all-invoice.component.html',
  styleUrls: ['./all-invoice.component.scss']
})
export class AllInvoiceComponent implements OnInit {
  isInvoice = true;
  isItem = false;
  closeResult!: string;
  formValue !:FormGroup;
  Items: any;
  url='https://localhost:44323/api/app/app-users';
  add(){
    this.isInvoice = !this.isInvoice;
    this.isItem = !this.isItem
    console.log(this.isInvoice , this.isItem);
    
  }
  constructor(private modalService: NgbModal,private formbuilder:FormBuilder,private http:HttpClient) {
    this.Items=[];
      this.formValue=this.formbuilder.group({
      ItemName:new FormControl('',[Validators.required]),
      ItemRate:new FormControl('',[Validators.required]),
      ItemDescription:new FormControl('',[Validators.required])
    })
   }
   public addItem():void{
    this.Items.push(this.formValue.value);
    //console.log(this.Items)
    this.http.post(this.url
    ,this.Items);
    this.formValue.reset();
   }
   deleteFieldValue(index: number) {
    this.Items.splice(index, 1);
}
 
  ngOnInit(): void {

  }

  open(content: any) {
    this.modalService.open(content, { size: 'sm' });
  }
  onSubmit(){
    console.log('Items:',this.formValue.value);
  
    this.formValue.reset();
  }
  get ItemName()
  {
    return this.Items.get('ItemName')
  }
  get ItemRate()
  {
    return this.Items.get('ItemRate')
  }
  get ItemDescription()
  {
    return this.Items.get('ItemDescription')
  }
}
