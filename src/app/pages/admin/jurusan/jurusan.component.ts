import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'angular-toastify';
import { ModalHapusComponent } from 'src/app/components/molecules/modal-hapus/modal-hapus.component';
import { ModalJurusanComponent } from 'src/app/components/molecules/modal-jurusan/modal-jurusan.component';
import { JurusanService } from 'src/app/services/jurusan.service';

@Component({
  selector: 'app-jurusan',
  templateUrl: './jurusan.component.html',
  styleUrls: [
    './jurusan.component.css',
    '../../../components/atoms/card-jurusan/card-jurusan.component.css',
  ],
})
export class JurusanComponent implements OnInit {
  listJurusan: Array<any> = [];
  totalJurusan = 0;
  errorMessage = '';

  constructor(
    private modalService: NgbModal,
    public jurusanService: JurusanService,
    private _toastService: ToastService
  ) {
    this.getListJurusan();
  }
  ngOnInit(): void {}

  getListJurusan() {
    this.jurusanService.getAllJurusan().subscribe(
      (response: any) => {
        this.listJurusan = response.data;
        this.totalJurusan = response.total;
        console.log('response', response);
      },
      (err) => {
        const msg = err.message;
        console.log('errorMessage: ', msg);
        this._toastService.error(msg);
      }
    );
  }

  handleAdd() {
    //ModalComponent is component name where modal is declare
    const modalRef = this.modalService.open(ModalJurusanComponent);
    let data = {
      prefix: 'Tambah',
    };

    modalRef.componentInstance.fromParent = data;
    modalRef.result
      .then((result) => {
        // console.log(result);
        this.getListJurusan();
      })
      .catch((error) => {
        // console.log(error);
      });
  }

  handleEdit(payload: any) {
    const modalRef = this.modalService.open(ModalJurusanComponent);
    let data = {
      prefix: 'Edit',
      payload: payload,
    };

    modalRef.componentInstance.fromParent = data;
    modalRef.result
      .then((result) => {
        this.getListJurusan();
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
      suffix: 'Jurusan',
      payload: payload,
    };

    modalRef.componentInstance.fromParent = data;
    modalRef.result
      .then((result) => {
        this.getListJurusan();
      })
      .catch((error) => {
        // console.log(error);
      });
  }
}
