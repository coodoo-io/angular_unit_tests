import {Component} from '@angular/core';
import {MatCheckboxChange, MatDialog} from '@angular/material';

import {DialogOverviewExampleDialog} from './dialog-overview-example-dialog';
import {DataService} from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  toDoList: Array<Object> = [];
  constructor(private dataService: DataService, private dialog: MatDialog) {
    dataService.getData().subscribe((data) => {
      this.toDoList = data;
    });
  }

  change($event: MatCheckboxChange) {
    this.toDoList[$event.source.id].checked = $event.checked;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(
        DialogOverviewExampleDialog, {width: '500px', data: {}});

    dialogRef.afterClosed().subscribe(result => {
      this.addElementToList(result);
    });
  }

  openDialogEdit(item, index) {
    const dialogRef = this.dialog.open(
        DialogOverviewExampleDialog, {width: '500px', data: JSON.parse(JSON.stringify(item))});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editItem(index, result);
      }
    });
  }
  /**
   *
   */
  public editItem(index, result) {
    this.toDoList[index] = result;
  }

  public addElementToList(result) {
    result.id = this.toDoList.length + 1;
      this.toDoList = [...this.toDoList, result];
  }
  /**
   *
   */
  deleteItem(index) {
    this.toDoList = this.toDoList.filter((element, elementIndex) => {
      if (index === (elementIndex)) {
        return false;
      }
      return true;
    });
    this.toDoList.forEach((element, elementIndex) => {
      element['id'] = elementIndex + 1;
    });
  }
}
