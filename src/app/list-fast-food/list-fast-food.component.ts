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
  selector: 'app-list-fast-food',
  templateUrl: './list-fast-food.component.html',
  styleUrls: ['./list-fast-food.component.scss'],
})
export class ListFastFoodComponent implements OnInit {
  produit :any;
  cartItemCount: BehaviorSubject<number>;
  cart: any;
  type: string;
  produitFc: any;
  produitFb: any;
  produitFsw: any;
  produitFp: any;
  constructor(public http: HttpClient,public modalController: ModalController, private commerceService: CommerceService,public routerOutlet: IonRouterOutlet) { }

  ngOnInit() {this.type = 'pizzas';this.produitFc=JSON.parse(localStorage.getItem('dataCuisine'));this.produitFb=JSON.parse(localStorage.getItem('dataBerger'));
  this.produitFsw=JSON.parse(localStorage.getItem('dataSandWish'));this.produitFp=JSON.parse(localStorage.getItem('dataPizza'));
  this.cart = this.commerceService.getCart(); this.cartItemCount = this.commerceService.getCartItemCount();}

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
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    console.log(this.produitFc);
  }
}
