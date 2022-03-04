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
  selector: 'app-list-vienoiserie',
  templateUrl: './list-vienoiserie.component.html',
  styleUrls: ['./list-vienoiserie.component.scss'],
})
export class ListVienoiserieComponent implements OnInit {
  produit :any;
  cartItemCount: BehaviorSubject<number>;
  cart: any;
  constructor(public http: HttpClient,public modalController: ModalController, private commerceService: CommerceService,public routerOutlet: IonRouterOutlet) { }

  ngOnInit() {  this.getProduitViennoiserie();this.cart = this.commerceService.getCart(); this.cartItemCount = this.commerceService.getCartItemCount();}
  getProduitViennoiserie() {
    this.commerceService.getProductViennoiserie().subscribe(
      data=>{
      this.produit=data;
      console.log(data);
    },error=>{
      console.log(error);
    })
  }
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
