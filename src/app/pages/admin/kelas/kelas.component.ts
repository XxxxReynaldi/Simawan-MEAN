import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'angular-toastify';
import { ModalHapusComponent } from 'src/app/components/molecules/modal-hapus/modal-hapus.component';
import { ModalKelasComponent } from 'src/app/components/molecules/modal-kelas/modal-kelas.component';
import { JurusanService } from 'src/app/services/jurusan.service';
import { KelasService } from 'src/app/services/kelas.service';

@Component({
  selector: 'app-kelas',
  templateUrl: './kelas.component.html',
  styleUrls: ['./kelas.component.css'],
})
export class KelasComponent implements OnInit {
  listJurusan: Array<any> = [];
  listKelas: Array<any> = [];
  totalKelas = 0;

  tingkatan = [
    { value: 'X', label: 'X', kode: '10' },
    { value: 'XI', label: 'XI', kode: '11' },
    { value: 'XII', label: 'XII', kode: '12' },
  ];

  constructor(
    private modalService: NgbModal,
    public jurusanService: JurusanService,
    public kelasService: KelasService,
    private _toastService: ToastService,
    private fb: FormBuilder
  ) {
    this.getListJurusan();
    this.getListKelas();
  }
  submitted = false;
  filterForm!: FormGroup;

  get myForm() {
    return this.filterForm.controls;
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      tingkatan: [null, Validators.required],
      tahunAjaran: [null, Validators.required],
    });
  }

  getListJurusan() {
    this.jurusanService.getAllJurusan().subscribe(
      (response: any) => {
        this.listJurusan = response.data;
      },
      (err) => {
        const msg = err.message;
        this._toastService.error(msg);
      }
    );
  }

  filterKelas() {
    this.submitted = true;
    let tahunAjaran = this.filterForm.get('tahunAjaran')?.value;
    let tingkatan = this.filterForm.get('tingkatan')?.value;

    if (tingkatan === null || tahunAjaran === null) {
      this._toastService.error('Semua inputan harus terisi');
      return;
    }

    // Set Kode Tingkatan
    let valueTingkatan = '';
    if (tingkatan.hasOwnProperty('value')) {
      valueTingkatan = tingkatan.value;
    }
    const findTingkatan = this.tingkatan.find(
      (option: any) => option.value == tingkatan
    );
    if (findTingkatan?.hasOwnProperty('value')) {
      valueTingkatan = findTingkatan.value;
    }

    this.kelasService.getKelasByFilter(tahunAjaran, valueTingkatan).subscribe(
      (res: any) => {
        this.listKelas = res.data;
        const { total } = res;
        if (res.error || total === 0) {
          this._toastService.error('Data tidak ditemukan!');
        } else {
          this._toastService.success(`${total} Data berhasil ditemukan!`);
        }
      },
      (err) => {
        const msg = err.message;
        this._toastService.error(msg);
      }
    );
  }

  getListKelas() {
    this.kelasService.getAllKelas().subscribe(
      (response: any) => {
        this.listKelas = response.data;
        this.totalKelas = response.total;
      },
      (err) => {
        const msg = err.message;
        this._toastService.error(msg);
      }
    );
  }

  handleAdd() {
    //ModalComponent is component name where modal is declare
    const modalRef = this.modalService.open(ModalKelasComponent, {
      size: 'lg',
      centered: true,
    });
    let data = {
      prefix: 'Tambah',
      listJurusan: this.listJurusan,
    };

    modalRef.componentInstance.fromParent = data;
    modalRef.result
      .then((result) => {
        this.getListKelas();
      })
      .catch((error) => {});
  }

  handleEdit(payload: any) {
    const modalRef = this.modalService.open(ModalKelasComponent, {
      size: 'lg',
      centered: true,
    });
    let data = {
      prefix: 'Edit',
      listJurusan: this.listJurusan,
      payload: payload,
    };

    modalRef.componentInstance.fromParent = data;
    modalRef.result
      .then((result) => {
        this.getListKelas();
      })
      .catch((error) => {});
  }

  handleDelete(payload: any) {
    const modalRef = this.modalService.open(ModalHapusComponent, {
      centered: true,
    });
    let data = {
      prefix: 'Hapus',
      suffix: 'Kelas',
      payload: payload,
    };

    modalRef.componentInstance.fromParent = data;
    modalRef.result
      .then((result) => {
        this.getListKelas();
      })
      .catch((error) => {});
  }
}
