import { Component, OnInit } from '@angular/core';
import { CalendarComponentTypeProperty, CalendarMonth, CalendarOptions } from 'ion2-calendar';
import { Vitals } from '../models/vitals';
import { VitalsService } from '../services/vitals.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  vitals: Vitals[] = []
  todaysVitals: Vitals[] = []
  date: Date = new Date()
  options: CalendarMonth

  constructor(private vitalService: VitalsService) { }

  ngOnInit() {
    this.retrieveAllVitals();
    console.log()
  }



retrieveAllVitals() {
  this.options.days
  this.vitalService.getAllVitals().subscribe( data => {
    this.vitals = data.vitals.map(x => Object.assign(new Vitals(), x))
    this.vitals.forEach( v => { 
      if (v.getCreatedAtDate().getDate())
        this.todaysVitals.map(v => Object.assign(new Vitals(), v)) 
        this.todaysVitals.push(v)
        })
      })
    }
  }
