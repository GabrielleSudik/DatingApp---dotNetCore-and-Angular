import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor() { }

  ngOnInit() {
  }

  //for user login:
  login(){
    console.log(this.model); //if method is hooked up right, you'll see the UN and PW in the console.
  }

}
