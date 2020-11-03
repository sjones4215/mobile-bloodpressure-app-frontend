import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddVitalsComponent } from '../add-vitals/add-vitals.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public modalController: ModalController) {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddVitalsComponent,
      cssClass: 'fullscreen'
    });
    return await modal.present();
  }
}


