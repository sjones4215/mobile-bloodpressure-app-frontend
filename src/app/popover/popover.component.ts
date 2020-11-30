import { ComponentPortal } from '@angular/cdk/portal';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { CalendarComponentTypeProperty, CalendarMonth, CalendarOptions } from 'ion2-calendar';
import { CalendarAddComponent } from '../calendar-add/calendar-add.component';
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
  pastDate: Date = new Date()
  dateSelected: Date
  message = []


  constructor(
    private vitalService: VitalsService, 
    private loadingController: LoadingController,
    private modalController: ModalController) { }

  ngOnInit() {
    // this.presentLoadingWithOptions();
    this.retrieveAllVitals();
    console.log()
  }




retrieveAllVitals() {
  this.vitalService.getAllVitals().subscribe( data => {
    this.vitals = data.vitals.map(x => Object.assign(new Vitals(), x))
    const endOfDateSelected = new Date(this.dateSelected.getTime());
    endOfDateSelected.setDate(endOfDateSelected.getDate() + 1);
    this.vitals.forEach(v => {
      // if(v.getCreatedAtDate().getTime() >= this.dateSelected.getTime() && v.getCreatedAtDate().getTime() <= endOfDateSelected.getTime()) {
      //   this.todaysVitals.push(v)
      //     }
      if(v.getPastDate().getTime() >= this.dateSelected.getTime() && v.getPastDate().getTime() <= endOfDateSelected.getTime()) {
        this.todaysVitals.push(v)
      }    
        })
      })
    }

  //   async presentLoadingWithOptions() {
  //   const loading = await this.loadingController.create({
  //     cssClass: 'loading',
  //     message: 'Please wait...',
  //     duration: 5000,
  //     backdropDismiss: true
  //   });
  //   await loading.present();

  //   const { role, data } = await loading.onDidDismiss();
  //   console.log('Loading dismissed!');
  // }

  async calendarAddModal() {
    const modal = await this.modalController.create({
      component: CalendarAddComponent,
      cssClass: 'fullscreen',
      componentProps: {
        dateSelected: this.dateSelected.getTime()
      }
    });
    return await modal.present();
  }
}