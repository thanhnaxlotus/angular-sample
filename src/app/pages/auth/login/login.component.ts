import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { environment } from '../../../../environments/environment';

declare const gapi: any;
@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class NgxLoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {
    console.log('-----data-----', 'login')
    if (authService.getUser?.id) {
      router.navigate(['/'])
    }
  }
  ngOnInit(): void {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: environment.googleClientId,
      });
    });
  }
  error = '';
  profileForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get passwordError() {
    const password = this.profileForm.get('password');
    let isRequired = false;
    if (password.touched && password.errors?.['required']) {
      isRequired = true
    }
    return {
      isRequired,
      isError: isRequired
    }
  }
  get usernameError() {
    const username = this.profileForm.get('username');
    let isRequired = false;
    if (username.touched && username.errors?.['required']) {
      isRequired = true
    }
    return {
      isRequired,
      isError: isRequired
    }
  }
  onSubmit() {
    if (this.profileForm.valid) {
      const { username, password } = this.profileForm.value
      this.authService.loginApi(username, password).subscribe(
        (user) => {
          console.log('-----data-----', user)
          this.router.navigate(['/'])
        },
        (error) => {
          console.log('-----data-----', error)
          this.error = error.error?.message || 'Cannot connect to server !!!'
        }
      )
    }
  }
  onSignIn() {
    const googleAuth = gapi.auth2.getAuthInstance();
    googleAuth.signIn().then((googleUser: any) => {
      const id_token = googleUser.getAuthResponse().id_token;
      console.log('-----data-----', id_token)
    }).catch((err) => console.log('-----data-----', err));
  }
}
