import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPetComponent } from './edit-pet.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { petMock } from '../../tests/mocks/pet.mock';
import { AlertType } from '../../models/alert.enum';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EditPetComponent', () => {
  let component: EditPetComponent;
  let fixture: ComponentFixture<EditPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPetComponent, BrowserAnimationsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should get pet by id', () => {
      component['route'].snapshot.params = { id: petMock.id };
      spyOn(component['petsService'], 'getPetById').and.returnValue(of(petMock));
      component.ngOnInit();

      expect(component['petsService'].getPetById).toHaveBeenCalledWith(petMock.id);
    });
  });

  describe('onSubmit', () => {
    it('should submit form', () => {
      spyOn(component['petsService'], 'updatePet').and.returnValue(of(petMock));
      component.onSubmit(petMock);

      expect(component['petsService'].updatePet).toHaveBeenCalled();
    });

    it('should display snack bar on success', () => {
      spyOn(component['petsService'], 'updatePet').and.returnValue(of(petMock));
      spyOn(component['snackBarService'], 'showSnackBar');
      component.onSubmit(petMock);

      expect(component['snackBarService'].showSnackBar)
        .toHaveBeenCalledWith(`Pet named ${petMock.name} has been successfully edited`, AlertType.SUCCESS);
    });

    it('should navigate to home page on success', () => {
      spyOn(component['petsService'], 'updatePet').and.returnValue(of(petMock));
      spyOn(component['router'], 'navigate');
      component.onSubmit(petMock);

      expect(component['router'].navigate).toHaveBeenCalledWith(['/']);
    });

    it('should display snack bar on error', () => {
      spyOn(component['petsService'], 'updatePet').and.returnValue(throwError((() => new Error('Something went wrong'))));
      spyOn(component['snackBarService'], 'showSnackBar');
      component.onSubmit(petMock);

      expect(component['snackBarService'].showSnackBar)
        .toHaveBeenCalledWith('An error occurred: Something went wrong', AlertType.ERROR);
    });
  });
});
