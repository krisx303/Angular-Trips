import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { docData, Firestore, getDoc } from '@angular/fire/firestore';
import { doc, setDoc } from '@firebase/firestore';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Roles } from '../models/roles';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  userRoles: Roles | null = null;
  constructor(public afs: Firestore, public router: Router, public auth: Auth) {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.userData = user;
        const ref = doc(this.afs, `users/${user.uid}`);
        docData(ref).subscribe((snap) => {
          this.userRoles = {
            manager: snap['manager'],
            admin: snap['admin'],
          };
          localStorage.setItem('roles', JSON.stringify(this.userRoles));
          router.navigate(['/home']);
        });
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', 'null');
        localStorage.setItem('roles', 'null');
      }
    });
  }

  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        this.auth.onAuthStateChanged((user) => {
          if (user) {
            this.router.navigate(['home']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  signUp(name: string, surranme: string, email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        this.setUpUserData(result.user, name, surranme);
        this.router.navigate(['home']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }

  get isManager(): boolean {
    const user = JSON.parse(localStorage.getItem('roles')!);
    return user !== null && user.manager;
  }

  get isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('roles')!);
    return user !== null && user.admin;
  }

  get userLabel(): string {
    const user = JSON.parse(localStorage.getItem('user')!);
    const roles = JSON.parse(localStorage.getItem('roles')!);
    if (user == null) {
      return '';
    }
    if (roles.admin) {
      return 'Admin';
    }
    if (roles.manager) {
      return 'Manager';
    }
    return user.email;
  }

  setUpUserData(user: any, name: string, surrname: string) {
    const userRef = doc(this.afs, 'users', user.uid);
    return setDoc(userRef, {
      name: name,
      surrname: surrname,
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      manager: false,
      admin: false,
    });
  }

  signOut() {
    return signOut(this.auth).then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('roles');
      this.router.navigate(['/sign-in']);
    });
  }
}
