import { Component, NgZone } from '@angular/core';
import { Platform, ToastController,MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import {CommerceService} from './services/commerce.service';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  cartItemCount: BehaviorSubject<number>;
  static produitV: any;
  static  produitG: any;
  static produitP: any;
  static produitCuisine: any;
  static produitChandw: any;
  static produitBerg: any;
  static produitPizz: any;
  static produitPain: Object;
  static produitPainSp: Object;
  static produitSalade: Object;
  static produitCharcuterie: Object;
  static produitBchaude: Object;
  static produitBfraiche: Object;
  static produitEau: Object;
  constructor(
    private platform: Platform,
    private menu:MenuController,
    private toastCtrl: ToastController,
    private router: Router,
    private zone: NgZone,
    public http: HttpClient, private commerceService: CommerceService,
  ) {
    this.initializeApp();
    this.cartItemCount = this.commerceService.getCartItemCount()
  }
  ngOnInit() { 
     this.getProduitViennoiserie(); 
     this.getProduitFastFoodCuisine();
     this.getProduitFastFoodSandwish();
     this.getProduitFastFoodBerger();
     this.getProduitFastFoodPizzas();
      this.getProduitPatisserie();
       this.getProduitGlacier();
     this.getProduitPain();
     this.getProduitPainSpeciaux();
     this.getProduitEau();
     this.getProduitBoissonChaude();
     this.getProduitBoissonFr();
     this.getProduitCharcuterie();
     this.getProduitSalade();
    }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  openEnd() {
    this.menu.open('end');
  }
  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.subscribeBackButton();
    });
  }

  subscribeBackButton() {
    let lastTimeBackPress = 0;
    const timePeriodToExit = 2000;

    this.platform.backButton.subscribeWithPriority(1, () => {
      if ((this.router.isActive('', true) && this.router.url === '') ||
        (this.router.isActive('/tabs/tab1', true) && this.router.url === '/tabs/tab1')) {
        if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
          navigator['app'].exitApp();
        } else {
          this.presentToast('Presiona nuevamente para salir.', timePeriodToExit);
          lastTimeBackPress = new Date().getTime();
        }
      } else {
        this.zone.run(async () => {
          await this.router.navigateByUrl('/tabs/tab1');
        });
      }
    });
  }
  getProduitPatisserie():void{
    this.commerceService.getProductPatisserie().subscribe(
      data=>{
        localStorage.setItem('dataPatisserie', JSON.stringify(data));
        console.log(data);
    },error=>{
      console.log(error);
    })
  }
  getProduitGlacier() {
    this.commerceService.getProductGlacier().subscribe(
      data=>{
        localStorage.setItem('dataGlacier', JSON.stringify(data));
      console.log(data);
    },error=>{
      console.log(error);
    })
  }
  getProduitFastFoodPizzas() {
    this.commerceService.getProductFastFoodPizza().subscribe(
      data=>{
      localStorage.setItem('dataPizza', JSON.stringify(data));
  
      console.log(data);
    },error=>{
      console.log(error);
    })
  }
  getProduitFastFoodBerger(){
    this.commerceService.getProductFastFoodBerger().subscribe(
      data=>{
      localStorage.setItem('dataBerger', JSON.stringify(data));
   
      console.log(data);
    },error=>{
      console.log(error);
    })
  }
  getProduitFastFoodSandwish() {
    this.commerceService.getProductFastFoodSandWish().subscribe(
      data=>{
        localStorage.setItem('dataSandWish', JSON.stringify(data));
        console.log(data);
    },error=>{
      console.log(error);
    })
  }
  getProduitFastFoodCuisine() {
    this.commerceService.getProductFastFoodCuisine().subscribe(
      data=>{
        localStorage.setItem('dataCuisine', JSON.stringify(data));
        console.log(data);
    },error=>{
      console.log(error);
    })
  }
  getProduitPain() {
    this.commerceService.getProductPain().subscribe(
      data=>{
        localStorage.setItem('dataPain', JSON.stringify(data));
        console.log(data);
    },error=>{
      console.log(error);
    })
  }
  getProduitPainSpeciaux() {
    this.commerceService.getProductPainSpeciale().subscribe(
      data=>{
        // To remove a value/item from localStorage
        localStorage.setItem('dataPainSp', JSON.stringify(data));
        console.log(data);
    },error=>{
      console.log(error);
    })
  }
  getProduitSalade() {
    this.commerceService.getProductSalade().subscribe(
      data=>{
        localStorage.setItem('dataSalade', JSON.stringify(data));
      
        console.log(data);
    },error=>{
      console.log(error);
    })
  }
  getProduitCharcuterie() {
    this.commerceService.getProductCharcuterie().subscribe(
      data=>{
      localStorage.setItem('dataCharcuterie', JSON.stringify(data));
      console.log(data);
    },error=>{
      console.log(error);
    })
  }
  getProduitBoissonChaude() {
    this.commerceService.getProductBoissonChaude().subscribe(
      data=>{
        localStorage.setItem('dataBoissonChaude', JSON.stringify(data));
      console.log(data);
    },error=>{
      console.log(error);
    })
  }
  getProduitBoissonFr() {
    this.commerceService.getProductBoissonFraiche().subscribe(
      data=>{
      localStorage.setItem('dataBoissonFraiche', JSON.stringify(data));
      console.log(data);
    },error=>{
      console.log(error);
    })
  }
  getProduitEau() {
    this.commerceService.getProductEau().subscribe(
      data=>{
      localStorage.setItem('dataEau', JSON.stringify(data));
      console.log(data);
    },error=>{
      console.log(error);
    })
  }
  getProduitViennoiserie() {
    this.commerceService.getProductViennoiserie().subscribe(
      data=>{
      localStorage.setItem('dataViennoiserie', JSON.stringify(data));
      console.log(data);
    },error=>{
      console.log(error);
    })
  }
  async presentToast(msg: string, delay) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: delay,
      position: 'bottom',
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
            console.log('Close clicked');
          }
        }
      ]
    });
    await toast.present();
  };  
}
