import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { ListPatisserieComponent } from './list-patisserie/list-patisserie.component';
import { ListFastFoodComponent } from './list-fast-food/list-fast-food.component';
import { ListGlacierComponent } from './list-glacier/list-glacier.component';
import { ListBoissonComponent } from './list-boisson/list-boisson.component';
import { ListSaladeComponent } from './list-salade/list-salade.component';
import { ListCharcuterieComponent } from './list-charcuterie/list-charcuterie.component';
import { ListBoulangerieComponent } from './list-boulangerie/list-boulangerie.component';
import { ListVienoiserieComponent } from './list-vienoiserie/list-vienoiserie.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ProduitComponent } from './produit/produit.component';
import { PanierComponent } from './panier/panier.component';

const routes: Routes = [
  { path: '', redirectTo: '/acceuil', pathMatch: 'full' },
  
  { path: 'listFastFood', component: ListFastFoodComponent },
  { path: 'listBoisson', component: ListBoissonComponent },
  { path: 'listSalade', component: ListSaladeComponent },
  { path: 'listCharcuterie', component: ListCharcuterieComponent },
  { path: 'listGlacier', component: ListGlacierComponent },
  { path: 'listVienoiserie', component: ListVienoiserieComponent },
  { path: 'listBoulangerie', component: ListBoulangerieComponent },
  { path: 'listPatisserie', component: ListPatisserieComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'acceuil', component: AcceuilComponent },
  { path: 'produit', component: ProduitComponent },
  { path: 'Panier', component: PanierComponent },
  {
    path: 'details-product',
    loadChildren: () => import('./details-product/details-product.module').then( m => m.DetailsProductPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
