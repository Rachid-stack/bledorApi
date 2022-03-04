import { Injectable } from '@angular/core';
import {BehaviorSubject,Observable,of,throwError} from 'rxjs';
import  {HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import {catchError,map, tap} from 'rxjs/operators';
import { Livraison } from '../models/item';
const httpOptions={
  headers: new HttpHeaders({'content-type': 'application/json'})
};
const basePatUrl = 'http://localhost:8080/api/ListProduitPatisserie';
const baseBoulUrl = 'http://localhost:8080/api/ListProduitBoulangerie';
const baseFastUrl = 'http://localhost:8080/api/ListProduitFastfood';
const baseViennUrl = 'http://localhost:8080/api/ListProduitViennoiserie';
const baseGlacUrl = 'http://localhost:8080/api/ListProduitGlacier';
const baseCommandeUrl = 'http://localhost:8080/api/livraisonProd';
const baseLivraisonUrl = 'http://localhost:8080/api/livraison';
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
  getProductBoulangerie(){return this.http.get(baseBoulUrl);}
  getProductGlacier(){ return this.http.get(baseGlacUrl);}
  getProductViennoiserie(){ return this.http.get(baseViennUrl);}
  getProductFastFood(){ return this.http.get(baseFastUrl);}
  postCommande(data: any){
    return this.http.post(baseCommandeUrl,data);
  }
  postLivraison(data: any){
    return this.http.post(baseLivraisonUrl,data);
  }
  addProduct(product) {
    let added = false;
    for (const p of this.cart) {
      if (p.id === product.id) {
        p.nombre += 1;
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
        p.nombre -= 1;
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
