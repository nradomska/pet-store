import { Component, inject, OnInit } from '@angular/core';
import { PetsService } from '../../services/pets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from '../../models/pet.type';
import { PetFormComponent } from '../shared/pet-form/pet-form.component';
import { LoaderComponent } from '../shared/loader/loader.component';
import { AlertType } from '../../models/alert.enum';
import { catchError, EMPTY, finalize, Observable, take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { GoBackComponent } from '../shared/go-back/go-back.component';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-edit-pet',
  imports: [
    PetFormComponent,
    LoaderComponent,
    AsyncPipe,
    GoBackComponent,
  ],
  templateUrl: './edit-pet.component.html',
  styleUrl: './edit-pet.component.scss',
})
export class EditPetComponent implements OnInit {
  public petsService = inject(PetsService);
  public pet$!: Observable<Pet>;
  public isLoading = false;

  private snackBarService = inject(SnackBarService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public ngOnInit(): void {
    const petId = this.route.snapshot.params['id'];
    this.pet$ = this.petsService.getPetById(petId).pipe(
      catchError((e: HttpErrorResponse) => {
        this.snackBarService.showSnackBar(`An error occurred: ${e.message}`, AlertType.ERROR);
        return EMPTY;
      }),
    );
  }

  public onSubmit(formValue: Pet) {
    this.isLoading = true;
    this.petsService.updatePet(formValue)
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
          this.snackBarService.showSnackBar(`Pet named ${data.name} has been successfully edited`, AlertType.SUCCESS);
        },
      });
  }
}
