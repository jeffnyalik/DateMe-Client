import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() ValuesFromHome:any;
  @Output() CancelRegister = new EventEmitter();
  model:any = {};
  constructor() { }
  register(){
    alert(this.model)
  }
  cancel(){
    this.CancelRegister.emit(false);
    console.log("Cancelled");
  }

  ngOnInit(): void {
  }

}
