import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

// Declaring variables

  closeResult!: string;
  private unSubscribe: Subject<any> = new Subject();
  interval:any;
  formValue !:FormGroup;
  Items: any=[];
  posts:any;
  UserId='';
  Posturl: string = '';
  Geturl: string = '';
  index1 = -1;
  id: any;
  constructor(private modalService: NgbModal,private formbuilder:FormBuilder,private http:HttpClient , private cookie : CookieService) {
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
//  Edit item function
  editItems(){
    console.log("Edited Items is ",this.formValue.value);
    this.Items[this.index1].name = this.formValue.value.ItemName
    this.Items[this.index1].ratePerItem = this.formValue.value.ItemRate
    console.log("Elemenet is ",this.Items[this.index1]);
    this.http.put(`https://localhost:44323/api/app/users/${this.UserId}/items/${this.Items[this.index1].id}`,{
      "name": this.formValue.value.ItemName,
      "ratePerItem": this.formValue.value.ItemRate,
      "quantity": 0
    }).subscribe(result=>{
      console.log("result ",result);
      this.formValue.reset()
    })
  }

  ngOnInit(): void {
    this.UserId = this.cookie.get('uid')
    this.Posturl=`https://localhost:44323/api/app/users/${this.UserId}/items`;
    this.Geturl=`https://localhost:44323/api/app/users/${this.UserId}/items`;
    //Time interval setted for displaying the data and it was delayed and needed page refresh.
    this.getItems();
    this.interval =setInterval(()=>{
      this.getItems();
      },5000)
    
  }

//modal for Add item Function
  Add(AddItem: any) {
    this.modalService.open(AddItem, { size: 'sm' });
  }
  //modal for delete Item Function
  Delete(DeleteItem: any) {
    this.modalService.open(DeleteItem, { size: 'sm' });
  }
// modal for Edit item Function
  Edit(EditItem:any , id:any){
    for (let index = 0; index < this.Items.length; index++) {
      const element = this.Items[index];
      if(element.id === id){
        this.index1 = index;
      }
    }
    console.log(this.Items[this.index1]);
    this.formValue.get('ItemName')?.patchValue(this.Items[this.index1].name)
    this.formValue.get('ItemRate')?.patchValue(this.Items[this.index1].ratePerItem)
    this.formValue.get('ItemDescription')?.patchValue(this.Items[this.index1].ItemDescription)
    console.log(this.formValue.value)
    this.modalService.open(EditItem, { size: 'sm' });
  }
  //Submit function of add item
  onSubmit(){
    console.log('Items:',this.formValue.value);
    this.formValue.reset();
  }
  //Getting values of formfields
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

