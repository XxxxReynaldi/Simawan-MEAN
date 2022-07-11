import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'angular-toastify';
import { PelanggaranService } from 'src/app/services/pelanggaran.service';

@Component({
  selector: 'app-modal-pelanggaran',
  templateUrl: './modal-pelanggaran.component.html',
  styleUrls: [
    './modal-pelanggaran.component.css',
    '../../../styles/input.component.css',
  ],
})
export class ModalPelanggaranComponent implements OnInit {
  @Input() fromParent: any;
  responseData: any;
  errorMessage: any = {
    jenisPelanggaran: '',
    kategori: '',
    jumlahPoin: 0,
  };
  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public service: PelanggaranService,
    private _toastService: ToastService
  ) {}
  submitted = false;
  pelanggaranForm!: FormGroup;

  get myForm() {
    return this.pelanggaranForm.controls;
  }

  ngOnInit(): void {
    this.pelanggaranForm = this.fb.group({
      _id: [''],
      jenisPelanggaran: ['', Validators.required],
      kategori: ['', Validators.required],
      jumlahPoin: [0, Validators.required],
    });

    if (this.fromParent.prefix === 'Edit') {
      this.pelanggaranForm.patchValue({ ...this.fromParent.payload });
    }
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  options = [
    { value: 'kelakuan', label: 'Kelakuan' },
    { value: 'kerajinan', label: 'Kerajinan' },
    { value: 'kerapian', label: 'Kerapian' },
  ];

  onSubmit() {
    this.submitted = true;
    const kategori = this.pelanggaranForm.get('kategori')?.value;

    if (this.pelanggaranForm.valid) {
      let kategoriSelected = '';
      if (kategori.hasOwnProperty('value')) {
        kategoriSelected = kategori.value;
      } else {
        kategoriSelected = kategori;
      }
      this.pelanggaranForm.patchValue({
        ...this.pelanggaranForm.value,
        kategori: kategoriSelected,
      });

      switch (this.fromParent.prefix) {
        case 'Tambah':
          const storeResponse = this.service.storePelanggaran(
            this.pelanggaranForm.value
          );

          storeResponse.subscribe(
            (response) => {
              this._toastService.success('Data Berhasil Ditambahkan');
              this.pelanggaranForm.reset();
              this.closeModal();
            },
            (err) => {
              const msg = err.error.data.errors;
              this._toastService.error('Data Gagal Ditambahkan');

              Object.entries(msg).map(([key, value]: any) => {
                if (msg.hasOwnProperty(key)) {
                  this.myForm[key].setErrors({ incorrect: true });
                  this.errorMessage[key] = value.message;
                }
              });
            }
          );
          break;

        case 'Edit':
          const updateResponse = this.service.updatePelanggaran(
            this.pelanggaranForm.value,
            this.pelanggaranForm.value._id
          );
          updateResponse.subscribe(
            (response) => {
              this._toastService.success('Data Berhasil Disimpan');
              this.pelanggaranForm.reset();
              this.closeModal();
            },
            (err) => {
              const msg = err.error.data.errors;
              this._toastService.error('Data Gagal Disimpan');

              Object.entries(msg).map(([key, value]: any) => {
                if (msg.hasOwnProperty(key)) {
                  this.myForm[key].setErrors({ incorrect: true });
                  this.errorMessage[key] = value.message;
                }
              });
            }
          );
          break;

        default:
          break;
      }
    }
  }
}
