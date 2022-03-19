import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAnalyticsModule} from '@angular/fire/compat/analytics';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {environment} from '../environments/environment';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { CourseModule } from './courses/course.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase), // <---- workaround for compat. provide() functions won't work
    AngularFirestoreModule,
    AngularFireAnalyticsModule,

    CourseModule,
    SharedModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
