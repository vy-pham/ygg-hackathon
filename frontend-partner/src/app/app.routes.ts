import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuestManagementComponent } from './quest-management/quest-management.component';
import { QuestManagerComponent } from './quest-manager/quest-manager.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'quest-manager',
    component: QuestManagerComponent,
  },
  {
    path: 'quest',
    component: QuestManagementComponent,
  },
];
