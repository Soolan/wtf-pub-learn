import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFireModule, FIREBASE_OPTIONS} from '@angular/fire/compat';
import {AngularFireAnalyticsModule} from '@angular/fire/compat/analytics';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {environment} from '../environments/environment';
import { CourseModule } from './courses/course.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import {provideAuth, getAuth, connectAuthEmulator} from '@angular/fire/auth';
import {provideDatabase, getDatabase, connectDatabaseEmulator} from '@angular/fire/database';
import {provideFirestore, getFirestore, connectFirestoreEmulator} from '@angular/fire/firestore';
import {provideFunctions, getFunctions, connectFunctionsEmulator} from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import {provideStorage, getStorage, connectStorageEmulator} from '@angular/fire/storage';
import { LandingComponent } from './landing/landing.component';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ReleasesComponent } from './releases/releases.component';
import { ReleaseNotesComponent } from './releases/release-notes/release-notes.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import { DashboardModule } from './dashboard/dashboard.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ReleasesComponent,
    ReleaseNotesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase), // <---- workaround for compat. provide() functions won't work
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireAnalyticsModule,
    CourseModule,
    SharedModule,
    FlexLayoutModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => {
      const auth = getAuth();
      if (environment.useEmulators) {
        connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
      }
      return auth;
    }),
    provideFirestore(() => {
      const firestore = getFirestore();
      if (environment.useEmulators) {
        connectFirestoreEmulator(firestore, 'localhost', 8070);
      }
      return firestore;
    }),
    provideDatabase(() => {
      const database = getDatabase();
      if (environment.useEmulators) {
        connectDatabaseEmulator(database, 'localhost', 9000);
      }
      return database;
    }),
    provideStorage(() => {
      const storage = getStorage();
      if (environment.useEmulators) {
        connectStorageEmulator(storage, 'localhost', 9199);
      }
      return storage;
    }),
    provideFunctions(() => {
      const functions = getFunctions();
      if (environment.useEmulators) {
        connectFunctionsEmulator(functions, 'localhost', 5001);
      }
      return functions;
    }),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideRemoteConfig(() => getRemoteConfig()),
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatExpansionModule,
    DashboardModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    MatDividerModule,
    MatIconModule,
  ],
  providers: [
    ScreenTrackingService, UserTrackingService,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
