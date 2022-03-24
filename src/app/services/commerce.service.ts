import { Injectable } from '@angular/core';
import {BehaviorSubject,Observable,of,throwError} from 'rxjs';
import  {HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import {catchError,map, tap} from 'rxjs/operators';
import { Livraison } from '../models/item';
const httpOptions={
  headers: new HttpHeaders({'content-type': 'application/json'})
};
const basePatUrl = 'http://localhost:8080/api/ListProduitPatisserie';
const baseBoulPainUrl = 'http://localhost:8080/api/ListProduitPain';
const basePainUrl = 'http://localhost:8080/api/ListProduitPainSpeciale';
const baseFastPizzaUrl = 'http://localhost:8080/api/ListProduitFastfoodPizzas';
const baseFastSandUrl = 'http://localhost:8080/api/ListProduitFastfoodSandWish';
const baseFastBergerUrl = 'http://localhost:8080/api/ListProduitFastfoodBerger';
const baseFastCuisUrl = 'http://localhost:8080/api/ListProduitFastfoodCuisine';
const baseViennUrl = 'http://localhost:8080/api/ListProduitVernoiserie';
const baseGlacUrl = 'http://localhost:8080/api/ListProduitGlacier';
const baseCommandeUrl = 'http://localhost:8080/api/livraisonProd';
const baseLivraisonUrl = 'http://localhost:8080/api/livraison';
const baseSaladeUrl = 'http://localhost:8080/api/ListProduitSalade';
const baseCharcuterieUrl = 'http://localhost:8080/api/ListProduitCharcuterie';
const baseBoissonChUrl = 'http://localhost:8080/api/ListProduitBoissonChaude';
const baseEauUrl = 'http://localhost:8080/api/ListProduitEauxKmg';
const baseBoissonFrUrl = 'http://localhost:8080/api/ListProduitBoissonFraiche';
export interface Product {
  cout_unitaire: any;
  id: number;
  nom: string;
  prix: number;
  nombre: number;
}
@Injectable({
  providedIn: 'root'
})
export class CommerceService {

data: Product[] = [];
  private cart = [];
  private cartItemCount = new BehaviorSubject(0);
  constructor(private http:HttpClient) { }
  private handleError<T>(operation='operation',result?:T){
    return (error:any):Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
  getCart() { return this.cart; }
  getCartItemCount() { return this.cartItemCount; }
  getProductPatisserie(){return this.http.get(basePatUrl);}
  getProductPain(){
    return this.http.get(baseBoulPainUrl);
  }
  getProductPainSpeciale(){
    return this.http.get(basePainUrl);
  }
  getProductGlacier(){ return this.http.get(baseGlacUrl);}
  getProductSalade(){ return this.http.get(baseSaladeUrl);}
  getProductEau(){ return this.http.get(baseEauUrl);}
  getProductBoissonChaude(){ return this.http.get(baseBoissonChUrl);}
  getProductBoissonFraiche(){ return this.http.get(baseBoissonFrUrl);}
  getProductCharcuterie(){ return this.http.get(baseCharcuterieUrl);}
  getProductViennoiserie(){ return this.http.get(baseViennUrl);}
  getProductFastFoodCuisine() {
    return this.http.get(baseFastCuisUrl);
  }
  getProductFastFoodSandWish() {
    return this.http.get(baseFastSandUrl);
  }
  getProductFastFoodBerger() {
    return this.http.get(baseFastBergerUrl);
  }
  getProductFastFoodPizza() {
    return this.http.get(baseFastPizzaUrl);
  }
  postCommande(data: any){
    return this.http.post(baseCommandeUrl,data);
  }
  postLivraison(data: any){
    return this.http.post(baseLivraisonUrl,data);
  }
  addCommande(data: any): Observable<any> {
    return this.http.post<any>(baseCommandeUrl, data, httpOptions).pipe(
      tap((s: any) => console.log(`added Commande w/ id=${s.id}`)),
      catchError(this.handleError<any>('addCommande'))
    );
  }
  addLivraison(data: any): Observable<any> {
    return this.http.post<any>(baseLivraisonUrl, data, httpOptions).pipe(
      tap((s: any) => console.log(`added liraison w/ id=${s.id}`)),
      catchError(this.handleError<any>('add commande'))
    );
  }
  addProduct(product) {
    let added = false;
    for (const p of this.cart) {
      if (p.id === product.id) {
        ++p.nombre;
        added = true;
        break;
      }
    }
    if (!added) {
        this.cart.push(product);
      }
    this.cartItemCount.next(this.cartItemCount.value + 1);
    console.log(product);
  }

  decreaseProduct(product) {
    for (const [ index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        --p.nombre;
        if (p.nombre === 0) {
        this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removeProduct(product) {
    for (const [ index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.nombre);
        this.cart.splice(index, 1);
      }
    }
  }

}
