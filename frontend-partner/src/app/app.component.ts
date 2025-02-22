import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { StorageService } from './shared/services/storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, RouterLink],
  providers: [],
  templateUrl: './app.component.html',
})
export class AppComponent {
  storageService = inject(StorageService);
  ngOnInit() {}
}
