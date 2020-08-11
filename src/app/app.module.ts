import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { UsersComponent } from './users/users.component';
import {
  NbThemeModule,
  NbTabsetModule,
  NbLayoutModule,
  NbInputModule,
  NbCheckboxModule,
  NbToggleModule,
  NbButtonModule,
  NbTreeGridModule,
  NbToastrModule,
  NbCardModule
} from '@nebular/theme';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'wedding-invitation-oplachko'),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbTabsetModule,
    NbInputModule,
    FormsModule,
    NbCheckboxModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    NbToggleModule,
    NbButtonModule,
    NbTreeGridModule,
    NbCardModule,
    NbToastrModule.forRoot(),
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
