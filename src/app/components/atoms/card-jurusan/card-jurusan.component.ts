import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-jurusan',
  templateUrl: './card-jurusan.component.html',
  styleUrls: ['./card-jurusan.component.css'],
})
export class CardJurusanComponent implements OnInit {
  @Input() payload: any;

  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();
  constructor() {}
  ngOnInit(): void {}

  show = false;
  setShow(e: any): void {
    this.show = !this.show;
  }

  editClicked(payload: any): void {
    this.edit.emit(payload);
  }
  removeClicked(id: any): void {
    this.remove.emit(id);
  }
}
