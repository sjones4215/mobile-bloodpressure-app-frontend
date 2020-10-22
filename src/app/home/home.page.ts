// home.module.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  date: string;
  type: 'string';

  constructor() { }

  onChange($event) {
    console.log($event);
  }
}
