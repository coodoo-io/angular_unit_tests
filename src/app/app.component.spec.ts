import {NO_ERRORS_SCHEMA} from '@angular/core';
import {async, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {MatListModule} from '@angular/material/list';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {DialogOverviewExampleDialog} from './dialog-overview-example-dialog';
import {DataService} from './services/data.service';

describe('AppComponent', () => {

  let fixture = null;
  let app = null;


  beforeEach(async(() => {
    const configModule = TestBed.configureTestingModule({
      declarations: [AppComponent, DialogOverviewExampleDialog],
      providers: [DataService],
      imports: [
        BrowserModule, BrowserAnimationsModule, ReactiveFormsModule,
        FormsModule, MatFormFieldModule, MatListModule, MatCardModule,
        MatCheckboxModule, MatButtonModule, MatIconModule, MatDialogModule,
        MatInputModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    return configModule.compileComponents();

  }));
  it('should create the app', async(() => {
       expect(app).toBeTruthy();
     }));

  it('should have data loaded', async(() => {
       expect(app.toDoList.length).toBe(4);
     }));

  it('should change the state of a checkbox', async(() => {
       expect(app.toDoList[1].checked).toBe(false);
       app.change({source: {id: 1}, checked: true});
       expect(app.toDoList[1].checked).toBe(true);
     }));

  it('should delete the correct item', async(() => {
       expect(app.toDoList.length).toBe(4);
       app.deleteItem(0);
       expect(app.toDoList.length).toBe(3);
       expect(app.toDoList[0].name).not.toBe('Writing Tests');
     }));

  it('should edit the correct item', async(() => {
       const result = {name: 'edit'};
       app.editItem(0, result);
       expect(app.toDoList[0].name).not.toBe('Writing Tests');
     }));

  it('should add a new value to the list', async(() => {
       expect(app.toDoList.length).toBe(4);
       app.addElementToList({});
       expect(app.toDoList.length).toBe(5);
     }));

  it('should react on button click', async(() => {
       fixture.detectChanges();
       const compiled = fixture.debugElement.nativeElement;
       let matCards = compiled.querySelectorAll('mat-card');
       expect(app.toDoList.length).toBe(matCards.length);
       const deleteElement = compiled.querySelectorAll('.edit-element .delete');
       deleteElement[0].click();
       fixture.detectChanges();

       fixture.whenStable().then(() => {
         matCards = compiled.querySelectorAll('mat-card');
         expect(3).toBe(matCards.length);
       });
     }));

  it('should add an element via button click', async(() => {
       fixture.detectChanges();
       const compiled = fixture.debugElement.nativeElement;
       let matCards = compiled.querySelectorAll('mat-card');
       expect(app.toDoList.length).toBe(matCards.length);
       spyOn(app, 'openDialog').and.callFake(() => {
         app.addElementToList({});
       });
       const deleteElement = compiled.querySelectorAll('.add-element button');
       deleteElement[0].click();
       fixture.detectChanges();
       fixture.whenStable().then(() => {
         matCards = compiled.querySelectorAll('mat-card');
         expect(5).toBe(matCards.length);
       });
     }));

  it('should edit an element via button click', async(() => {
       fixture.detectChanges();
       const compiled = fixture.debugElement.nativeElement;
       let matCards = compiled.querySelectorAll('mat-card');
       expect(app.toDoList.length).toBe(matCards.length);
       spyOn(app, 'openDialogEdit').and.callFake(() => {
         app.editItem(1, {name: 'Edit'});
       });
       const deleteElement = compiled.querySelectorAll('button.edit');
       deleteElement[0].click();
       fixture.detectChanges();
       fixture.whenStable().then(() => {
         matCards = compiled.querySelectorAll('mat-card');
         expect(4).toBe(matCards.length);
       });
     }));
});
