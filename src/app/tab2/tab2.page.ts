import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
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
  constructor(private vitalService: VitalsService, 
    public alertCtrl: AlertController, 
    private localStorageService: LocalStorageService, 
    private router: Router,
    private toastCtrl: ToastController) {}

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
    this.presentToast()
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


  async signOutModal() { 
    const confirm = await this.alertCtrl.create({  
      header: 'Logging out ?',  
      message: 'Are you sure you would like to logout ?',  
      buttons: [  
        {  
          text: 'Cancel',  
          role: 'cancel',  
          handler: () => {  
            console.log('Confirm Cancel');  
          }  
        },  
        {  
          text: 'Log-out', 
          role: 'confirm',
          handler: () => { 
            this.signOut()
          }  
        }  
      ]  
    });  
    await confirm.present();  
  }
  
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      this.retrieveAllVitals();
      event.target.complete();
    }, 1000);
  }

  signOut() {
    this.localStorageService.logoutUser();
    this.logoutToast()
    this.router.navigate([''])
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Vitals have been deleted.',
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  async logoutToast() {
    const toast = await this.toastCtrl.create({
      message: 'You have been logged out.',
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
}