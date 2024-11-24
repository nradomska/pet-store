import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PetStatus } from '../models/status.enum';
import { Pet } from '../models/pet.type';

@Injectable({
  providedIn: 'root',
})

export class PetsService {
  public allPets$: BehaviorSubject<Pet[]> = new BehaviorSubject<Pet[]>([]);
  private http = inject(HttpClient);

  get allPets(): Pet[] {
    return this.allPets$.value;
  }

  public getPetsByStatus(status: PetStatus): Observable<Pet[]> {
    return this.http.get<Pet[]>('pet/findByStatus?status=' + status);
  }

  public getAllPets(): Observable<Pet[]> {
    if (this.allPets?.length) {
      return this.allPets$;
    }
    return combineLatest([
      this.getPetsByStatus(PetStatus.AVAILABLE),
      this.getPetsByStatus(PetStatus.PENDING),
      this.getPetsByStatus(PetStatus.SOLD),
    ]).pipe(
      map(([available, pending, sold]) => [...available, ...pending, ...sold]),
      tap((allPets: Pet[]) => {
        this.allPets$.next(allPets);
      }),
    );
  }

  public addPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>('pet', pet).pipe(
      tap((pet: Pet) => {
        this.allPets$.next([...this.allPets, ...[pet]]);
      }),
    );
  }

  public updatePet(pet: Pet): Observable<Pet> {
    return this.http.put<Pet>('pet', pet).pipe(
      tap(() => {
        const petIndex = this.allPets.findIndex(p => p.id === pet.id);
        const tmpPets = [...this.allPets];
        tmpPets[petIndex] = pet;
        this.allPets$.next([...tmpPets]);
      }),
    );
  }

  public deletePet(petId: number): Observable<void> {
    return this.http.delete<void>('pet/' + petId).pipe(
      tap(() => {
        const petIndex = this.allPets.findIndex(pet => pet.id === petId);
        const tmpPets = [...this.allPets];
        tmpPets.splice(petIndex, 1);
        this.allPets$.next(tmpPets);
      }),
    );
  }

  public getPetById(petId: number): Observable<Pet> {
    return this.http.get<Pet>('pet/' + petId);
  }
}
