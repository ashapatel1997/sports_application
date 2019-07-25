import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatDialogModule,
  MatTooltipModule
} from '@angular/material';
import { ClickOutsideModule } from 'ng-click-outside';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

//array to store all import modules
const modules = [
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  BrowserAnimationsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  FormsModule,
  ReactiveFormsModule,
  ClickOutsideModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatDialogModule,
  MatTooltipModule
];

@NgModule({

  declarations: [DeleteDialogComponent],

  imports: [
    CommonModule,
    modules
  ],

  exports: [modules]

})

export class SharedModule { }
