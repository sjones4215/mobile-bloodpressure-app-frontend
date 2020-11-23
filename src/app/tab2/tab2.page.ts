import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { Vitals } from '../models/vitals';
import { LocalStorageService } from '../services/local-storage.service';
import { VitalsService } from '../services/vitals.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  vitals: Vitals[] = []
  vitalsByDate: Vitals[] = []
  date = new Date(1)
  constructor(private vitalService: VitalsService, public alertCtrl: AlertController, private localStorageService: LocalStorageService, private router: Router) {}

  ionViewWillEnter() {
    this.retrieveAllVitals();
  }

  retrieveAllVitals() {
  this.vitalService.getAllVitals().subscribe(data => {
      if (data) {
        this.vitals = data.vitals.map(x => Object.assign(new Vitals(), x))
      }
    })
  }

  
  deleteVitals(id:number) {
    this.vitalService.deleteVital(id).subscribe()
  }

 
  async showConfirm(num: number) { 
    const confirm = await this.alertCtrl.create({  
      header: 'Are you sure ?',  
      message: 'Are you sure you would like to delete these vitals?',  
      buttons: [  
        {  
          text: 'Cancel',  
          role: 'cancel',  
          handler: () => {  
            console.log('Confirm Cancel');  
          }  
        },  
        {  
          text: 'Confirm', 
          role: 'confirm',
          handler: (id:number = num) => { 
            this.deleteVitals(id)
          }  
        }  
      ]  
    });  
    await confirm.present();  
  } 

  signOut() {
    this.localStorageService.logoutUser();
    this.router.navigate([''])
  }
}