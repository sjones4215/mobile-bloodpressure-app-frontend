import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Vitals } from '../models/vitals';
import { LocalStorageService } from '../services/local-storage.service';
import { VitalsService } from '../services/vitals.service';

@Component({
  selector: 'app-add-vitals',
  templateUrl: './add-vitals.component.html',
  styleUrls: ['./add-vitals.component.scss'],
})
export class AddVitalsComponent implements OnInit {
  newVitals: Vitals = new Vitals();

 
  constructor(
    public modalCtrl: ModalController, 
    private vitalService: VitalsService, 
    private toastCtrl: ToastController
  ) { 
    const format = 'MM/dd/yyyy';
    const myDate = new Date()
    const locale = 'en-US';
    const formattedDate = formatDate(myDate, format, locale);
    console.log(formattedDate)
    this.newVitals.past_date = formattedDate
  }

  ngOnInit() {}

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  saveVitals() {
    this.vitalService.createVitals(this.newVitals).subscribe()
    this.presentToast()
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