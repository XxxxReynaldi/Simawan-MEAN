import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'angular-toastify';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { ModalHapusComponent } from '../modal-hapus/modal-hapus.component';

@Component({
  selector: 'app-modal-upload-image',
  templateUrl: './modal-upload-image.component.html',
  styleUrls: [
    './modal-upload-image.component.css',
    '../../../styles/picture.component.css',
  ],
})
export class ModalUploadImageComponent implements OnInit {
  @Input() fromParent: any;
  private IMAGE_API_URL = environment.IMAGE_API_URL;

  IMG_PATH = '../../../assets';
  defaultPreview: string = `${this.IMG_PATH}/img/default.jpg`;
  fileSource: string = '';

  uploadImgForm!: FormGroup;
  submitted = false;
  errorMessage: any = {
    foto: '',
  };

  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private fb: FormBuilder,
    public service: UserService,
    private cd: ChangeDetectorRef,
    private _toastService: ToastService
  ) {}

  get myForm() {
    return this.uploadImgForm.controls;
  }

  ngOnInit(): void {
    this.uploadImgForm = this.fb.group({
      _id: [''],
      foto: [null],
    });

    if (this.fromParent.prefix === 'Ubah') {
      this.editForm();
    }
  }

  editForm() {
    this.uploadImgForm.patchValue({ ...this.fromParent.payload });
    this.defaultPreview = `${this.IMAGE_API_URL}/user/${this.fromParent.payload.foto}`;
  }

  handleDelete = () => {
    const modalRef = this.modalService.open(ModalHapusComponent, {
      centered: true,
    });
    let data = {
      prefix: 'Hapus',
      suffix: 'Foto User',
      payload: this.fromParent.payload,
    };

    modalRef.componentInstance.fromParent = data;
    modalRef.result
      .then((result) => {
        this.editForm();
      })
      .catch((error) => {});
  };

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  handleEdit(e: Event) {
    // const target = e.target as HTMLInputElement;
    const target = e.target as any;
    const reader = new FileReader(); // HTML5 FileReader API
    if (target.files && target.files.length) {
      const file = target.files[0];

      this.uploadImgForm.patchValue({
        foto: file,
      });
      this.uploadImgForm.get('file')?.updateValueAndValidity();

      reader.readAsDataURL(file);
      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.defaultPreview = reader.result as string;

        this.uploadImgForm.patchValue({
          fileSource: reader.result,
        });
      };
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.uploadImgForm.valid) {
      // console.log(this.uploadImgForm.value);
      const formData: FormData = new FormData();
      formData.append('foto', this.uploadImgForm.get('foto')?.value);

      const updateResponse = this.service.updatePhoto(
        formData,
        this.uploadImgForm.value._id
      );
      updateResponse.subscribe(
        (response) => {
          this._toastService.success('Data Berhasil Disimpan');
          this.closeModal();
        },
        (err) => {
          const msg = err;
          this._toastService.error('Data Gagal Disimpan');

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
