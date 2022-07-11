import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-card-kelas',
  templateUrl: './card-kelas.component.html',
  styleUrls: ['./card-kelas.component.css'],
})
export class CardKelasComponent implements OnInit, OnChanges {
  @Input() payload: any;
  @Input() dropdown: boolean = false;

  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();
  constructor() {}
  ngOnInit(): void {
    // console.log('this.payload card-kelas', this.payload);
  }

  ngOnChanges() {
    // changes.prop contains the old and the new value...
    // console.log('kelasForm', this.payload);
    if (this.payload.tingkatan != null) {
      if (this.payload.tingkatan.hasOwnProperty('value')) {
        const tingkatan = this.payload.tingkatan.value;
        this.payload = { ...this.payload, tingkatan };
      }
    }
  }

  show = false;
  setShow(e: any): void {
    this.show = !this.show;
  }

  editClicked(payload: any): void {
    console.log('click edit', payload);
    this.edit.emit(payload);
  }
  removeClicked(payload: any): void {
    console.log('click delete', payload);
    this.remove.emit(payload);
  }
}
