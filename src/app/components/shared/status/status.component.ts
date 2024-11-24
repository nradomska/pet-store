import { Component, Input } from '@angular/core';
import { PetStatus } from '../../../models/status.enum';

@Component({
  selector: 'app-status',
  imports: [],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent {

  @Input() status: PetStatus = PetStatus.AVAILABLE;

}
