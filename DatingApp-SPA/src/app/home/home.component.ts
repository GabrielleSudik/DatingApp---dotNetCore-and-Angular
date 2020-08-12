import { Component, OnInit } from '@angular/core';

// created in lesson 45

@Component({
  selector: 'app-home', // fyi you put this inside app.component.html
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode = false;

  constructor() { }

  ngOnInit() {
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }
}
