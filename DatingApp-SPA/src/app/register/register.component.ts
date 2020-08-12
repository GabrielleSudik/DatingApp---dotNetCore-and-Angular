import { Component, OnInit } from '@angular/core';

// created in lesson 45

@Component({
  selector: 'app-register', // fyi you're putting this inside home.component.html
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};

  constructor() { }

  ngOnInit() {
  }

  register(){
    console.log(this.model); // for now, to confirm method fires.
  }

  cancel(){
    console.log('Registration cancelled.'); // for now, to confirm method fires.
  }

}
