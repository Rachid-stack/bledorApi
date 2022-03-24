import { Component, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { AppComponent } from '../app.component';
import {CommerceService} from '../services/commerce.service';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss'],
})
export class AcceuilComponent implements OnInit {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  slideOptions = {
    initialSlide: 1,
    speed: 400,
  };
  cartItemCount: any;
  constructor( public http: HttpClient, private commerceService: CommerceService,) { }
  slidesDidLoad(slides: IonSlides): void {
    slides.startAutoplay();
  }
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true
   };
  ngOnInit() {
    this.cartItemCount = this.commerceService.getCartItemCount()
  }

}