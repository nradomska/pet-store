import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertType } from '../models/alert.enum';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  private snackBar = inject(MatSnackBar);

  constructor() {
  }

  showSnackBar(message: string, type: AlertType) {
    this.snackBar.open(
      message, 'Close',
      {
        duration: 5000,
        panelClass: [this.getPanelClass(type)],
      },
    );
  }

  private getPanelClass(alertType: AlertType): string {
    switch (alertType) {
      case AlertType.SUCCESS:
        return 'snackbar--success';
      case AlertType.ERROR:
        return 'snackbar--error';
      default:
        return '';
    }
  }
}
