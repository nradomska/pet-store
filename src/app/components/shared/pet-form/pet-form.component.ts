import { Component, EventEmitter,  Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Pet } from '../../../models/pet.type';
import { PetStatus } from '../../../models/status.enum';
import { FormGroupPipe } from '../../../pipes/form-group.pipe';
import { KeyValuePipe } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { randomId } from '../../../utils/random-id';
import { MatIcon } from '@angular/material/icon';
import { forbiddenCharsValidator } from '../../../validators/forbidden-chars.validator';
import { urlValidator } from '../../../validators/url.validator';

@Component({
  selector: 'app-pet-form',
  imports: [
    FormGroupPipe,
    FormsModule,
    KeyValuePipe,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatIconButton,
    MatIcon,
  ],
  templateUrl: './pet-form.component.html',
  styleUrl: './pet-form.component.scss',
})
export class PetFormComponent implements OnInit {
  @Input() public pet!: Pet;
  @Output() public submitEvent: EventEmitter<Pet> = new EventEmitter<Pet>();

  public form: FormGroup = new FormGroup({});
  public PetStatus: typeof PetStatus = PetStatus;

  get photoUrlsForm() {
    return this.form.controls['photoUrls'] as FormArray;
  }

  get tagsForm() {
    return this.form.controls['tags'] as FormArray;
  }

  get categoryForm() {
    return this.form.controls['category'] as FormGroup;
  }

  constructor(private fb: FormBuilder) {
  }

  public ngOnInit(): void {
    this.buildForm();
    if (this.pet) {
      for (let i = 0; i < this.pet.tags?.length - 1; i++) {
        this.addTags();
      }

      for (let i = 0; i < this.pet.photoUrls.length - 1; i++) {
        this.addPhotoUrl();
      }

      this.form.patchValue(this.pet);
    }
  }

  public addPhotoUrl(e?: MouseEvent): void {
    e?.preventDefault();
    this.photoUrlsForm.push(new FormControl('', [forbiddenCharsValidator, urlValidator]));
  }

  public deletePhotoUrl(e: MouseEvent, photoId: number): void {
    e.preventDefault();
    this.photoUrlsForm.removeAt(photoId);
  }

  public addTags(e?: MouseEvent): void {
    e?.preventDefault();
    const tagsForm = this.fb.group({
      id: [this.tagsForm.value.length],
      name: [''],
    });
    this.tagsForm.push(tagsForm);
  }

  public deleteTags(e: MouseEvent, tagId: number): void {
    e.preventDefault();
    this.tagsForm.removeAt(tagId);
  }

  public submitForm() {
    this.submitEvent.emit(this.form.value);
  }

  private buildForm(): void {
    this.form = this.fb.group({
      id: [randomId()],
      category: this.fb.group({
        id: ['0'],
        name: ['', forbiddenCharsValidator],
      }),
      name: ['', [Validators.required, forbiddenCharsValidator]],
      photoUrls: this.fb.array([['', [Validators.required, forbiddenCharsValidator, urlValidator]]]),
      tags: this.fb.array([this.fb.group({
        id: ['0'],
        name: [''],
      })]),
      status: [PetStatus.AVAILABLE],
    });
  }
}
