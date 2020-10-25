import { Component } from '@angular/core';
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
export class Tab1Page {
  date: string;
  type: 'string';
  vitals: Vitals[] = []
  options: CalendarComponentOptions = {
    from: new Date(1),
    daysConfig: []
  };
  
  constructor(public popoverController: PopoverController, private vitalService: VitalsService) {}
  
  ionViewWillEnter() {
    this.retrieveAllVitals();
  }

  retrieveAllVitals() {
  this.vitalService.getAllVitals().subscribe(data => {
      if (data) {
        console.log(data)
        this.vitals = data.vitals
      }
    })
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


  
