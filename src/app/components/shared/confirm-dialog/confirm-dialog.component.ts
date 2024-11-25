import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { DialogData } from '../../../models/dialog.interface';

@Component({
  selector: 'app-confirm-dialog',
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatButton,
    MatDialogClose,
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})

export class ConfirmDialogComponent {
  public message: string = 'Are you sure?';
  public confirmButtonText: string = 'Yes';
  public cancelButtonText: string = 'Cancel';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>) {
    this.message = data.message || this.message;
    this.confirmButtonText = data.buttonText?.ok || this.confirmButtonText;
    this.cancelButtonText = data.buttonText?.cancel || this.cancelButtonText;
  }

  public onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
