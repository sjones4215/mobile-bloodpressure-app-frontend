import { DatePipe } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { IonBackdrop, PopoverController } from '@ionic/angular';
import { CalendarComponentOptions, CalendarComponentPayloadTypes } from 'ion2-calendar';

import { Vitals } from '../models/vitals';
import { PopoverComponent } from '../popover/popover.component';
import { VitalsService } from '../services/vitals.service';
import { LoadingController } from '@ionic/angular';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  normal: true
  date: Date;
  type: 'string';
  vitals: Vitals[] = []
  abnormalVitals: Vitals[] = []
  options: CalendarComponentOptions 
  newOption: CalendarComponentPayloadTypes
  
  constructor(
    public popoverController: PopoverController, 
    private vitalService: VitalsService, 
    private loadingController: LoadingController, 
    private localStorageService: LocalStorageService, 
    private router: Router) {}
  
  ionViewWillEnter() {
    
    this.retrieveAllVitals()
    this.vitalsSearch();
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
  this.options = {
    from: new Date(1),
    showToggleButtons: false,
    daysConfig: [],
    color: 'dark'
  };
 this.vitals.forEach(v => {
  if (v.systolic > 130 || v.systolic < 90 ||  
      v.diastolic > 80 || v.diastolic > 99 ||
      v.hr < 75 || v.hr > 120 ||
      v.oxygen < 80 || 
      v.temp > 99.0 || v.temp < 96.5) {
        this.options.daysConfig.push({
          date: new Date(v.created_at),
          cssClass: 'abnormal-vitals',
        })
        } else {
        this.options.daysConfig.push({
            date: new Date(v.created_at),
            cssClass: 'my-cal',
            })
          }
        this.sortVitals();
      })
    }


  

  // onChange() {
  //   this.vitalsSearch()
  // }

  async presentPopover(ev: any) {
    this.presentLoadingWithOptions()
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      animated: false,
      componentProps: {
        dateSelected: new Date(ev.time)
      } 
    });
    return await popover.present();
  }

  
  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      cssClass: 'loading',
      message: 'Fetching vitals...',
      duration: 200,
      backdropDismiss: false,
      animated: false
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  
  
  
  
  sortVitals() {
    this.options.daysConfig.sort((a, b) => {
      if (a.cssClass < b.cssClass) return -1;
      else if (a.cssClass > b.cssClass) return 1;
      else return 0;
    });
  }

  signOut() {
    this.localStorageService.logoutUser();
    this.router.navigate([''])
  }
}


