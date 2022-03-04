import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsComponent } from './details/details.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ProduitComponent } from './produit/produit.component';
import { PanierComponent } from './panier/panier.component';
import { ListPatisserieComponent } from './list-patisserie/list-patisserie.component';
import { ListFastFoodComponent } from './list-fast-food/list-fast-food.component';
import { ListGlacierComponent } from './list-glacier/list-glacier.component';
import { ListBoulangerieComponent } from './list-boulangerie/list-boulangerie.component';
import { ListVienoiserieComponent } from './list-vienoiserie/list-vienoiserie.component';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Device } from '@ionic-native/device/ngx';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser/ngx';
import { HttpClientModule } from '@angular/common/http';
import { CommerceService } from './services/commerce.service';

@NgModule({
  declarations: [AppComponent,ListBoulangerieComponent,ListFastFoodComponent,ListVienoiserieComponent,ListGlacierComponent,AcceuilComponent,PanierComponent,ProduitComponent, DetailsComponent,ListFastFoodComponent,ListPatisserieComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    
    AndroidPermissions,
    CallNumber,
    Device,
    InAppBrowser,
    CommerceService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
