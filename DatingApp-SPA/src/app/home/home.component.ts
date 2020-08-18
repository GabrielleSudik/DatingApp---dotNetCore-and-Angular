import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// created in lesson 45

@Component({
  selector: 'app-home', // fyi you put app-home inside app.component.html
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode = false;
  values: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getValues(); // added in 46
  }

  registerToggle(){
    // this.registerMode = !this.registerMode; // changed in lesson 47.
    this.registerMode = true;
    // we changed it so it "defaults" to true,
    // but changes to false when cancelRegisterMode() is called.
    // So this method is not a toggle by itself, but
    // working with the other method, the UI will toggle views
    // when the cancel button is pressed.
  }

  // added in 46
  // (moved from values component, which we'll delete because not needed)
  // also need some injection and import
  getValues(){
    this.http.get('http://localhost:5000/api/values').subscribe(response => {
      this.values = response;
    }, error => {
      console.log(error);
    });
    // tip: hover on .get to see what that method does.
    // notably, it returns an observable JSON object.
    // to get that observable out, we need to subscribe to it.
    // Hence, .subscribe. "response" is the thing we're getting back.
    // and finally, we set the response to be "values" variable.
  }

  // lesson 47
  // this will handle the data emitted by the child's @Output
  cancelRegisterMode(registerMode: boolean){
    this.registerMode = registerMode;
  }

}
