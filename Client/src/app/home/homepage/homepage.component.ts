import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/_models/user';
import { Observable, of } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  users: any;
  model: any = {};
  currentUser$: Observable<User | null> = of(null);

  registerForm: UntypedFormGroup;
  maxDate: Date;
  validationErrors: string[] = [];

  username: string = '';
  password: string = '';

  loginForm: FormGroup;
  signUpButton = document.getElementById('signUp');
  signInButton = document.getElementById('signIn');

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private fb: UntypedFormBuilder
  ) {}

  initializeRegistrationForm() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(16),
          Validators.pattern(/^(?=[^\d]*\d)(?=[^\W]*\W)/),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.getUsers();
    this.initializeRegistrationForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: (response) => (this.users = response),
      error: (error) => console.log(error),
      complete: () => console.log('Request has completed'),
    });
  }

  signin_click() {
    const container = document.getElementById('container');
    if (container) {
      container.classList.remove('right-panel-active');
    }
  }

  signup_click() {
    const container = document.getElementById('container');
    if (container) {
      container.classList.add('right-panel-active');
    }
  }

  onLogin(): void {
    this.accountService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => console.log(error),
    });
  }

  register(): void {
    this.accountService.register(this.model).subscribe({
      error: (error) => console.log(error),
    });
  }

  logout() {
    this.accountService.logout();
  }
}
