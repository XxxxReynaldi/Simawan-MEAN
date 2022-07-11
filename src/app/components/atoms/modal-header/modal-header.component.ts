import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.css'],
})
export class ModalHeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() prefix: string = '';
  @Input() suffix: string = '';
}
