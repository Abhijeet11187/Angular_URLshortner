import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { HttpserviceService } from '../shared/httpservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private fb:FormBuilder,private http:HttpserviceService,private router:Router,private toastr: ToastrService){ }
  buttonMessage;
  newUserMessage;
  signUpflag:Boolean;
  passwordMatched;
  formValue:FormGroup;
  ngOnInit() {
    this.buttonMessage='Login';
    this.signUpflag=false;
    this.newUserMessage=' New User ? ';
    this.formValue=this.fb.group({
      userId: ['', [Validators.required]],
      password:['',Validators.required],
      confirmpassword:['']

    });
  }

  loginUser(){
    const formdata=new FormData();
    this.passwordMatched=false;
    //  this.signUpflag?console.log("R RESGIRR"):console.log("login");
     if(this.signUpflag){
      this.formValue.get('password').value== this.formValue.get('confirmpassword').value?this.passwordMatched=true:this.passwordMatched=false;;
    if(this.passwordMatched){
      console.log("Password matched");
      formdata.append('userName', this.formValue.get('userId').value);
      formdata.append('password', this.formValue.get('password').value);
      this.http.register(formdata).subscribe((res:any)=>{
         console.log(res);
         if(res.message!=="Not Found"){
          this.toastr.success("User created successfully");
          this.changetoSignup();
         }else{
         
         }
        },(err)=>{
          this.toastr.error("User Exists");
          console.log(err);
        })
    }else{
      this.toastr.error("Password Not Match");
      console.log("Password Not matched");
    }
    }else{
      formdata.append('userName', this.formValue.get('userId').value);
      formdata.append('password', this.formValue.get('password').value);
      this.http.login(this.formValue.get('userId').value,formdata).subscribe((res:any)=>{
         console.log(res);
         if(res.message!=="Not Found"){
          console.log("user sucessfully found with userName");
          console.log(res.message.userName);
          this.toastr.success("Login Successful");
          this.router.navigate(['/enterURL',res.message.userName])
         }else{
          console.log("user Not found");
          this.toastr.error("Login Failed");
         }
        },(err)=>{
          this.toastr.error("Login Failed");
          console.log(err);
        })
    }
    // console.log("Login user "+JSON.stringify(this.formValue.value));

  }
  changetoSignup(){ 
    this.buttonMessage == "Login"? this.buttonMessage='Signup':this.buttonMessage="Login";
    this.signUpflag=!this.signUpflag;
    this.formValue.controls['userId'].setValue('');
    this.formValue.controls['password'].setValue('');
    this.formValue.controls['confirmpassword'].setValue('');
    this.newUserMessage==' New User ? '? this.newUserMessage=' Already have Account ? ':this.newUserMessage=' New User ? ' ;

  }
}
