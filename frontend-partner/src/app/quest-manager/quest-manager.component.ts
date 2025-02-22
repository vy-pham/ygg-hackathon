import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { Router } from '@angular/router';
import { QuestManagerService } from './quest-manager.service';
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
  providers: [QuestManagerService],
  templateUrl: './quest-manager.component.html',
})
export class QuestManagerComponent {
  router = inject(Router);
  displayedColumns: string[] = ['name', 'action'];

  questManagerService = inject(QuestManagerService);
  ngOnInit() {
    this.questManagerService
      .getQuestManagers$({ name: '' }, { page: 1, pageSize: 10 })
      .subscribe();
  }
}
