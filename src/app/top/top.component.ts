import { Component, inject, OnInit } from '@angular/core';
import { Injectable, resource, ResourceRef, signal } from '@angular/core';
import { ProductService } from '../service/product.service';
import { environment } from '../../environments/env';

type Product = {
  title: string;
};

@Component({
  selector: 'app-top',
  imports: [],
  templateUrl: './top.component.html',
  styleUrl: './top.component.css'
})
export class TopComponent implements OnInit{
  productService = inject(ProductService);
  env = environment.production

  ngOnInit() {
    this.productService.getGeoLocation();
  }
}
