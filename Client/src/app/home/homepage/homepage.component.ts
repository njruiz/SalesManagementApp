import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/_models/user';
import { Observable, of } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  users: any;
  model: any = {};
  currentUser$: Observable<User | null> = of(null);

  maxDate: Date;
  validationErrors: string[] | undefined;

  username: string = '';
  password: string = '';

  registerForm: FormGroup = new FormGroup({});
  loginForm: FormGroup = new FormGroup({});

  signUpButton = document.getElementById('signUp');
  signInButton = document.getElementById('signIn');

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.initializeLoginForm();
    this.initializeRegistrationForm();
  }

  initializeLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  initializeRegistrationForm() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', Validators.required],
      address: ['', Validators.required],
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
      confirmPassword: [
        '',
        [Validators.required, this.matchValues('password')],
      ],
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () =>
        this.registerForm.controls['confirmPassword'].updateValueAndValidity(),
    });
  }

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: (response) => (this.users = response),
      error: (error) => console.log(error),
    });
  }

  logout() {
    this.accountService.logout();
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value
        ? null
        : { isMatching: true };
    };
  }

  onLogin(): void {
    this.accountService.login(this.loginForm.value).subscribe({
      next: () => this.router.navigateByUrl('/dashboard'),
    });
  }

  register(): void {
    this.accountService.register(this.registerForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/dashboard');
      },
      error: (error) => {
        this.validationErrors = error;
      },
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
}
