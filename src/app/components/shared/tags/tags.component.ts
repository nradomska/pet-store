import { Component, Input } from '@angular/core';
import { PetTag } from '../../../models/pet.type';

@Component({
  selector: 'app-tags',
  imports: [],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss',
})
export class TagsComponent {
  @Input() tags!: PetTag[];
}
