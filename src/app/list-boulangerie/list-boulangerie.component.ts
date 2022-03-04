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
  constructor(public http: HttpClient,public modalController: ModalController, private commerceService: CommerceService,public routerOutlet: IonRouterOutlet) { }

  ngOnInit() {this.initializeItems();this.getProduitBoulangerie();this.cart = this.commerceService.getCart(); this.cartItemCount = this.commerceService.getCartItemCount();}
  getProduitBoulangerie() {
    this.commerceService.getProductBoulangerie().subscribe(
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
  initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota',
    ];
  }
  getItems(ev: any) {
    // Reset items back to all of the items
    this.getProduitBoulangerie();

    // set val to the value of the searchbar
    const val = ev.target.value;
     console.log(val);
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.produit.libel_produit = this.produit.filter((item) => {
        console.log(val.toLowerCase(),item.libel_produit.toLowerCase());
        return (item.libel_produit.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
