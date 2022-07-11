import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  responseData: any;
  errorMessage: any;

  constructor(
    private service: AuthService,
    private route: Router,
    private _toastService: ToastService
  ) {
    localStorage.clear();
  }

  submitted = false;

  get myForm() {
    return this.login.controls;
  }
  ngOnInit(): void {
    // console.log('this.login', this.login);
  }

  login = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  proceedLogin() {
    this.submitted = true;
    if (this.login.valid) {
      this.service.setSignIn(this.login.value).subscribe(
        (result) => {
          if (result != null) {
            this.responseData = result;

            this._toastService.success('Login berhasil');
            localStorage.setItem('token', this.responseData.data.token);
            this.route.navigate(['/admin/jurusan']);
          }
        },
        (err) => {
          const msg = err.error.fields;

          if (msg.hasOwnProperty('email')) {
            this.myForm['email'].setErrors({ incorrect: true });
            this.errorMessage = msg.email.message;
          }
          if (msg.hasOwnProperty('password')) {
            this.myForm['password'].setErrors({ incorrect: true });
            this.errorMessage = msg.password.message;
          }
        }
      );
    }
  }
}
