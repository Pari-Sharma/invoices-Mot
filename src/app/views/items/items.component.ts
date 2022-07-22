import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  closeResult!: string;
  private unSubscribe: Subject<any> = new Subject();
  interval:any;
  formValue !:FormGroup;
  Items: any=[];
  posts:any;
  UserId='3a0531d4-2078-b145-6b06-d72f628403d3';
  Posturl=`https://localhost:44323/api/app/users/${this.UserId}/items`;
  Geturl=`https://localhost:44323/api/app/users/${this.UserId}/items`;
  constructor(private modalService: NgbModal,private formbuilder:FormBuilder,private http:HttpClient) {
    this.Items=[];
      this.formValue=this.formbuilder.group({
      ItemName:new FormControl('',[Validators.required]),
      ItemRate:new FormControl('',[Validators.required]),
      ItemDescription:new FormControl('')
    })
   }
   //Function to Add Item
   public addItem():void{
     console.log(this.Items);
     // var 
     this.http.post(this.Posturl,{
       "name": this.formValue.value.ItemName,
       "ratePerItem": this.formValue.value.ItemRate,
       "quantity": 0
      }).subscribe((result: any)=>{
      this.Items.push(this.formValue.value);
      console.log(this.Items)
    });
    //console.log(this.Items)
    //this.http.post(this.url
   // ,this.Items);
   this.getItems();
    this.formValue.reset();
   }
   //Delete function of deleting item from server and refreshing display
   deleteItem(index: string) {
    this.http.delete(this.Geturl+"/"+index)
    .subscribe((response: any) => {
    console.log(response)
    this.getItems();
  });

  
}
//Getting Data to display from Server
getItems(){
  this.Items = [];
  this.http.get(this.Geturl)
  .subscribe((response: any) => {
    console.log(response)
    this.Items = response;
  });
}
 
  ngOnInit(): void {
    //Time interval setted for displaying the data and it was delayed and needed page refresh.
    this.getItems();
    this.interval =setInterval(()=>{
      this.getItems();
      },5000)
  //   this.http.get(this.Geturl)
  //   .subscribe(response => {
  //   console.log(response)
  //   this.Items= response;
  // });
  //this.deleteFieldValue;
    
  }
 /* ngOnDestroy():void{
    this.unSubscribe()
  }*/
//modal for Add item Function
  open(content: any) {
    this.modalService.open(content, { size: 'sm' });
  }
  //Modal for delete Item Function
  open2(Content2: any) {
    this.modalService.open(Content2, { size: 'sm' });
  }
  //Submit function of add item
  onSubmit(){
    console.log('Items:',this.formValue.value);
  
    this.formValue.reset();
  }
  //Getting values 
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
