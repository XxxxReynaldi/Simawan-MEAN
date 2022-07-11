import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-siswa',
  templateUrl: './card-siswa.component.html',
  styleUrls: ['./card-siswa.component.css'],
})
export class CardSiswaComponent implements OnInit {
  @Input() payload: any;

  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();
  constructor() {}
  ngOnInit(): void {
    // console.log('this.payload', this.payload);
  }

  show = false;
  setShow(e: any): void {
    this.show = !this.show;
  }

  editClicked(payload: any): void {
    this.edit.emit(payload);
  }
  removeClicked(payload: any): void {
    this.remove.emit(payload);
  }
}
