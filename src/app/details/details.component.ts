import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  MenuItem, MenuItemCart } from '../models/item';
import { ToastController, PopoverController, Platform,AlertController, LoadingController } from '@ionic/angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Device } from '@ionic-native/device/ngx';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser/ngx';
import { ModalController } from '@ionic/angular';
import { CommerceService, Product } from '../services/commerce.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
interface dataLiv {
  id: number;
  nom: string;
}
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  cart= [];
  receivedData: any;
  selectedMenuItems: MenuItemCart[] = [];
  dataA=[];
  idL:any;
  dataC: any;
  dataLv: Observable<dataLiv>;
  constructor(
    public alertCtrl: AlertController,
    private route: ActivatedRoute, public modalController: ModalController,private router: Router,
    private androidPermissions: AndroidPermissions,
    private callNumber: CallNumber,
    private device: Device,
    public toastController: ToastController,
    private iab: InAppBrowser, private commerceService: CommerceService) {}
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
    this.cart = this.commerceService.getCart();
    });
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Votre commande a eté effectuer avec success.',
      duration: 4000,
    });
    toast.present();
  }
  async showPrompt() {
    const prompt = this.alertCtrl.create({
      header: 'Comfirmation',
      message: "Veuillez remplir ces champ",
      inputs: [
        {
          name: 'nom_c',
          placeholder: 'Nom'
        },
        {
          name: 'prenom_c',
          placeholder: 'Prenom'
        },
        {
          name: 'telephone',
          placeholder: 'Telephone'
        },
       
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log(data);
            this.dataC=data;
          }
        },
        {
          text: 'Save',
          handler: data => {
              this.addLivraison(data);
              this.dismiss();
              this.router.navigate(['/produit']);
              this.presentToast();
          }

        }
      ]
    });
    (await prompt).present();
  }



  addToCart(menuItemSelected: { id: any; }){
    this.receivedData.offers.forEach((element: { id: any; quantity: number; }) => {
      if (element.id === menuItemSelected.id) {
        element.quantity = element.quantity + 1;
      }
    });
  }
  addCommande(_idL){
    this.cart.forEach(element => {
      const quantite=(document.getElementById('quantite_'+element.id) as HTMLInputElement).value;
      const quantites=parseInt(quantite);
      const prixTotal=quantites*element.prix;
      const data_={id_prods:element.id,id_livraison:_idL,prix_prod:element.prix,quantite:quantite,prix_total:prixTotal};
      this.dataA.push(data_);
    }); 
    let i=0;
    this.dataA.forEach(element => {
      this.commerceService.postCommande(this.dataA[i])
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
        i ++;
    });
  }
  addLivraison(data: any){
    this.commerceService.postLivraison(data).subscribe(
      (response:any)=> {
       console.log(response);
       this.idL=response.id; 
       this.addCommande(response.id);
      },
      error => {
        console.log(error);
      });
  }
  removeFromCart(menuItemSelected){
    this.receivedData.offers.forEach(element =>{
      if (element.id === menuItemSelected.id){
        element.quantity = 0;
      }
    });
  }
  dismiss(){
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  decreaseCartItem(product){
    this.commerceService.decreaseProduct(product);
  }
  increaseCartItem(product){
        this.commerceService.addProduct(product);
  }
  removeCartItem(product){
        this.commerceService.removeProduct(product);
  }
  getTotal(){
        return this.cart.reduce((i, j) => i + j.prix * j.nombre, 0);
  }
  chekout(){
    
  }
}
