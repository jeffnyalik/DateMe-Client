import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal  from 'sweetalert2';

import { User } from '../../_models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() ValuesFromHome:any;
  @Output() CancelRegister = new EventEmitter();
  registerForm: FormGroup;
  model:any = {};
  user: User;
  constructor(private authService:AuthService, private router: Router) { }
  register(){
    if(this.registerForm.invalid){
      console.log("The form is Invalid");
      return
    }
    this.user = Object.assign({}, this.registerForm.value)
    this.authService.register(this.user).subscribe((res) =>{
      console.log(res);
      Swal.fire({
        text: "Registered Successfully",
        icon: 'success'
      })
    }, error=>{
      console.log(error);
      Swal.fire({
        icon: 'error',
        text: 'An error has occured'
      })
    }, () =>{
      this.authService.login(this.user).subscribe(() =>{
        this.router.navigate(['/members']);
      })
    });
  }
  cancel(){
    this.CancelRegister.emit(false);
    console.log("Cancelled");
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      gender: new FormControl('male'),
      knownAs: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required,Validators.minLength(4),Validators.maxLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, this.passwordMatchValidator);
  }

  passwordMatchValidator(g:FormGroup){
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

}
