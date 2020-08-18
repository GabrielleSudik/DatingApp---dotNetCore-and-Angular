import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// created in lesson 45

@Component({
  selector: 'app-register', // fyi you put app-register inside home.component.html
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() valuesFromHome: any; // this line allows values from Home component (the parent)
                                // to be passed down (inputted) into Register (the child)

  @Output() cancelRegister = new EventEmitter(); // lesson 47 - to emit info
                                                 // from this child to its parent.

  model: any = {};

  constructor() { }

  ngOnInit() {
  }

  register(){
    console.log(this.model); // for now, to confirm method fires.
  }

  cancel(){
    console.log('Registration cancelled.'); // for now, to confirm method fires.

    this.cancelRegister.emit(false); // lesson 47. All @Outputs must use "emit".
  }

}
