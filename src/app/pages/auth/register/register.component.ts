import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  responseData: any;
  errorMessage: any = {
    namaLengkap: '',
    NISN: '',
    tempatLahir: '',
    tanggalLahir: '',
    namaIbu: '',
    email: '',
    password: '',
    telp: '',
  };

  constructor(
    public service: AuthService,
    private fb: FormBuilder,
    private route: Router,
    private _toastService: ToastService
  ) {}

  registerForm!: FormGroup;
  submitted = false;

  get myForm() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      namaLengkap: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(`^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$`),
        ],
      ],
      NISN: ['', Validators.required],
      tempatLahir: ['', Validators.required],
      tanggalLahir: ['', Validators.required],
      namaIbu: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      telp: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.maxLength(13),
        ],
      ],
    });
  }

  proceedRegister() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.service.setSignUp(this.registerForm.value).subscribe(
        (result) => {
          if (result != null) {
            this.responseData = result;

            this._toastService.success('Pendaftaran berhasil');
            this.route.navigate(['/auth/login']);
          }
        },
        (err) => {
          const msg = err.error.fields;
          this._toastService.error(err);

          if (msg.hasOwnProperty('email')) {
            this.myForm['email'].setErrors({ incorrect: true });
            this.errorMessage['email'] = msg.email.message;
          }
          if (msg.hasOwnProperty('NISN')) {
            this.myForm['NISN'].setErrors({ incorrect: true });
            this.errorMessage['NISN'] = msg.NISN.message;
          }
          if (msg.hasOwnProperty('telp')) {
            this.myForm['telp'].setErrors({ incorrect: true });
            this.errorMessage['telp'] = msg.telp.message;
          }
        }
      );
    }
  }
}
