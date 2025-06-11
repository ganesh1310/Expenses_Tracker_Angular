import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AngularFireStorage } from '@angular/fire/compat/storage';


const firebaseConfig = {
  apiKey: "AIzaSyCr4eB1e8qNxx4qA2iK0K-Y4ju0uMS1Q20",
  authDomain: "expensestracker-ec2c5.firebaseapp.com",
  projectId: "expensestracker-ec2c5",
  storageBucket: "expensestracker-ec2c5.firebasestorage.app",
  messagingSenderId: "294580580020",
  appId: "1:294580580020:web:f9fc481a2a6a2abe0df1e1",
  measurementId: "G-BCZTH9F6WF"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),

    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    AngularFireStorage,
    
  ]
};
