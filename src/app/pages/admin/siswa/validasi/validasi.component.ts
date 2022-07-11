import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'angular-toastify';
import { Subject } from 'rxjs';
import { ModalHapusComponent } from 'src/app/components/molecules/modal-hapus/modal-hapus.component';
import { ModalValidasiSiswaComponent } from 'src/app/components/molecules/modal-validasi-siswa/modal-validasi-siswa.component';
import { KelasService } from 'src/app/services/kelas.service';
import { ValidasiUserService } from 'src/app/services/validasi-user.service';

@Component({
  selector: 'app-validasi',
  templateUrl: './validasi.component.html',
  styleUrls: ['./validasi.component.css'],
})
export class ValidasiComponent implements OnInit, OnDestroy {
  // dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
  listUser: any = [];
  listKelas = [];

  dtTrigger: Subject<any> = new Subject<any>();
  constructor(
    private modalService: NgbModal,
    public validasiUserService: ValidasiUserService,
    public kelasService: KelasService,
    private _toastService: ToastService
  ) {}

  ngOnInit(): void {
    // const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 15, 25, 50, 100],
      dom: 'irtlp', // manipulate toolbar
      processing: true,
      // serverSide: true,
      // ajax: () => {
      //   that.validasiUserService
      //     .getAllValidation({ validasi: 'pending' })
      //     .subscribe((response: any) => {
      //       this.listUser = response.data;
      //       console.log('response listUser', response);

      //       // callback({
      //       //   recordsTotal: response.total,
      //       //   recordsFiltered: 10,
      //       //   data: [],
      //       // });
      //     });
      // },
      // columns: [
      //   { title: 'No', data: null },
      //   { title: 'NISN', data: 'NISN' },
      //   { title: 'Nama Lengkap', data: 'namaLengkap' },
      //   { title: 'Telp', data: 'telp' },
      //   { title: 'Nama ibu', data: 'namaIbu' },
      //   { title: 'Email', data: 'email' },
      //   { title: 'Opsi', data: null },
      // ],
      // responsive: true,
    };

    this.getListUser();
    this.getListKelas();
  }

  getListUser() {
    this.validasiUserService
      .getAllValidation({ validasi: 'pending' })
      .subscribe(
        (response: any) => {
          // console.log('response listUser', response);
          this.listUser = response.data;
        },
        (err) => {
          const msg = err.message;
          // console.log('errorMessage: ', msg);
          this._toastService.error(msg);
        }
      );
  }

  getListKelas() {
    this.kelasService.getAllKelas().subscribe(
      (response: any) => {
        // console.log('response Kelas', response);
        this.listKelas = response.data;
      },
      (err) => {
        const msg = err.message;
        // console.log('errorMessage: ', msg);
        this._toastService.error(msg);
      }
    );
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  handleValidation(payload: any) {
    const modalRef = this.modalService.open(ModalValidasiSiswaComponent, {
      backdrop: 'static',
      centered: true,
      size: 'xl',
    });
    let data = {
      prefix: 'Validasi',
      payload: payload,
      listKelas: this.listKelas,
    };

    modalRef.componentInstance.fromParent = data;
    modalRef.result
      .then((result) => {
        this.getListUser();
      })
      .catch((error) => {
        // console.log(error);
      });
  }

  handleDelete(payload: any) {
    const modalRef = this.modalService.open(ModalHapusComponent, {
      centered: true,
    });
    let data = {
      prefix: 'Hapus',
      suffix: 'User',
      payload: payload,
    };

    modalRef.componentInstance.fromParent = data;
    modalRef.result
      .then((result) => {
        // console.log(result);
        this.getListUser();
      })
      .catch((error) => {
        // console.log(error);
      });
  }
}
