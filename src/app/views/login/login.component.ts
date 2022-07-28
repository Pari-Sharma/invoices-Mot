import { Component, OnInit,Inject } from '@angular/core';
// Import the AuthService type from the SDK
import { DOCUMENT } from '@angular/common';
import { Auth0Client } from '@auth0/auth0-spa-js';
import { AuthService } from '@auth0/auth0-angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user:any;
  auth0 = new Auth0Client({
    domain: 'login-mot1.us.auth0.com',
    client_id: 'ClNJpqQ7tFKfKoY6ki3v0nnKMFgPgR2B'
  });
  RegisterForm!: FormGroup;
  submitted = false;
  Details:any=[];
  authId:string = '';
  emailPattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  MOBILE_PATTERN = "^((\\+91-?)|0)?[0-9]{10}$";
  Registerurl = '';
  userData : any;
  constructor(private router: Router,public formBuilder:FormBuilder,public auth :AuthService,@Inject(DOCUMENT) public document: Document,private http:HttpClient , private cookie:CookieService ) { 
    
  }
  ISregistered:boolean=false;
  ngOnInit(): void {
    this.Details=[];
    this.auth.idTokenClaims$.subscribe(v=>{
      console.log("Id Tokens",v?.__raw);
      if(v?.__raw!=null || v?.__raw != undefined){
        this.http.post("https://localhost:44323/api/app/authenticateByIdToken",{'idToken':v?.__raw}).subscribe(result=>{
          console.log("Result of API",result);
          this.authId = Object.values(result)[0];
          console.log("Auth id is ",this.authId);
          this.Registerurl=`https://localhost:44323/api/app/register-company/${this.authId}`;
          
          console.log(this.Registerurl)
          this.ISregistered=Object.values(result)[3];
          console.log("registered",this.ISregistered);
          console.log("Values in value",Object.values(result))
        })
      }
    })
    if (this.ISregistered == true){
      this.router.navigateByUrl('/dashboard');
    }
    // this.auth.isAuthenticated$.subscribe(value=>{
    //   this.http.post("https://localhost:44323/api/app/authenticateByIdToken",{'idToken':this.token}).subscribe(result=>{
    //     console.log("Result of API",result);
    //   })
    // })
    this.RegisterForm=this.formBuilder.group({
      CompanyName:new FormControl('',[Validators.required]),
      CompanyPAN:new FormControl('',[Validators.required]),
      CompanyGST:new FormControl('',[Validators.required]),
      ContactPerson:new FormControl('',[Validators.required]),
      Email:new FormControl(''),
      ContactNo:new FormControl('',[Validators.required,Validators.pattern(this.MOBILE_PATTERN)]),
  })

  }
  
 public Register():void{
    console.log(this.Details);
    this.http.post(this.Registerurl,{
      "companyName": this.RegisterForm.value.CompanyName,
      "email": this.RegisterForm.value.Email,
      "companyPanNumber": this.RegisterForm.value.CompanyPAN,
      "contactNumber": this.RegisterForm.value.ContactNo,
      "companyGSTNumber": this.RegisterForm.value.CompanyGST,
      "contactPersonName": this.RegisterForm.value.ContactPerson
     }).subscribe(result=>{
      // console.log("result key is", Object.values(result)[0]);
      // this.cookie.set("id",Object.values(result)[0])
      console.log(result)
     this.Details.push(this.RegisterForm.value);
     console.log(this.Details)
   });
   this.router.navigateByUrl('/fileupload')
    } 

loginWithRedirect(){
  this.auth.loginWithRedirect();
}
 onSubmit() {
    console.warn( this.RegisterForm.value);
    this.RegisterForm.reset();
  }
  

}

