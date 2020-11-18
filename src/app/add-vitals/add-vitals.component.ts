import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Vitals } from '../models/vitals';
import { VitalsService } from '../services/vitals.service';

@Component({
  selector: 'app-add-vitals',
  templateUrl: './add-vitals.component.html',
  styleUrls: ['./add-vitals.component.scss'],
})
export class AddVitalsComponent implements OnInit {
  newVitals: Vitals = new Vitals();
  constructor(public modalCtrl: ModalController, private vitalService: VitalsService) { }

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
    }
  }




