import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetFormComponent } from './pet-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormGroup } from '@angular/forms';
import { petMock } from '../../../tests/mocks/pet.mock';

describe('PetFormComponent', () => {
  let component: PetFormComponent;
  let fixture: ComponentFixture<PetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetFormComponent, BrowserAnimationsModule],
    })
      .compileComponents();

    fixture = TestBed.createComponent(PetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should build form', () => {
      component.form = null as unknown as FormGroup;
      component.ngOnInit();

      expect(component.form).toBeDefined();
    });

    it('should update form if pet has been provided', () => {
      component.pet = petMock;
      component.ngOnInit();

      expect(component.form.controls['name'].value).toEqual(petMock.name);
    });
  });

  describe('addPhotoUrl', () => {
    it('should add new form control', () => {
      component.photoUrlsForm.patchValue(petMock.photoUrls);
      component.addPhotoUrl(new MouseEvent('click'));

      expect(component.photoUrlsForm.value.length).toEqual(2);
    });
  });

  describe('deletePhotoUrl', () => {
    it('should remove form control', () => {
      component.photoUrlsForm.patchValue(petMock.photoUrls);
      component.deletePhotoUrl(new MouseEvent('click'), 0);

      expect(component.photoUrlsForm.value.length).toEqual(0);
    });
  });

  describe('addTags', () => {
    it('should add new form control', () => {
      component.tagsForm.patchValue(petMock.tags);
      component.addTags(new MouseEvent('click'));

      expect(component.tagsForm.value.length).toEqual(2);
    });
  });

  describe('deleteTags', () => {
    it('should remove tag', () => {
      component.tagsForm.patchValue(petMock.tags);
      component.deleteTags(new MouseEvent('click'), 0);

      expect(component.tagsForm.value.length).toEqual(0);
    });
  });

  describe('submitForm', () => {
    it('should emit event with form value', () => {
      spyOn(component.submitEvent, 'emit');
      component.submitForm();

      expect(component.submitEvent.emit).toHaveBeenCalled();
    });
  });
});
