import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, ModalController, PickerController, ToastController } from '@ionic/angular';
import { Vitals } from '../models/vitals';
import { VitalsService } from '../services/vitals.service';
import { formatDate } from "@angular/common";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calendar-add',
  templateUrl: './calendar-add.component.html',
  styleUrls: ['./calendar-add.component.scss'],
})
export class CalendarAddComponent implements OnInit {

  dateSelected: Date
  newVitals: Vitals = new Vitals()
  @ViewChild('mydt') mydt: IonDatetime;
  
  constructor(
    private modalCtrl: ModalController,
    private vitalService: VitalsService,
    private toastCtrl: ToastController,
  ) {} 

  ngOnInit() {

    // const locale = 'en-US';
    // const formattedDate = formatDate(myDate, format, locale);
    // console.log(formattedDate)
    this.newVitals.past_date =  this.dateSelected.toISOString()
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  saveVitals() {
    if (this.newVitals.past_date === '') {
      this.newVitals.past_date 
      this.vitalService.createVitals(this.newVitals).subscribe()
      console.log(this.newVitals.past_date)
      this.presentToast()
    } else {
      this.vitalService.createVitals(this.newVitals).subscribe()
      console.log(this.newVitals.past_date)
      this.presentToast()
    }
  }

    async presentToast() {
      const toast = await this.toastCtrl.create({
        message: 'Vitals have been saved.',
        position: 'top',
        duration: 2000
      });
      toast.present();
    }
}
