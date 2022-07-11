import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastService } from 'angular-toastify';
import jwtDecode from 'jwt-decode';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { menuData } from './menu-data';

interface SideBarToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  @Output() toggleSideBar: EventEmitter<SideBarToggle> =
    new EventEmitter<SideBarToggle>();

  collapsed = false;
  screenWidth = 0;

  menuItems = menuData;

  IMG_PATH = '../../../assets';
  private IMAGE_API_URL = environment.IMAGE_API_URL;
  iconUserProfile: string = `${this.IMG_PATH}/img/default.jpg`;

  dataUser: any = null;
  user: any;
  namaLengkap: string = '';
  role: string = '';

  constructor(
    public userService: UserService,
    private _toastService: ToastService
  ) {
    const token = localStorage.getItem('token') as any;
    const userPayload = jwtDecode(token) as any;
    this.dataUser = userPayload.user;
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.getUser();
  }

  getUser() {
    this.userService.getDataUser(this.dataUser.id).subscribe(
      (response: any) => {
        this.user = response.data;
        this.namaLengkap = response.data.namaLengkap;
        this.role = response.data.role;
        this.iconUserProfile = `${this.IMAGE_API_URL}/user/${response.data.foto}`;
      },
      (err) => {
        const msg = err.message;
        this._toastService.error(msg);
      }
    );
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;

    this.toggleSideBar.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }
}
