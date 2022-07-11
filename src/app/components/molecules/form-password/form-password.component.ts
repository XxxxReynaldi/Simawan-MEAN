import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastService } from 'angular-toastify';
import { UserService } from 'src/app/services/user.service';
import { ValidatePassword } from './validate-password';

export class FormPasswordProps {
  oldPassword!: string;
  newPassword!: string;
  confirmPass!: string;
}

export type PassShowProps = 'oldPassword' | 'newPassword' | 'confirmPass';

@Component({
  selector: 'app-form-password',
  templateUrl: './form-password.component.html',
  styleUrls: [
    './form-password.component.css',
    '../../../styles/input.component.css',
  ],
})
export class FormPasswordComponent implements OnInit {
  @Input() payload: any;
  errorMessage: any = {
    oldPassword: '',
    newPassword: '',
    confirmPass: '',
  };

  constructor(
    private fb: FormBuilder,
    public service: UserService,
    private _toastService: ToastService
  ) {}
  submitted = false;
  passwordForm!: FormGroup;

  get myForm() {
    return this.passwordForm.controls;
  }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      _id: [''],
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPass: ['', Validators.required],
    });

    this.editForm();
  }

  editForm() {
    this.passwordForm.patchValue({ ...this.payload });
  }

  passShow = {
    oldPassword: false,
    newPassword: false,
    confirmPass: false,
  };

  onClickPass(data: PassShowProps) {
    let update = this.passShow.hasOwnProperty(data);
    if (update) {
      this.passShow[data] = !this.passShow[data];
    }
    // (prev: any) => ({ ...prev, [name]: !passwordShow[name] })
  }

  onSubmit() {
    this.submitted = true;
    if (this.passwordForm.valid) {
      const updateResponse = this.service.updatePassword(
        this.passwordForm.value,
        this.passwordForm.value._id
      );
      updateResponse.subscribe(
        (response) => {
          this._toastService.success('Data Berhasil Disimpan');
          this.passwordForm.reset();
        },
        (err) => {
          const msg = err.error.fields;
          this._toastService.error('Data Gagal Disimpan');

          Object.entries(msg).map(([key, value]: any) => {
            if (msg.hasOwnProperty(key)) {
              this.myForm[key].setErrors({ incorrect: true });
              this.errorMessage[key] = value.message;
            }
          });
        }
      );
    }
  }
}
