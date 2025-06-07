import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { addDoc } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonServices {

  private isLoggedUserSubject = new BehaviorSubject<boolean>(false);
  isUserLoggedIn = this.isLoggedUserSubject.asObservable();

  constructor(private fireBase: Firestore, private router: Router) {}

  getRegisteredUsers() {
    const usersCollection = collection(this.fireBase, 'Users');
    return collectionData(usersCollection, { idField: 'id' }).subscribe(
      (users) => {
        console.log('Registered Users:', users);
      }
    );
  }

  addUser(userData: any) {
    const usersCollection = collection(this.fireBase, 'Users');
    return addDoc(usersCollection, userData);
  }

  loginUser(userData: any) {
    const usersCollection = collection(this.fireBase, 'Users');
    return collectionData(usersCollection, { idField: 'id' }).subscribe(
      (users) => {
        const user = users.find(
          (u: any) =>
            u.email === userData.email && u.password === userData.password
        );
        if (user) {
          console.log('User logged in:', user);
          this.router.navigate(['/dashboard']);
          this.isLoggedUserSubject.next(true);
          return user;
        } else {
          this.isLoggedUserSubject.next(false);
          console.error('Invalid email or password');
          return null;
        }
      }
    );
  }
}
