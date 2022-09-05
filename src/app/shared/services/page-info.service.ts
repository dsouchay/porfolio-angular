import { Injectable, Injector } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { IPage } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PageInfoService {
  protected firestore: Firestore;
  constructor(
    protected injector: Injector
  ) {
    this.firestore = injector.get(Firestore);
  }
  getPageInfo(): Observable<IPage[]> {
    const pageRef = collection( this.firestore, 'page' );
    return collectionData( pageRef, { idField: 'id' } ).pipe(map( resp => {
      return resp;
    } ) ) as Observable<IPage[]>;
  }
}
