import { Injectable, resource, ResourceRef, signal } from '@angular/core';

type Product = {
  title: string;
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  id = signal(1);
  positionOptions: PositionOptions = {
    enableHighAccuracy: true,
    maximumAge: 0, // Not use a cached position
    timeout: 100000 // ms
  };

  constructor() { }

  productResource: ResourceRef<Product> = resource({
    request: () => this.id(), 
    loader: async ({ request: id, abortSignal }) => {
      const resp = await fetch(`https://dummyjson.com/products/${id}`, {
        signal: abortSignal,
      });
      // console.log(resp.json())
      return resp.json() as Promise<Product>;
    },
  });

  getGeoLocation() {
    let watchId;

    const onSuccess: PositionCallback = (pos: any) => {
      console.log('pos:', pos)
      // observer.next(pos);
    };

    const onError: PositionErrorCallback | any = () => {
      // observer.error(error);
    };

    if ('geolocation' in navigator) {
      watchId = navigator.geolocation.watchPosition(onSuccess, onError, this.positionOptions);
    } else {
      onError('Geolocation not available');
    }
  }
}
