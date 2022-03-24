import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommerceService} from '../services/commerce.service';
import {BehaviorSubject, Observable} from 'rxjs';
import { IonRouterOutlet } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { DetailsProductPage } from '../details-product/details-product.page';
import { ListFastFoodComponent } from '../list-fast-food/list-fast-food.component';
import { DetailsComponent } from '../details/details.component';
@Component({
  selector: 'app-list-boisson',
  templateUrl: './list-boisson.component.html',
  styleUrls: ['./list-boisson.component.scss'],
})
export class ListBoissonComponent implements OnInit {
  cartItemCount: BehaviorSubject<number>;
  cart: any[];
  produitBc: any;
  produitFr: any;
  produitEau: any;
  type: string;

  constructor(public http: HttpClient,public modalController: ModalController, private commerceService: CommerceService,public routerOutlet: IonRouterOutlet) { }

  ngOnInit() {this.type = 'boissonChaude';this.cart = this.commerceService.getCart(); this.cartItemCount = this.commerceService.getCartItemCount();this.produitBc=JSON.parse(localStorage.getItem('dataBoissonChaude'));this.produitFr=JSON.parse(localStorage.getItem('dataBoissonFraiche'));this.produitEau=JSON.parse(localStorage.getItem('dataEau'));}
  addToCart(product) {
    // this.animateCss('tada');
     this.commerceService.addProduct(product);
 }

 segmentChanged(ev: any) {
  console.log('Segment changed', ev);
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
