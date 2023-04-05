import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'ngx-logout',
  template: '<div></div>',
})

export class NgxLogoutComponent {
  constructor(private authService: AuthService) {
    console.log('-----data-----','logout')
    authService.logout()
  }
}
