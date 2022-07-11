import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'angular-toastify';
import { SiswaService } from 'src/app/services/siswa.service';

@Component({
  selector: 'app-siswa',
  templateUrl: './siswa.component.html',
  styleUrls: ['./siswa.component.css'],
})
export class SiswaComponent implements OnInit {
  listSiswa: Array<any> = [];
  totalSiswa = 0;
  errorMessage = '';

  constructor(
    private modalService: NgbModal,
    public siswaService: SiswaService,
    private _toastService: ToastService,
    private router: Router
  ) {
    this.getListSiswa();
  }

  ngOnInit(): void {}

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

  handleEdit(payload: any) {}
  handleDelete(payload: any) {}
}
