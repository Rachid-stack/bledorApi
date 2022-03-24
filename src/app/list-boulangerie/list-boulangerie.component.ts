import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommerceService} from '../services/commerce.service';
import {BehaviorSubject, Observable} from 'rxjs';
import { IonRouterOutlet } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { DetailsProductPage } from '../details-product/details-product.page';
import { ListFastFoodComponent } from '../list-fast-food/list-fast-food.component';
import { DetailsComponent } from '../details/details.component';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-list-boulangerie',
  templateUrl: './list-boulangerie.component.html',
  styleUrls: ['./list-boulangerie.component.scss'],
})
export class ListBoulangerieComponent implements OnInit {
  searchQuery: string = '';
  items: string[];
  produit :any;
  cartItemCount: BehaviorSubject<number>;
  cart: any;
  produitP: any;
  type: string;
  produitPs: any;

  constructor(public http: HttpClient,public modalController: ModalController, private commerceService: CommerceService,public routerOutlet: IonRouterOutlet) { }

  ngOnInit() {

    this.type = 'pain';this.produitP=JSON.parse(localStorage.getItem('dataPain'));this.produitPs=JSON.parse(localStorage.getItem('dataPainSp'));this.cart = this.commerceService.getCart(); this.cartItemCount = this.commerceService.getCartItemCount()}

  addToCart(product) {
    // this.animateCss('tada');
     this.commerceService.addProduct(product);
 }
 segmentChanged(ev: any) {
  console.log('Segment changed', ev);
  console.log(this.produitPs,this.produitP);
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
  initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota',
    ];
  }
  
}
