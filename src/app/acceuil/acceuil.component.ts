import { Component, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
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
  constructor() { }
  slidesDidLoad(slides: IonSlides): void {
    slides.startAutoplay();
  }
  ngOnInit() {}

}