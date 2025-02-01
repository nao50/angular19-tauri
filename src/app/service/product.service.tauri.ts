import { Injectable, resource, ResourceRef, signal } from '@angular/core';
import { fetch as fetch2 } from '@tauri-apps/plugin-http';

type Product = {
  title: string;
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  id = signal(5);

  constructor() { }

  productResource: ResourceRef<Product> = resource({
    request: () => this.id(), 
    loader: async ({ request: id, abortSignal }) => {
      const resp = await fetch2(`https://dummyjson.com/products/${id}`, {
        signal: abortSignal,
      });
      return resp.json() as Promise<Product>;
    },
  });

  getGeoLocation() {
  }
}
