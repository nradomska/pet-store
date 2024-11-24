import { Component, inject, Input, OnInit } from '@angular/core';
import { Pet } from '../../models/pet.type';
import { PetsService } from '../../services/pets.service';
import { catchError, EMPTY, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { StatusComponent } from '../shared/status/status.component';
import { TagsComponent } from '../shared/tags/tags.component';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertType } from '../../models/alert.enum';
import { SnackBarService } from '../../services/snack-bar.service';
import { LoaderComponent } from '../shared/loader/loader.component';

@Component({
  selector: 'app-pet-details',
  imports: [
    AsyncPipe,
    MatCardModule,
    MatChipsModule,
    StatusComponent,
    TagsComponent,
    LoaderComponent,
  ],
  templateUrl: './pet-details.component.html',
  styleUrl: './pet-details.component.scss',
})
export class PetDetailsComponent implements OnInit {
  @Input() public petId!: number;
  public pet$!: Observable<Pet>;

  private petsService = inject(PetsService);
  private snackBarService = inject(SnackBarService);

  public ngOnInit(): void {
    this.pet$ = this.petsService.getPetById(this.petId)
      .pipe(catchError((e: HttpErrorResponse) => {
        this.snackBarService.showSnackBar(`An error occurred: ${e.message}`, AlertType.ERROR);
        return EMPTY;
      }));
  }
}
