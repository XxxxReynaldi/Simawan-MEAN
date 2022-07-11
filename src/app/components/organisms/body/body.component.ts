import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  getBodyClass(): string {
    let stylesClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      stylesClass = 'body-trimmed';
    } else if (
      this.collapsed &&
      this.screenWidth <= 768 &&
      this.screenWidth > 0
    ) {
      stylesClass = 'body-md-screen';
    }

    return stylesClass;
  }
}
