import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  Firestore,
  getDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HistoryItem } from '../models/history-item';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  items$: Observable<HistoryItem[]>;
  userID: string | undefined;

  constructor(private firestore: Firestore, authService: AuthService) {
    authService.auth.onAuthStateChanged((user) => {
      this.userID = user?.uid;
      const ref = collection(firestore, `users/${this.userID}/trips`);
      this.items$ = collectionData(ref, { idField: 'id' }) as Observable<
        HistoryItem[]
      >;
    });
    const ref = collection(firestore, `users/${this.userID}/trips`);
    this.items$ = collectionData(ref, { idField: 'id' }) as Observable<
      HistoryItem[]
    >;
  }

  getItems(): Observable<HistoryItem[]> {
    return this.items$;
  }

  async getItemByID(id: string): Promise<HistoryItem | undefined> {
    const docRef = doc(this.firestore, `users/${this.userID}/trips`, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as HistoryItem;
    } else {
      return undefined;
    }
  }
}
