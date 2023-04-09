import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() screen_name: string;
  dashboardMode = false;

  firstName = 'Nelson';
  lastName = 'Ruiz Jr.';
  dashboard_subMessage = "Here are today's stats from your store";

  ngOnInit(): void {
    if (this.screen_name == 'Dashboard') {
      this.dashboardMode = true;
    }
  }
}
