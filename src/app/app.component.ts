import { Component } from '@angular/core'
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';


@Component({
  selector: 'app-root',
  imports:[InputTextModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'oc';
}
