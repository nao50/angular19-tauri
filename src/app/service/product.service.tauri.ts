import { Injectable, resource, ResourceRef, signal } from '@angular/core';
import { fetch as fetch2 } from '@tauri-apps/plugin-http';
import {
  checkPermissions,
  requestPermissions,
  getCurrentPosition,
  watchPosition
} from '@tauri-apps/plugin-geolocation'

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

  async getCurrentPosition(): Promise<GeolocationPosition | undefined>{
    let permissions = await checkPermissions()
    if (permissions.location === 'prompt' || permissions.location === 'prompt-with-rationale') {
      permissions = await requestPermissions(['location'])
    }

    if (permissions.location === 'granted') {
      return getCurrentPosition()
    }
    return undefined
  }
}
