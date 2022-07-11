import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'angular-toastify';
import { Subject, takeUntil } from 'rxjs';
import { JurusanService } from 'src/app/services/jurusan.service';
import { KelasService } from 'src/app/services/kelas.service';
import { PelanggaranService } from 'src/app/services/pelanggaran.service';
import { UserService } from 'src/app/services/user.service';
import { ValidasiUserService } from 'src/app/services/validasi-user.service';

export class ModalHapusProps {
  id?: string;
}

@Component({
  selector: 'app-modal-hapus',
  templateUrl: './modal-hapus.component.html',
  styleUrls: ['./modal-hapus.component.css'],
})
export class ModalHapusComponent implements OnInit {
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private activeModal: NgbActiveModal,
    public jurusanService: JurusanService,
    public kelasService: KelasService,
    public userService: UserService,
    public validasiUserService: ValidasiUserService,
    public pelanggaranService: PelanggaranService,
    private _toastService: ToastService,
    private route: Router
  ) {}

  @Input() fromParent: any;
  label = '';

  ngOnInit(): void {
    // console.log('fromParent', this.fromParent);
    switch (this.fromParent.suffix) {
      case 'Jurusan':
        this.label = this.fromParent.payload.paketKeahlian;
        break;
      case 'Kelas':
        const { tingkatan, keahlian, abjad } = this.fromParent.payload;
        const { singkatan } = keahlian;
        this.label = `${tingkatan}-${singkatan}-${abjad}`;
        break;
      case 'Foto User':
        const { foto } = this.fromParent.payload;
        this.label = `${foto}`;
        break;
      case 'User':
        const { namaLengkap } = this.fromParent.payload;
        this.label = `${namaLengkap}`;
        break;
      case 'Pelanggaran':
        const { jenisPelanggaran } = this.fromParent.payload;
        this.label = `${jenisPelanggaran}`;
        break;

      default:
        break;
    }
  }

  model = new ModalHapusProps();

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  onSubmit() {
    switch (this.fromParent.suffix) {
      case 'Jurusan':
        const destroyJurusan = this.jurusanService.destroyJurusan(
          this.fromParent.payload._id
        );
        destroyJurusan.subscribe(
          (response) => {
            console.log(`response `, response);
            this._toastService.success('Data Berhasil Dihapus');
            this.closeModal();
          },
          (err) => {
            console.log('Error: ', err.error.data.errors);
            this._toastService.error('Data Gagal Dihapus');
          }
        );
        break;
      case 'Kelas':
        console.log('id', this.fromParent.payload._id);
        const destroyKelas = this.kelasService.destroyKelas(
          this.fromParent.payload._id
        );
        destroyKelas.subscribe(
          (response) => {
            console.log(`response `, response);
            this._toastService.success('Data Berhasil Dihapus');
            this.closeModal();
          },
          (err) => {
            console.log('Error: ', err.error.data.errors);
            this._toastService.error('Data Gagal Dihapus');
          }
        );
        break;
      case 'Foto User':
        console.log('id', this.fromParent.payload._id);
        const removePhoto = this.userService.removePhoto(
          this.fromParent.payload._id
        );
        removePhoto.subscribe(
          (response) => {
            console.log(`response `, response);
            this._toastService.success('Data Berhasil Dihapus');
            this.closeModal();
          },
          (err) => {
            console.log('Error: ', err);
            this._toastService.error('Data Gagal Dihapus');
          }
        );
        break;
      case 'User':
        console.log('id', this.fromParent.payload._id);
        const destroyUser = this.validasiUserService.destroyUser(
          this.fromParent.payload._id
        );
        destroyUser.subscribe(
          (response) => {
            console.log(`response `, response);
            this._toastService.success('Data Berhasil Dihapus');
            this.closeModal();
          },
          (err) => {
            console.log('Error: ', err);
            this._toastService.error('Data Gagal Dihapus');
          }
        );
        break;
      case 'Pelanggaran':
        console.log('id', this.fromParent.payload._id);
        const destroyPelanggaran = this.pelanggaranService.destroyPelanggaran(
          this.fromParent.payload._id
        );
        destroyPelanggaran.subscribe(
          (response) => {
            console.log(`response `, response);
            this._toastService.success('Data Berhasil Dihapus');
            this.closeModal();
          },
          (err) => {
            console.log('Error: ', err);
            this._toastService.error('Data Gagal Dihapus');
          }
        );
        break;

      default:
        break;
    }
  }
}
