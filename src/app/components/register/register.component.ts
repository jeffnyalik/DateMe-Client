import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  constructor(private authService:AuthService) { }
  register(){
    console.log(this.registerForm.value);
    // this.authService.register(this.model).subscribe((res) =>{
    //   console.log("Users have been registered successfully")
    // }, error=>{
    //   console.log(error);
    // });
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
      dateofBirth: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required,Validators.minLength(4),Validators.maxLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, this.passwordMatchValidator);
  }

  passwordMatchValidator(g:FormGroup){
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

}
