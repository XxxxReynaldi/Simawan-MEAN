import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';

import { AdminComponent } from './admin.component';
import { JurusanComponent } from './jurusan/jurusan.component';
import { KelasComponent } from './kelas/kelas.component';
import { ValidasiComponent } from './siswa/validasi/validasi.component';
import { SiswaComponent } from './siswa/siswa.component';

import { SideBarComponent } from 'src/app/components/organisms/side-bar/side-bar.component';
import { BodyComponent } from 'src/app/components/organisms/body/body.component';
import { HeaderComponent } from 'src/app/components/atoms/header/header.component';
import { CardHeaderComponent } from 'src/app/components/molecules/card-header/card-header.component';
import { CardJurusanComponent } from 'src/app/components/atoms/card-jurusan/card-jurusan.component';
import { CardKelasComponent } from 'src/app/components/atoms/card-kelas/card-kelas.component';
import { PengaturanComponent } from './pengaturan/pengaturan.component';
import { CardSiswaComponent } from 'src/app/components/atoms/card-siswa/card-siswa.component';
import { FormProfileComponent } from 'src/app/components/molecules/form-profile/form-profile.component';
import { FormPasswordComponent } from 'src/app/components/molecules/form-password/form-password.component';
import { ModalJurusanComponent } from 'src/app/components/molecules/modal-jurusan/modal-jurusan.component';
import { ModalHapusComponent } from 'src/app/components/molecules/modal-hapus/modal-hapus.component';
import { ModalHeaderComponent } from 'src/app/components/atoms/modal-header/modal-header.component';
import { BadgeHapusComponent } from 'src/app/components/atoms/badge-hapus/badge-hapus.component';
import { ModalKelasComponent } from 'src/app/components/molecules/modal-kelas/modal-kelas.component';
import { ModalUploadImageComponent } from 'src/app/components/molecules/modal-upload-image/modal-upload-image.component';
import { ModalValidasiSiswaComponent } from 'src/app/components/molecules/modal-validasi-siswa/modal-validasi-siswa.component';
import { ModalPelanggaranComponent } from 'src/app/components/molecules/modal-pelanggaran/modal-pelanggaran.component';

import { PelanggaranComponent } from './pelanggaran/pelanggaran.component';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { TablePelanggaranComponent } from 'src/app/components/molecules/table-pelanggaran/table-pelanggaran.component';

const routes: Routes = [
  // { path: '', component: AdminComponent },
  // { path: 'kelas', component: KelasComponent },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'siswa',
        component: SiswaComponent,
      },
      {
        path: 'pelanggaran',
        component: PelanggaranComponent,
      },
      {
        path: 'kelas',
        component: KelasComponent,
      },
      {
        path: 'jurusan',
        component: JurusanComponent,
      },
      {
        path: 'pengaturan',
        component: PengaturanComponent,
      },
      {
        path: 'siswa/validasi',
        component: ValidasiComponent,
      },
      {
        path: '',
        redirectTo: '/admin/jurusan',
        pathMatch: 'full',
      },
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    AdminComponent,
    SideBarComponent,
    BodyComponent,
    KelasComponent,
    JurusanComponent,
    SiswaComponent,
    HeaderComponent,
    BadgeHapusComponent,
    CardHeaderComponent,
    CardJurusanComponent,
    CardKelasComponent,
    CardSiswaComponent,
    PengaturanComponent,
    FormProfileComponent,
    FormPasswordComponent,
    ModalHapusComponent,
    ModalJurusanComponent,
    ModalHeaderComponent,
    ModalKelasComponent,
    ModalUploadImageComponent,
    ModalValidasiSiswaComponent,
    ModalPelanggaranComponent,
    ValidasiComponent,
    PelanggaranComponent,
    TablePelanggaranComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    DataTablesModule,
  ],
})
export class AdminModule {}
