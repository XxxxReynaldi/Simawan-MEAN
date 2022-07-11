import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-badge-hapus',
  templateUrl: './badge-hapus.component.html',
  styleUrls: ['./badge-hapus.component.css'],
})
export class BadgeHapusComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() label = '';
}
