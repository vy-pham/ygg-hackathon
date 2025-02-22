import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { Router } from '@angular/router';
import { QuestManagementService } from './quest-management.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
  ],
  providers: [QuestManagementService],
  templateUrl: './quest-management.component.html',
})
export class QuestManagementComponent {
  router = inject(Router);
  displayedColumns: string[] = ['name', 'action'];

  questManagerService = inject(QuestManagementService);
  ngOnInit() {
    this.questManagerService
      .getQuestManagers$({ name: '' }, { page: 1, pageSize: 10 })
      .subscribe();
  }
}
