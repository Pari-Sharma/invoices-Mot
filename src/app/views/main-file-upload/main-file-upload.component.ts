import { OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {Location} from '@angular/common';
import { AllApiCallsService } from 'src/app/all-api-calls.service';



@Component({
  selector: 'app-main-file-upload',
  templateUrl: './main-file-upload.component.html',
  styleUrls: ['./main-file-upload.component.scss']
})
export class MainFileUploadComponent implements OnInit {
  closeResult: string = '';
  dataToRender : any[] = [];
  @ViewChild('content', { static: true }) content: TemplateRef<any> | undefined;

  constructor(private modalService: NgbModal , private _location: Location , private appppp : AllApiCallsService ){}
  showContact : boolean = true;
  fileInput : any;
  array : any[] = []
  showDocument : boolean = false;
  companyType:string=''
  formdata = new FormData();
  file:any = null;
  users :any;
  formGroup = new FormGroup({
    documentType : new FormControl(),
    files: new FormArray([
      
    ])
  })

  selectedFiles: any;
  currentFileUpload: any;
  get filesArray(){
    return this.formGroup.get('files') as FormArray;
  }

  ddd:any = {
    'proprietary': ["Gumasto","Professional_Tax_paid_receipt","GST_certificate","Cancelled_Cheque"],
    'partnership': ["Partnership_Deed","GST_certificate","Cancelled_Cheque"],
    'LLP': ["Letter_of_Incorporation","GST_certificate","Cancelled_Cheque"],
    'Private_Limited_Company': ["Letter_of_Incorporation","Memorandum_of_Association","Articles_of_Association","GST_certificate","Cancelled_Cheque"],
    'Public_Limited_Company': ["Letter_of_Incorporation","Memorandum_of_Association","Articles_of_Association","GST_certificate","Cancelled_Cheque"]
  }

  open(content:any) {
    this.modalService.open(content, {windowClass : "my-class" , size:'xl',ariaLabelledBy: 'modal-basic-title'}).result.then((result:any) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
      this._location.back()
    }, (reason:any) => {

      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
      this._location.back()
    });
  }

  private getDismissReason(reason: any): string {
    this.dataToRender = [];
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  ngOnInit(): void {
    // API CALL TO GET USER DATA IN THIS .
    // users = value from API CALL .
      this.modalService.open(this.content,{windowClass : "my-class" , size:'xl',ariaLabelledBy: 'modal-basic-title',backdrop:'static',keyboard:false}).result.then((result:any)=>{
        this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
      this._location.back()
    }, (reason:any) => {

      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
      this._location.back()
      });
  }

  SubmitForm(){
    // if(this.dataToRender.length === this.filesArray.length){
      console.log(this.formGroup.value.files);
      
      this.appppp.uploadAllFile(this.array , this.formGroup.value.documentType , this.formGroup.value.documentType ).subscribe(result =>{
        console.log(result);
        // this.modalService.clos
      })
    // }else{
    //   alert("ENTER ALL FILES")
    // }
  }

  uploadFile(data:any){
    let ff = data.target.files[0];
    let extensionAllowed: any = { "pdf": true, "jpeg": true , 'png':true , 'jpg':true};
    let fileSize = ff.size / 1024 /1024 ;
    console.log(fileSize);
    let fileType = data.target.files[0].name.split('.').pop()
    console.log(fileType);
    if (fileSize > 5) {
      alert("Add File less than 5mb")
      data.target.value="";
      // remove file name from the input
      return ;
    }if(!extensionAllowed[fileType.toLowerCase()] ){
      alert("Add File of png and Pdf sormat");
      data.target.value="";
      return ;
    }
    else{
      console.log(this.formGroup.get('documentType')?.value);
      this.selectedFiles = data.target.files;
      this.currentFileUpload = this.selectedFiles.item(0);
      this.array.push(this.currentFileUpload);
      this.formdata.append( this.companyType , this.currentFileUpload);
      let vlll = this.CheckDocumentAndReturnFormGroup(data.target.name)
      console.log(vlll);
      
      if(vlll != -1){
        console.log("Dat to be deleted at ", vlll);
        
        this.filesArray.removeAt(vlll);
      }
      this.filesArray.push(this.AddDocumentAndReturnFormGroup({'name':data.target.name,'file':ff}))
      console.log(this.filesArray.value);
      
    }
  }

  selectComapnyType(data:any){
    this.formGroup.patchValue({
      'documentType':data.target.value
    })
    this.companyType = data.target.value
    console.log("Doucment Type kis " ,this.formGroup.get('documentType')?.value);
    this.dataToRender = this.ddd[data.target.value]
    this.DeleteDocumentAndReturnFormGroup()
  }

  ContactformClick(data:any){
    this.showDocument = false;
    this.showContact = true;
    this.dataToRender = []
  }
  DocumentformClick(data:any){
    this.showDocument = true;
    this.showContact = false;
  }

  GetDocumentAndReturnFormGroup(){
    return new FormGroup({
      name: new FormControl('',[Validators.required]),
      file: new FormControl(null , [Validators.required])
    })
  }
  AddDocumentAndReturnFormGroup(data:any){
    return new FormGroup({
      name: new FormControl(data.name),
      file: new FormControl(data.file )
    })
  }
  CheckDocumentAndReturnFormGroup(value :string){
    let m = this.filesArray.value
    let indeexx ;
    for (let index = 0; index < m.length; index++) {
      if(m[index].name === value){
        return index;
      }
      
    }
    return -1;
  }

  DeleteDocumentAndReturnFormGroup(){
    let m = this.filesArray.value
    for (let index = 0; index < m.length; index++) {
      this.filesArray.removeAt(index);
    }
  }

}
