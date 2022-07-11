import { Component, OnInit } from '@angular/core';

interface SideBarToggle {
  collapsed: boolean;
  screenWidth: number;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  isSideBarCollapsed = false;
  screenWidth = 0;

  onToggleSideBar(data: SideBarToggle): void {
    this.isSideBarCollapsed = data.collapsed;
    this.screenWidth = data.screenWidth;
  }
}
