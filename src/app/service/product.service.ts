import { Injectable, resource, ResourceRef, signal } from '@angular/core';

type Product = {
  title: string;
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  id = signal(1);

  constructor() { }

  productResource: ResourceRef<Product> = resource({
    request: () => this.id(), 
    loader: async ({ request: id, abortSignal }) => {
      const resp = await fetch(`https://dummyjson.com/products/${id}`, {
        signal: abortSignal,
      });
      return resp.json() as Promise<Product>;
    },
  });

  getCurrentPosition(): Promise<GeolocationPosition | undefined>{
    const positionOptions: PositionOptions = {
      enableHighAccuracy: true,
      maximumAge: 0, // Not use a cached position
      timeout: 100000 // ms
    };

    return new Promise(
      (
        resolve: (pos: GeolocationPosition) => void,
        reject: (err: GeolocationPositionError) => void
      ) => {
        if (navigator.geolocation) {
          const watchId = navigator.geolocation.getCurrentPosition(resolve, reject, positionOptions);
        }
      }
    );
  }
}
