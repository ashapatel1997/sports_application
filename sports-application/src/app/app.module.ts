import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'hammerjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '../app/shared/shared.module';
import { TestResultsComponent } from './test-results/test-results.component';
import { TestDetailsComponent } from './test-details/test-details.component';
import { DeleteDialogComponent } from '../app/shared/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TestResultsComponent,
    TestDetailsComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],

  providers: [],

  bootstrap: [AppComponent],

  entryComponents: [DeleteDialogComponent]
 
})

export class AppModule { }
