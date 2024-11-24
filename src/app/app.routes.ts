import { Routes } from '@angular/router';
import { AddPetComponent } from './components/add-pet/add-pet.component';
import { PetsViewComponent } from './components/pets-view/pets-view.component';
import { EditPetComponent } from './components/edit-pet/edit-pet.component';

export const routes: Routes = [
  {
    path: '',
    component: PetsViewComponent,
    title: 'Pet Store',
  },
  {
    path: 'add',
    component: AddPetComponent,
    title: 'Add Pet',
  },
  {
    path: 'edit/:id',
    component: EditPetComponent,
    title: 'Add Pet',
  }
];
