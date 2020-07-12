import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {

  // ours:
  values: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getValues();
    // when this component starts, call getValues() below.
  }

  // ours:
  // for now, we'll hardcode the address of our API GET
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
}
