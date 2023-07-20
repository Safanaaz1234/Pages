import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private router:Router,private route:ActivatedRoute,private http:HttpClient, private toastrService:ToastrService) { }

  ngOnInit(): void {
  }

  password:string;
  confirmPassword:string;
  isPasswordVisible = false;
  isConfirmPasswordVisible = false;
 
  togglePasswordVisibility(){
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  toggleConfirmPasswordVisibility(){
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }


  
  onSubmit(form:NgForm){
    if(!form.valid){
      return;
    }
    else if(this.password && this.confirmPassword && this.password!==this.confirmPassword){
      this.toastrService.error("Password does not match")
      return 
    }
    
    this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAy8n6vK1Z4Q4ErtLs2DdTRd1nQvH64BjE',{
      email:form.value.email,
      password:form.value.password,
      returnSecureToken:true
    }).subscribe(()=>{
      this.http.post('https://final-project-5b6d4-default-rtdb.firebaseio.com/users.json',{
        firstName:form.value.firstName,
        lastName:form.value.lastName,
        email:form.value.email,
        address:form.value.address
      }).subscribe(()=>{
        console.log("submitted");
       
        this.toastrService.success('Registered Successfully',"Success",{

        })
       
      },error=>{
        console.log('error',error);
        this.toastrService.error(error.message,"Error")
      })
     
      
    },error=>{
      this.toastrService.error(error.message,"Error")
    })
    
    
  }

  
}
