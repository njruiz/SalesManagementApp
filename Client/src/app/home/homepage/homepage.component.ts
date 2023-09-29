import { Component, OnInit, Renderer2 } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  registerForm: UntypedFormGroup;
  maxDate: Date;
  validationErrors: string[] = [];

  username: string = '';
  password: string = '';

  loginForm: FormGroup;
  signUpButton = document.getElementById('signUp');
  signInButton = document.getElementById('signIn');

  constructor(
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
    this.initializeRegistrationForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
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
    if (this.loginForm.invalid) {
      return;
    }

    // Here, you can perform the logic to add the new product
    // For demonstration purposes, we will just log the form value
    console.log(this.loginForm.value);
  }

  register() {
    this.accountService.register(this.registerForm.value);
  }
}
