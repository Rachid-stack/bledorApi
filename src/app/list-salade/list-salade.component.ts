import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommerceService} from '../services/commerce.service';
import {BehaviorSubject, Observable} from 'rxjs';
import { IonRouterOutlet } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { DetailsProductPage } from '../details-product/details-product.page';
import { DetailsComponent } from '../details/details.component';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-list-salade',
  templateUrl: './list-salade.component.html',
  styleUrls: ['./list-salade.component.scss'],
})
export class ListSaladeComponent implements OnInit {

  produit :any;
  cartItemCount: BehaviorSubject<number>;
  cart: any;
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
  constructor(public http: HttpClient,public modalController: ModalController, private commerceService: CommerceService,public routerOutlet: IonRouterOutlet) { }

  ngOnInit() {this.produit=JSON.parse(localStorage.getItem('dataSalade'));this.cart = this.commerceService.getCart(); this.cartItemCount = this.commerceService.getCartItemCount();}
  addToCart(product) {
    // this.animateCss('tada');
     this.commerceService.addProduct(product);
 }
  async presentModal() {
    const modal = await this.modalController.create({
      component: DetailsComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }
}
