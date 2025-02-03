import { Component, inject, OnInit } from '@angular/core';
import { Injectable, resource, ResourceRef, signal } from '@angular/core';
import { ProductService } from '../service/product.service';
import { environment } from '../../environments/env';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top',
  imports: [CommonModule],
  templateUrl: './top.component.html',
  styleUrl: './top.component.css'
})
export class TopComponent implements OnInit{
  productService = inject(ProductService);
  pos?: GeolocationPosition
  env = environment.production

  ngOnInit() {
    this.getCurrentPosition();
  }

  async getCurrentPosition() {
    this.pos = await this.productService.getCurrentPosition();
  }
}
