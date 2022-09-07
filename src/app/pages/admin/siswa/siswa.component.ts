import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'angular-toastify';
import { KelasService } from 'src/app/services/kelas.service';
import { SiswaService } from 'src/app/services/siswa.service';

@Component({
  selector: 'app-siswa',
  templateUrl: './siswa.component.html',
  styleUrls: ['./siswa.component.css'],
})
export class SiswaComponent implements OnInit {
  listKelas: Array<any> = [];
  listSiswa: Array<any> = [];
  totalSiswa = 0;
  errorMessage = '';

  constructor(
    private modalService: NgbModal,
    public siswaService: SiswaService,
    public kelasService: KelasService,
    private _toastService: ToastService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.getListSiswa();
    this.getListKelas();
  }
  submitted = false;
  filterForm!: FormGroup;

  get myForm() {
    return this.filterForm.controls;
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      tahunAjaran: [null, Validators.required],
      kelas: [null, Validators.required],
    });
  }

  getListKelas() {
    this.kelasService.getAllKelas().subscribe(
      (response: any) => {
        this.listKelas = response.data;
      },
      (err) => {
        const msg = err.message;

        this._toastService.error(msg);
      }
    );
  }

  getListSiswa() {
    this.siswaService.getAllSiswa().subscribe(
      (response: any) => {
        this.listSiswa = response.data;
        this.totalSiswa = response.total;
      },
      (err) => {
        const msg = err.message;
        this._toastService.error(msg);
      }
    );
  }

  handleAdd() {
    this.router.navigate(['/admin/siswa/validasi']);
  }

  filterSiswa() {
    this.submitted = true;
    let tahunAjaran = this.filterForm.get('tahunAjaran')?.value;
    let kelas = this.filterForm.get('kelas')?.value;

    if (kelas === null || tahunAjaran === null) {
      this._toastService.error('Semua inputan harus terisi');
      return;
    }

    // Set Kode Kelas
    let valueKelas = '';
    if (kelas.hasOwnProperty('_id')) {
      valueKelas = kelas._id;
    }

    this.siswaService.getSiswaByFilter(tahunAjaran, valueKelas).subscribe(
      (res: any) => {
        this.listSiswa = res.data;
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

  handleEdit(payload: any) {}
  handleDelete(payload: any) {}
}
