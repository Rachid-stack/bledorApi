import { Component, OnInit } from '@angular/core';
import {CommerceService} from '../services/commerce.service';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss'],
})
export class ProduitComponent implements OnInit {
  cartItemCount: any;

  constructor( public http: HttpClient, private commerceService: CommerceService) { }

  ngOnInit() { this.cartItemCount = this.commerceService.getCartItemCount()}

}
