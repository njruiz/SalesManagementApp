import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';

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

  constructor(public accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    if (this.screen_name == 'Dashboard') {
      this.dashboardMode = true;
    }
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
