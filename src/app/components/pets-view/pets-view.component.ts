import { Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PetsService } from '../../services/pets.service';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { Pet } from '../../models/pet.type';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PetStatus } from '../../models/status.enum';
import { MatOption, MatSelect } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { catchError, EMPTY, finalize, switchMap, take, filter, tap } from 'rxjs';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { StatusComponent } from '../shared/status/status.component';
import { TagsComponent } from '../shared/tags/tags.component';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertType } from '../../models/alert.enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatAnchor, MatButton } from '@angular/material/button';
import { SnackBarService } from '../../services/snack-bar.service';
import { FilterService } from '../../services/filter.service';
import { Filter } from '../../models/filter.interface';
import { PetDetailsComponent } from '../pet-details/pet-details.component';
import { LoaderComponent } from '../shared/loader/loader.component';

@Component({
  selector: 'app-pets-view',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginator,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelect,
    MatOption,
    RouterLink,
    MatDialogModule,
    StatusComponent,
    TagsComponent,
    MatAnchor,
    MatButton,
    LoaderComponent,
  ],
  templateUrl: './pets-view.component.html',
  styleUrl: './pets-view.component.scss',
})

export class PetsViewComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public filterService = inject(FilterService);

  public readonly INVALID_ID = '92233720';
  public PetStatus: typeof PetStatus = PetStatus;
  public displayedColumns: string[] = ['name', 'category', 'photoUrls', 'tags', 'status', 'actions'];
  public dataSource!: MatTableDataSource<Pet>;

  public filterParams: Filter = {
    name: this.filterService.filterValue.name,
    status: this.filterService.filterValue.status,
  };
  public isLoading = true;

  private dialog = inject(MatDialog);
  private snackBarService = inject(SnackBarService);
  private petsService = inject(PetsService);

  constructor() {
    this.petsService.getAllPets()
      .pipe(
        takeUntilDestroyed(),
        catchError((e: HttpErrorResponse) => {
          this.snackBarService.showSnackBar(`An error occurred: ${e.message}`, AlertType.ERROR);
          return EMPTY;
        }),
        finalize(() => {
          this.isLoading = false;
        }))
      .subscribe((pets: Pet[]) => {
        this.dataSource = new MatTableDataSource<Pet>(pets);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.setCustomSort();
        this.filter();
      });

    this.petsService.allPets$
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: () => {
          if (this.dataSource) {
            this.filter();
            this.isLoading = false;
          }
        },
      });

    this.filterService.filterValue$
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (data: Filter) => {
          this.filterParams = data;
        },
      });
  }

  public openDetails(petId: number) {
    const dialogRef = this.dialog.open(PetDetailsComponent, {
      maxWidth: 500,
      minHeight: 300,
    });

    const instance = dialogRef.componentInstance;
    instance.petId = petId;
  }

  public filterByName(e: KeyboardEvent): void {
    this.filterService.filterValue = {
      ...this.filterService.filterValue,
      ...{ name: (e.target as HTMLInputElement).value },
    };
    this.filter();
  }

  public filterByStatus(val: PetStatus): void {
    this.filterService.filterValue = {
      ...this.filterService.filterValue,
      ...{ status: val },
    };
    this.filter();
  }

  public safeDelete(petId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Are you sure you want to delete?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No',
        },
      },
    });

    dialogRef.afterClosed()
      .pipe(
        filter(confirmed => Boolean(confirmed)),
        tap(() => {this.isLoading = true}),
        catchError((e: HttpErrorResponse) => {
          this.snackBarService.showSnackBar(`An error occurred: ${e.message}`, AlertType.ERROR);
          return EMPTY;
        }),
        switchMap(() => this.petsService.deletePet(petId)),
        take(1),
        finalize(() => {
          this.isLoading = false;
        }))
      .subscribe(() => {
        this.snackBarService.showSnackBar(`Pet has been successfully deleted`, AlertType.SUCCESS);
      });
  }

  private filter(): void {
    let filteredPets = [...this.petsService.allPets];
    if (this.filterParams.name) {
      filteredPets = filteredPets.filter(pet => pet.name?.toLocaleLowerCase().includes(this.filterParams.name.toLocaleLowerCase()));
    }
    if (this.filterParams.status) {
      filteredPets = filteredPets.filter(pet => pet.status === this.filterParams.status);
    }
    this.dataSource.data = filteredPets;
  }

  private setCustomSort(): void {
    this.dataSource.sortingDataAccessor = (data: Pet, property: string): string => {
      switch (property) {
        case 'category':
          return data[property]?.name?.toLocaleLowerCase();
        case 'tags':
          return data[property] && data[property][0]?.name?.toLocaleLowerCase();
        case 'photoUrls':
          return data[property] && data[property][0]?.toLocaleLowerCase();
        case 'name':
        case 'status':
          return data[property]?.toLocaleLowerCase();
        default:
          return '';
      }
    };
  }
}
