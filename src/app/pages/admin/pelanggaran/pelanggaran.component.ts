import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'angular-toastify';
import { ModalHapusComponent } from 'src/app/components/molecules/modal-hapus/modal-hapus.component';
import { ModalPelanggaranComponent } from 'src/app/components/molecules/modal-pelanggaran/modal-pelanggaran.component';
import { PelanggaranService } from 'src/app/services/pelanggaran.service';

@Component({
  selector: 'app-pelanggaran',
  templateUrl: './pelanggaran.component.html',
  styleUrls: ['./pelanggaran.component.css'],
})
export class PelanggaranComponent implements OnInit {
  listPelanggaran: Array<any> = [];
  listKelakuan: Array<any> = [];
  listKerajinan: Array<any> = [];
  listKerapian: Array<any> = [];
  totalPelanggaran = 0;
  errorMessage = '';

  constructor(
    private modalService: NgbModal,
    public pelanggaranService: PelanggaranService,
    private _toastService: ToastService
  ) {
    this.getListPelanggaran();
  }
  ngOnInit(): void {}

  active = 1;

  getListPelanggaran() {
    this.pelanggaranService.getAllPelanggaran().subscribe(
      (response: any) => {
        this.listPelanggaran = response.data;
        this.totalPelanggaran = response.total;
        this.setCollection(this.listPelanggaran);
      },
      (err) => {
        const msg = err.message;
        this._toastService.error(msg);
      }
    );
  }

  filterKategori = (data: any, selectKategori: string) => {
    return data.filter((item: any) => item.kategori === selectKategori);
  };

  setCollection(dataPelanggaran: any) {
    const kelakuan = this.filterKategori(dataPelanggaran, 'kelakuan');
    const kerajinan = this.filterKategori(dataPelanggaran, 'kerajinan');
    const kerapian = this.filterKategori(dataPelanggaran, 'kerapian');

    this.listKelakuan = kelakuan;
    this.listKerajinan = kerajinan;
    this.listKerapian = kerapian;
  }

  handleAdd() {
    const modalRef = this.modalService.open(ModalPelanggaranComponent);
    let data = {
      prefix: 'Tambah',
    };

    modalRef.componentInstance.fromParent = data;
    modalRef.result
      .then((result) => {
        this.getListPelanggaran();
      })
      .catch((error) => {});
  }

  handleEdit(payload: any) {
    const modalRef = this.modalService.open(ModalPelanggaranComponent);
    let data = {
      prefix: 'Edit',
      payload: payload,
    };

    modalRef.componentInstance.fromParent = data;
    modalRef.result
      .then((result) => {
        this.getListPelanggaran();
      })
      .catch((error) => {});
  }

  handleDelete(payload: any) {
    const modalRef = this.modalService.open(ModalHapusComponent, {
      centered: true,
    });
    let data = {
      prefix: 'Hapus',
      suffix: 'Pelanggaran',
      payload: payload,
    };

    modalRef.componentInstance.fromParent = data;
    modalRef.result
      .then((result) => {
        this.getListPelanggaran();
      })
      .catch((error) => {});
  }
}
