import { Injectable, Injector } from '@angular/core';
import { collection, Firestore, collectionData } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { IEducation } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  protected firestore: Firestore;
  constructor(
    protected injector: Injector
  ) {
    this.firestore = injector.get(Firestore);
  }
  getEducations(): Observable<IEducation[]> {
    const skillsRef = collection( this.firestore, 'education' );
    return collectionData( skillsRef, { idField: 'id' } ).pipe(map( resp => {
      resp.sort( (a,b) => a['position'] - b['position'] );
      return resp;
    } ) ) as Observable<IEducation[]>;
  }
}
