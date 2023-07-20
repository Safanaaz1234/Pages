import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;




  constructor(private http:HttpClient) {
    this.loginForm = new FormGroup({
      'email':new FormControl(null,[Validators.required,Validators.email]),
      'password':new FormControl(null,[Validators.required])
    })
   }

   onSubmit(){
    console.log(this.loginForm.value);
    this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAy8n6vK1Z4Q4ErtLs2DdTRd1nQvH64BjE',{
      email:this.loginForm.value.email,
      password:this.loginForm.value.password
    }).subscribe((resp)=>{
      console.log("logged in");
      console.log(resp);
    },error=>{
      console.log(error);
      
    })
   }

  ngOnInit(): void {
  }

}
