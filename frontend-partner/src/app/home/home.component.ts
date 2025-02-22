import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Router } from '@angular/router';
import { HomeService } from './home.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  providers: [HomeService],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  router = inject(Router);
  homeService = inject(HomeService);

  login() {
    this.homeService.login$().subscribe((data) => {
      console.log(data);
      if (!data) return;
      if (data.role === 'Admin') {
        this.router.navigateByUrl('/quest-manager');
      } else {
        this.router.navigateByUrl('/quest');
      }
    });
  }
}
