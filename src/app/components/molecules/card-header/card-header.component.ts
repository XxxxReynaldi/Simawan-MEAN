import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: [
    './card-header.component.css',
    '../../../styles/card.component.css',
  ],
})
export class CardHeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  @Input() title = '';
  @Input() subtitle = '';
  @Input() countNum = 0;
  @Output() add: EventEmitter<any> = new EventEmitter();

  addClicked() {
    this.add.emit();
  }
}
