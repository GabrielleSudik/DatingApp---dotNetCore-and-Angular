// created in lesson 56

import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs'; // this one took some additional work. new file, etc.

@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor() {}

  // Since we import alertify, we can use its methods here.
  // Everything below is an alertify method.
  // I don't know if they are verbatim, or custom.
  // Actually, I think it's more like our methods are custom,
  // but they call the alertify methods of the same name.

  confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, (e: any) => {
      if (e) {
        okCallback();
      } else {
        // nothing
      }
    });
  }

  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
  }

  warning(message: string) {
    alertify.warning(message);
  }

  message(message: string) {
    alertify.warning(message);
  }
}

// note: alertify is JS not TS
// so nothing here is type-safed.
// look out for typos.

// Why do we wrap the alertify methods in a service?
// Among other things, intellisense will now know them.
// I assume there are other reasons, prof didn't really say.
