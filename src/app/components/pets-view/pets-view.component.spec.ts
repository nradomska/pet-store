import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsViewComponent } from './pets-view.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableDataSource } from '@angular/material/table';
import { Pet } from '../../models/pet.type';
import { petMock } from '../../tests/mocks/pet.mock';
import { provideRouter } from '@angular/router';
import { PetStatus } from '../../models/status.enum';
import { EMPTY, of } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

describe('PetsViewComponent', () => {
  let component: PetsViewComponent;
  let fixture: ComponentFixture<PetsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetsViewComponent, BrowserAnimationsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(PetsViewComponent);
    component = fixture.componentInstance;

    component.dataSource = new MatTableDataSource<Pet>([petMock]);
    component.dataSource.paginator = component.paginator;
    component.dataSource.sort = component.sort;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('filterByName', () => {
    it('should set filter name value', () => {
      component.filterByName({
        target: {
          value: 'test',
        } as unknown as HTMLInputElement,
      } as unknown as KeyboardEvent);

      expect(component.filterParams.name).toEqual('test');
    });
  });

  describe('filterByStatus', () => {
    it('should set filter status value', () => {
      component.filterByStatus(PetStatus.SOLD);

      expect(component.filterParams.status).toEqual(PetStatus.SOLD);
    });
  });

  describe('safeDelete', () => {
    it('should display confirmation modal', () => {
      spyOn(component['dialog'], 'open').and.returnValue({
        afterClosed: () => of(true),
      } as MatDialogRef<any>);
      component.safeDelete(petMock.id);

      expect(component['dialog'].open).toHaveBeenCalled();
    });

    it('should delete pet after confirmation', () => {
      spyOn(component['petsService'], 'deletePet').and.returnValue(EMPTY);
      spyOn(component['dialog'], 'open').and.returnValue({
        afterClosed: () => of(true),
      } as MatDialogRef<any>);
      component.safeDelete(petMock.id);

      expect(component['dialog'].open).toHaveBeenCalled();
    });
  });

  describe('openDetails', () => {
    it('should open dialog', () => {
      spyOn(component['dialog'], 'open').and.returnValue({
        afterClosed: () => of(true),
        componentInstance: {}
      } as MatDialogRef<any>);
      component.openDetails(petMock.id);

      expect(component['dialog'].open).toHaveBeenCalled();
    });
  });
});
