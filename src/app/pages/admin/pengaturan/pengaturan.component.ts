import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'angular-toastify';
import jwtDecode from 'jwt-decode';

import { ModalUploadImageComponent } from 'src/app/components/molecules/modal-upload-image/modal-upload-image.component';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pengaturan',
  templateUrl: './pengaturan.component.html',
  styleUrls: [
    './pengaturan.component.css',
    '../../../styles/picture.component.css',
  ],
})
export class PengaturanComponent implements OnInit {
  IMG_PATH = '../../../assets';
  private IMAGE_API_URL = environment.IMAGE_API_URL;

  iconUserProfile: string = `${this.IMG_PATH}/img/default.jpg`;
  dataUser: any = null;
  user: any;
  active = 1;

  constructor(
    private modalService: NgbModal,
    public userService: UserService,
    private _toastService: ToastService
  ) {
    const token = localStorage.getItem('token') as any;
    const userPayload = jwtDecode(token) as any;
    this.dataUser = userPayload.user;
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.userService.getDataUser(this.dataUser.id).subscribe(
      (response: any) => {
        this.user = response.data;
        this.iconUserProfile = `${this.IMAGE_API_URL}/user/${response.data.foto}`;
      },
      (err) => {
        const msg = err.message;
        this._toastService.error(msg);
      }
    );
  }

  handleEditImg() {
    //ModalComponent is component name where modal is declare
    const modalRef = this.modalService.open(ModalUploadImageComponent, {
      backdrop: 'static',
      centered: true,
    });
    let data = {
      prefix: 'Ubah',
      payload: this.user,
    };

    modalRef.componentInstance.fromParent = data;
    modalRef.result
      .then((result) => {
        this.getUser();
      })
      .catch((error) => {});
  }
}
