import { Component, OnInit } from '@angular/core';
import { Vitals } from '../models/vitals';
import { VitalsService } from '../services/vitals.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  vitals: Vitals[] = []
  constructor( private vitalService: VitalsService) { }

  ngOnInit() {
    this.vitalService.getAllVitals().subscribe(data => {
      if (data) {
      this.vitals = data.vitals
      }
    })
  }
}
