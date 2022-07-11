import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'angular-toastify';
import { retry, Subject, takeUntil } from 'rxjs';
import { JurusanService } from 'src/app/services/jurusan.service';

@Component({
  selector: 'app-modal-jurusan',
  templateUrl: './modal-jurusan.component.html',
  styleUrls: [
    './modal-jurusan.component.css',
    '../../../styles/input.component.css',
  ],
})
export class ModalJurusanComponent implements OnInit {
  @Input() fromParent: any;
  responseData: any;
  errorMessage = {
    bidangKeahlian: '',
    programKeahlian: '',
    paketKeahlian: '',
    singkatan: '',
    kode: '',
  };

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public service: JurusanService,
    private _toastService: ToastService,
    private route: Router
  ) {}
  submitted = false;
  jurusanForm!: FormGroup;

  get myForm() {
    return this.jurusanForm.controls;
  }

  ngOnInit(): void {
    this.jurusanForm = this.fb.group({
      _id: [''],
      bidangKeahlian: ['', Validators.required],
      programKeahlian: ['', Validators.required],
      paketKeahlian: ['', Validators.required],
      singkatan: ['', Validators.required],
      kode: ['', Validators.required],
      warna: ['#c3c3c3', Validators.required],
      status: [true],
    });

    if (this.fromParent.prefix === 'Edit') {
      this.editForm();
    }
  }

  editForm() {
    const status = this.fromParent.payload.status === 'Y' ? true : false;
    this.jurusanForm.patchValue({ ...this.fromParent.payload, status });
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  onSubmit() {
    this.submitted = true;
    if (this.jurusanForm.valid) {
      if (this.jurusanForm.value.status === true) {
        this.jurusanForm.patchValue({ ...this.jurusanForm.value, status: 'Y' });
      } else {
        this.jurusanForm.patchValue({ ...this.jurusanForm.value, status: 'N' });
      }
      // console.log('register', this.jurusanForm.value);

      switch (this.fromParent.prefix) {
        case 'Tambah':
          const storeResponse = this.service.storeJurusan(
            this.jurusanForm.value
          );

          storeResponse.subscribe(
            (response) => {
              // console.log(`response `, response);
              this._toastService.success('Data Berhasil Ditambahkan');
              this.jurusanForm.reset();
              this.closeModal();
            },
            (err) => {
              const msg = err.error.data.errors;
              // console.log('errorMessage: ', msg);
              this._toastService.error('Data Gagal Ditambahkan');

              if (msg.hasOwnProperty('kode')) {
                this.myForm['kode'].setErrors({ incorrect: true });
                this.errorMessage['kode'] = msg.kode.message;
              }
            }
          );
          break;

        case 'Edit':
          const updateResponse = this.service.updateJurusan(
            this.jurusanForm.value,
            this.jurusanForm.value._id
          );
          updateResponse.subscribe(
            (response) => {
              // console.log(`response `, response);
              this._toastService.success('Data Berhasil Disimpan');
              this.jurusanForm.reset();
              this.closeModal();
            },
            (err) => {
              const msg = err.error.data.errors;
              // console.log('errorMessage: ', msg);
              this._toastService.error('Data Gagal Disimpan');

              if (msg.hasOwnProperty('kode')) {
                this.myForm['kode'].setErrors({ incorrect: true });
                this.errorMessage['kode'] = msg.kode.message;
              }
            }
          );
          break;

        default:
          break;
      }
    }
  }
}
