import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table-pelanggaran',
  templateUrl: './table-pelanggaran.component.html',
  styleUrls: ['./table-pelanggaran.component.css'],
})
export class TablePelanggaranComponent implements OnInit {
  @Input() payload: any;

  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();
  dtOptions: DataTables.Settings = {};
  constructor() {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      dom: 'irtlp', // manipulate toolbar
    };
  }
  editClicked(payload: any): void {
    this.edit.emit(payload);
  }
  removeClicked(payload: any): void {
    this.remove.emit(payload);
  }
}
