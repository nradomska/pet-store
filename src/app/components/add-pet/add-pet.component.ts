import { Component, inject } from '@angular/core';
import { PetFormComponent } from '../shared/pet-form/pet-form.component';
import { Pet } from '../../models/pet.type';
import { AlertType } from '../../models/alert.enum';
import { PetsService } from '../../services/pets.service';
import { LoaderComponent } from '../shared/loader/loader.component';
import { catchError, EMPTY, finalize, take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { GoBackComponent } from '../shared/go-back/go-back.component';
import { SnackBarService } from '../../services/snack-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pet',
  imports: [
    PetFormComponent,
    LoaderComponent,
    GoBackComponent,
  ],
  templateUrl: './add-pet.component.html',
  styleUrl: './add-pet.component.scss',
})
export class AddPetComponent {
  public isLoading = false;

  private petsService = inject(PetsService);
  private snackBarService = inject(SnackBarService);
  private router = inject(Router);

  onSubmit(formValue: Pet) {
    this.isLoading = true;
    this.petsService.addPet(formValue)
      .pipe(
        take(1),
        catchError((e: HttpErrorResponse) => {
          this.snackBarService.showSnackBar(`An error occurred: ${e.message}`, AlertType.ERROR);
          return EMPTY;
        }),
        finalize(() => {
          this.isLoading = false;
        }))
      .subscribe({
        next: (data: Pet) => {
          this.router.navigate(['/']);
          this.snackBarService.showSnackBar(`Pet named ${data.name} has been successfully added`, AlertType.SUCCESS);
        },
      });
  }
}
