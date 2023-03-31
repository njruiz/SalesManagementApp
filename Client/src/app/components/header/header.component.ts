import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  firstName = "Nelson";
  lastName = "Ruiz Jr.";
  dashboard_subMessage = "Here are today's stats from your store";
}
