import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';

// created in lesson 45

@Component({
  selector: 'app-register', // fyi you put app-register inside home.component.html
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter(); // lesson 47 - to emit info
                                                 // from this child to its parent.

  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register(){
    // console.log(this.model); // for now, to confirm method fires.
    // commented out in lesson 48, where we add the real code.

    // lesson 48:
    // the register() method in auth.service.ts returns an observable.
    // so this is where we watch for it, via "subscribe"
    this.authService.register(this.model).subscribe(() => {
      console.log('Registration successful.');
    }, error => {
      console.log(error);
    });
  }

  cancel(){
    console.log('Registration cancelled.'); // for now, to confirm method fires.

    this.cancelRegister.emit(false); // lesson 47. All @Outputs must use "emit".
  }

}
