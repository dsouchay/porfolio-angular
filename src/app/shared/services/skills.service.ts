import { Injectable, Injector } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { ISkill } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  protected firestore: Firestore;
  constructor(
    protected injector: Injector
  ) {
    this.firestore = injector.get(Firestore);
  }

  getSkills(): Observable<ISkill[]> {
    const skillsRef = collection( this.firestore, 'skills' );
    return collectionData( skillsRef, { idField: 'id' } ).pipe(map( resp => {
      resp.sort( (a,b) => a['position'] - b['position'] );
      return resp;
    } ) ) as Observable<ISkill[]>;
  }

}
