import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'angular-toastify';
import { KelasService } from 'src/app/services/kelas.service';
// import { DataService, Person } from 'src/app/services/data.service';

export interface ModalKelasProps {
  _id?: string;
  tingkatan: string;
  keahlian: { singkatan: string; paketKeahlian: string; warna: string };
  abjad: string;
  tahunAjaran: string;
  keterangan?: string;
  status: string;
  kode: string;
}

@Component({
  selector: 'app-modal-kelas',
  templateUrl: './modal-kelas.component.html',
  styleUrls: [
    './modal-kelas.component.css',
    '../../../styles/input.component.css',
  ],
})
export class ModalKelasComponent implements OnInit {
  @Input() fromParent: any;
  listJurusan: Array<any> = [];

  responseData: any;
  errorMessage: any = {
    tingkatan: '',
    keahlian: '',
    abjad: '',
    tahunAjaran: '',
    kode: '',
  };

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public service: KelasService,
    private _toastService: ToastService
  ) {}
  submitted = false;
  generated = false;
  kelasForm!: FormGroup;

  get myForm() {
    return this.kelasForm.controls;
  }

  ngOnInit(): void {
    this.listJurusan = this.fromParent.listJurusan;
    this.kelasForm = this.fb.group({
      _id: [''],
      tingkatan: [null, Validators.required],
      keahlian: [
        { singkatan: '', paketKeahlian: '', warna: '', kode: '' },
        Validators.required,
      ],
      abjad: ['', Validators.required],
      tahunAjaran: [new Date().getFullYear().toString(), Validators.required],
      keterangan: [''],
      kode: ['', Validators.required],
      status: [true],
    });

    if (this.fromParent.prefix === 'Edit') {
      this.editForm();
      // console.log('this.kelasForm', this.kelasForm);
    }
  }

  editForm() {
    const status = this.fromParent.payload.status === 'Y' ? true : false;
    this.kelasForm.patchValue({ ...this.fromParent.payload, status });
  }

  tingkatan = [
    { value: 'X', label: 'X', kode: '10' },
    { value: 'XI', label: 'XI', kode: '11' },
    { value: 'XII', label: 'XII', kode: '12' },
  ];

  handleGenerateKode() {
    this.generated = true;
    const tingkatan = this.kelasForm.get('tingkatan')?.value;
    const keahlian = this.kelasForm.get('keahlian')?.value;

    if (tingkatan == null) {
      this.myForm['tingkatan'].setErrors({ incorrect: true });
      this.errorMessage['tingkatan'] = 'Tingkatan harus diisi';
      return;
    }

    if (keahlian.kode == '') {
      this.myForm['keahlian'].setErrors({ incorrect: true });
      this.errorMessage['keahlian'] = 'Keahlian harus diisi';
      return;
    }

    // Set Kode Tingkatan
    let kodeTingkatan = '';
    if (tingkatan.hasOwnProperty('value')) {
      kodeTingkatan = tingkatan.kode;
    }
    const findTingkatan = this.tingkatan.find(
      (option: any) => option.value == tingkatan
    );
    if (findTingkatan?.hasOwnProperty('value')) {
      kodeTingkatan = findTingkatan.kode;
    }

    // Set Kode Keahlian
    const kodeKeahlian = this.kelasForm.get('keahlian')?.value.kode;

    // Set Kode TahunAjaran
    const tahunAjaran = this.kelasForm.get('tahunAjaran')?.value;
    const kodeTahunAjaran = tahunAjaran.toString().substr(-2);

    // Set Kode Kelas
    this.kelasForm
      .get('kode')
      ?.patchValue(kodeTahunAjaran + kodeTingkatan + kodeKeahlian);
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  onSubmit() {
    this.submitted = true;
    const tingkatan = this.kelasForm.get('tingkatan')?.value;
    const keahlian = this.kelasForm.get('keahlian')?.value;

    if (this.kelasForm.valid) {
      if (this.kelasForm.value.status === true) {
        this.kelasForm.patchValue({ ...this.kelasForm.value, status: 'Y' });
      } else {
        this.kelasForm.patchValue({ ...this.kelasForm.value, status: 'N' });
      }

      let kodeTingkatan = '';
      if (tingkatan.hasOwnProperty('value')) {
        kodeTingkatan = tingkatan.value;
      } else {
        kodeTingkatan = tingkatan;
      }
      this.kelasForm.patchValue({
        ...this.kelasForm.value,
        keahlian: keahlian._id,
        tingkatan: kodeTingkatan,
      });

      switch (this.fromParent.prefix) {
        case 'Tambah':
          const storeResponse = this.service.storeKelas(this.kelasForm.value);

          storeResponse.subscribe(
            (response) => {
              this._toastService.success('Data Berhasil Ditambahkan');
              this.kelasForm.reset();
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
          const updateResponse = this.service.updateKelas(
            this.kelasForm.value,
            this.kelasForm.value._id
          );
          updateResponse.subscribe(
            (response) => {
              this._toastService.success('Data Berhasil Disimpan');
              this.kelasForm.reset();
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
