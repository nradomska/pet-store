import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPetComponent } from './add-pet.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { petMock } from '../../tests/mocks/pet.mock';
import { AlertType } from '../../models/alert.enum';

describe('AddPetComponent', () => {
  let component: AddPetComponent;
  let fixture: ComponentFixture<AddPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPetComponent, BrowserAnimationsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('should submit form', () => {
      spyOn(component['petsService'], 'addPet').and.returnValue(of(petMock));
      component.onSubmit(petMock);

      expect(component['petsService'].addPet).toHaveBeenCalled();
    });

    it('should display snack bar on success', () => {
      spyOn(component['petsService'], 'addPet').and.returnValue(of(petMock));
      spyOn(component['snackBarService'], 'showSnackBar');
      component.onSubmit(petMock);

      expect(component['snackBarService'].showSnackBar)
        .toHaveBeenCalledWith(`Pet named ${petMock.name} has been successfully added`, AlertType.SUCCESS);
    });

    it('should navigate to home page on success', () => {
      spyOn(component['petsService'], 'addPet').and.returnValue(of(petMock));
      spyOn(component['router'], 'navigate');
      component.onSubmit(petMock);

      expect(component['router'].navigate).toHaveBeenCalledWith(['/']);
    });

    it('should display snack bar on error', () => {
      spyOn(component['petsService'], 'addPet').and.returnValue(throwError((() => new Error('Something went wrong'))));
      spyOn(component['snackBarService'], 'showSnackBar');
      component.onSubmit(petMock);

      expect(component['snackBarService'].showSnackBar)
        .toHaveBeenCalledWith('An error occurred: Something went wrong', AlertType.ERROR);
    });
  });
});
