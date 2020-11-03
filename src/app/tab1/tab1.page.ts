import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { CalendarComponentOptions } from 'ion2-calendar';
import { Vitals } from '../models/vitals';
import { PopoverComponent } from '../popover/popover.component';
import { VitalsService } from '../services/vitals.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  normal: true
  date: string;
  type: 'string';
  vitals: Vitals[] = []
  options: CalendarComponentOptions = {
    from: new Date(1),
    daysConfig: [ 
  ],
};
  
  constructor(public popoverController: PopoverController, private vitalService: VitalsService) {}
  
  ngOnInit() {
    this.retrieveAllVitals()
  }


  retrieveAllVitals() {
  this.vitalService.getAllVitals().subscribe(data => {
      if (data) {
      this.vitals = data.vitals
      this.vitalsSearch();   
    }
  })
}

vitalsSearch() {
  this.vitals.forEach(v => {
  if (v.systolic > 130 || v.systolic < 90 ||  
      v.diastolic > 80 || v.diastolic > 99 ||
      v.hr < 75 || v.hr > 120 ||
      v.oxygen < 80 || 
      v.temp > 99.0 || v.temp < 96.5) {
      this.options.daysConfig.push({
        date: new Date(v.created_at),
        cssClass: 'abnormal-vitals'
          })
        } else {
          this.options.daysConfig.push({
            date: new Date(v.created_at),
            cssClass: 'my-cal'
          })
        }
      }
    )
  }

  onChange($event) {
    console.log($event)
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}


  
