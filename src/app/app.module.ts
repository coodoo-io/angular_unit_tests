import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatCardModule, MatCheckbox, MatCheckboxModule, MatDialogModule, MatFormField, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {DialogOverviewExampleDialog} from './dialog-overview-example-dialog';
import {DataService} from './services/data.service';

@NgModule({
  declarations: [AppComponent, DialogOverviewExampleDialog],
  imports: [
    BrowserModule, BrowserAnimationsModule, ReactiveFormsModule, FormsModule,
    MatFormFieldModule, MatListModule, MatCardModule, MatCheckboxModule,
    MatButtonModule, MatIconModule, MatDialogModule, MatInputModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  entryComponents: [DialogOverviewExampleDialog]
})
export class AppModule {
}
