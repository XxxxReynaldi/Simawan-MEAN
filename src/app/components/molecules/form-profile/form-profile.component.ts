import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastService } from 'angular-toastify';
import { UserService } from 'src/app/services/user.service';

export class FormProfileProps {
  public email!: string;
  public namaLengkap!: string;
}

@Component({
  selector: 'app-form-profile',
  templateUrl: './form-profile.component.html',
  styleUrls: [
    './form-profile.component.css',
    '../../../styles/input.component.css',
  ],
})
export class FormProfileComponent implements OnInit {
  @Input() payload: any;
  errorMessage: any = {
    email: '',
    namaLengkap: '',
  };

  constructor(
    private fb: FormBuilder,
    public service: UserService,
    private _toastService: ToastService
  ) {}
  submitted = false;
  profileForm!: FormGroup;

  get myForm() {
    return this.profileForm.controls;
  }

  ngOnInit(): void {
    // console.log('payload', this.payload);
    this.profileForm = this.fb.group({
      _id: [''],
      email: ['', Validators.required],
      namaLengkap: ['', Validators.required],
    });

    this.editForm();
    // console.log('payload pf', this.profileForm);
  }

  editForm() {
    this.profileForm.patchValue({ ...this.payload });
  }

  onSubmit() {
    this.submitted = true;
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
      const updateResponse = this.service.updateProfile(
        this.profileForm.value,
        this.profileForm.value._id
      );
      updateResponse.subscribe(
        (response) => {
          // console.log(`response `, response);
          this._toastService.success('Data Berhasil Disimpan');
          // this.profileForm.reset();
        },
        (err) => {
          const msg = err.error.data.errors;
          // console.log('errorMessage: ', msg);
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
