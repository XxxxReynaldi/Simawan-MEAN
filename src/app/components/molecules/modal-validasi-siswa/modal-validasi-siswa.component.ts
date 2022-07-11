import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'angular-toastify';
import { ValidasiUserService } from 'src/app/services/validasi-user.service';

export interface ModalValidasiSiswaProps {
  _id?: string;
  namaLengkap: string;
  NISN: string;
  tempatLahir: string;
  tanggalLahir: Date;
  namaIbu: string;
  telp: string;
  email: string;
}

@Component({
  selector: 'app-modal-validasi-siswa',
  templateUrl: './modal-validasi-siswa.component.html',
  styleUrls: ['./modal-validasi-siswa.component.css'],
})
export class ModalValidasiSiswaComponent implements OnInit {
  @Input() fromParent: any;
  listKelas: Array<any> = [];

  user: ModalValidasiSiswaProps = {
    _id: '',
    namaLengkap: '',
    NISN: '',
    tempatLahir: '',
    tanggalLahir: new Date(),
    namaIbu: '',
    telp: '',
    email: '',
  };

  cardKelas = {
    _id: '',
    tingkatan: '',
    tahunAjaran: '',
    abjad: '',
    keahlian: { singkatan: '', paketKeahlian: '', warna: '#c3c3c3', kode: '' },
    keterangan: '',
    kode: '',
    status: '',
  };

  bindNamaKelas: any;

  selectedKelas = null;

  responseData: any;
  errorMessage: any = {
    kelas: '',
    prefixNIS: '',
    NIS: '',
  };

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public service: ValidasiUserService,
    private _toastService: ToastService
  ) {}
  submitted = false;
  generatted = false;
  validasiForm!: FormGroup;

  get myForm() {
    return this.validasiForm.controls;
  }

  ngOnInit(): void {
    this.listKelas = this.fromParent.listKelas;
    this.validasiForm = this.fb.group({
      _id: [''],
      kelas: [null, Validators.required],
      prefixNIS: ['', Validators.required],
      NIS: ['', Validators.required],
    });

    this.validasiForm.patchValue({ ...this.fromParent.payload });
    this.user = { ...this.fromParent.payload };
    // this.cardKelas = { ...this.fromParent.listKelas };
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  setPrefixNIS() {
    const kelas = this.validasiForm.get('kelas')?.value as any;

    const { tingkatan, abjad, kode } = kelas;
    const prefixKode = kode.substr(0, 2);
    const infixKode = kode.substr(4);
    const prefixNIS = prefixKode + infixKode;

    this.validasiForm.patchValue({ ...this.fromParent.payload, prefixNIS });
  }

  handleNIS() {
    const kelas = this.validasiForm.get('kelas')?.value as any;

    if (kelas === null) {
      this.myForm['kelas'].setErrors({ incorrect: true });
      this.errorMessage['kelas'] = 'Kelas harus diisi';
      return this._toastService.error('Kelas belum dipilih');
    }

    const generateNIS = this.service.generateNIS({ kelas });

    generateNIS.subscribe(
      (response) => {
        this.validasiForm.patchValue({
          ...this.fromParent.payload,
          NIS: response.data,
        });
        this._toastService.success(response.message);
      },
      (err) => {
        const msg = err;
        this._toastService.error('Data Gagal Digenerate');

        Object.entries(msg).map(([key, value]: any) => {
          if (msg.hasOwnProperty(key)) {
            this.myForm[key].setErrors({ incorrect: true });
            this.errorMessage[key] = value.message;
          }
        });
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.validasiForm.valid) {
      const validation = this.service.validation(
        this.validasiForm.value,
        this.validasiForm.value._id
      );

      validation.subscribe(
        (response) => {
          this.validasiForm.reset();
          this._toastService.success(response.message);
          this.closeModal();
        },
        (err) => {
          const msg = err;
          this._toastService.error('Data Gagal Divalidasi');

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
