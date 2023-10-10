import { Injectable } from '@angular/core';
import { first, from, map, Observable } from 'rxjs';
import { ProfileModel } from 'app/5.models/profile';
import { AuthService } from './auth/auth.service';
import { convertSnaps } from './db-utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Blog } from '../5.models/blog';
import { Mainpage } from '../5.models/mainpage';
import { Auth } from '@angular/fire/auth';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  DocumentReference,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private profileItems: Observable<ProfileModel[]>;
  private userId: string;
  private email: string;

  constructor(
    public firestore: Firestore,
    public auth: Auth,
    private snack: MatSnackBar
  ) {
    this.userId = this.auth.currentUser.uid;
  }

  getAll(): Observable<ProfileModel[]> {
    // query must be set to order descending
    const collectionRef = collection(this.firestore, 'profile');
    return collectionData(collectionRef, { idField: 'id' }) as Observable<
      ProfileModel[]
    >;
  }

  update(profile: ProfileModel) {
    const ref = doc(this.firestore, 'profile', profile.id ) as DocumentReference<ProfileModel>;
    updateDoc(ref, profile)
      .then(() => {
        this.snack.open(
          'Profile address has been updated to your profile ...',
          'OK',
          {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: 'bg-danger',
          }
        );
      })
      .catch((error) => {
        this.snack.open(
          'Profile address was NOT updated to your profile ...',
          'OK',
          {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: 'bg-danger',
          }
        );
      })
      .finally();
  }

  async add(userId: string, profile: ProfileModel) {
    try {
      const profile_1 = await addDoc(collection(this.firestore, 'profile'), profile);
      this.snack.open(
        'Profile address has been updated to your profile ...',
        'OK',
        {
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: 'bg-danger',
          duration: 3000,
        }
      );
    } catch (error) {
      this.snack.open('Error adding new profile definition ... ', 'OK', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: 'bg-danger',
        duration: 3000,
      });
    }
  }

  delete(id: string) {
    const ref = doc(this.firestore, 'profile', id);
    deleteDoc(ref);
  }
}
