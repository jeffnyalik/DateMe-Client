import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() ValuesFromHome:any;
  @Output() CancelRegister = new EventEmitter();
  model:any = {};
  constructor(private authService:AuthService) { }
  register(){
    this.authService.register(this.model).subscribe((res) =>{
      console.log("Users have been registered successfully")
    }, error=>{
      console.log(error);
    });
  }
  cancel(){
    this.CancelRegister.emit(false);
    console.log("Cancelled");
  }

  ngOnInit(): void {
  }

}
