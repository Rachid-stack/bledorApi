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
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  cart: Product[] = [];
  receivedData: any;
  selectedMenuItems: MenuItemCart[] = [];
  dataA=[];
  idL=[];

  constructor(
    public alertCtrl: AlertController,
    private route: ActivatedRoute, public modalController: ModalController,private router: Router,
    private androidPermissions: AndroidPermissions,
    private callNumber: CallNumber,
    private device: Device,
    public toastController: ToastController,
    private iab: InAppBrowser, private commerceService: CommerceService
  ) {
  
    
  }
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
            //this.addCommande();
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log(data);
            this.commerceService.postLivraison(data).subscribe(
              response => {
                console.log(response);
              },
              error => {
                console.log(error);
              });
              this.addCommande();
          }
        }
      ]
    });
    (await prompt).present();
  }



  addToCart(menuItemSelected: { id: any; }) {
    this.receivedData.offers.forEach((element: { id: any; quantity: number; }) => {
      if (element.id === menuItemSelected.id) {
        element.quantity = element.quantity + 1;
      }
    });
  }
  addCommande(){
   
      this.cart.forEach(element => {
        const quantite=(document.getElementById('quantite_'+element.id) as HTMLInputElement).value;
        const prixT=(document.getElementById('prixTotal_'+element.id) as HTMLInputElement).value;
        const data_={id_prods:element.id,prix_prod:element.cout_unitaire,quantite:quantite,prix_total:prixT};
        this.dataA.push(data_);
      });
    let i=0;
    this.dataA.forEach(element => {
      this.commerceService.postCommande(this.dataA[i])
      .subscribe(
        response => {
          console.log(response);
          this.dismiss()
          this.presentToast();
        },
        error => {
          console.log(error);
        });
        i++;
    });
  
  }
  removeFromCart(menuItemSelected) {
    this.receivedData.offers.forEach(element => {
      if (element.id === menuItemSelected.id) {
        element.quantity = 0;
      }
    });
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }


  decreaseCartItem(product) {
    this.commerceService.decreaseProduct(product);
      }
    
      increaseCartItem(product) {
        this.commerceService.addProduct(product);
      }
    
      removeCartItem(product) {
        this.commerceService.removeProduct(product);
      }
    
      getTotal() {
        return this.cart.reduce((i, j) => i + j.cout_unitaire * j.nombre, 0 );
      }
    
      chekout() {
    
      }
}
