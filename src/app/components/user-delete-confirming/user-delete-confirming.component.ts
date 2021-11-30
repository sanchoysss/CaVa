import { Component } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-delete-confirming',
  templateUrl: './user-delete-confirming.component.html',
  styleUrls: ['./user-delete-confirming.component.css']
})
export class UserDeleteConfirmingComponent {

  constructor(
    public dialogRef: MatDialogRef<UserDeleteConfirmingComponent>
  ) { }

  onNoClick() {
    console.log("clicked")
    this.dialogRef.close();
  }
}
