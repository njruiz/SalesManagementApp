import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  username: string = '';
  password: string = '';

  loginForm: FormGroup;
  signUpButton = document.getElementById('signUp');
  signInButton = document.getElementById('signIn');

  constructor(private formBuilder: FormBuilder, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
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
    if (this.loginForm.invalid) {
      return;
    }

    // Here, you can perform the logic to add the new product
    // For demonstration purposes, we will just log the form value
    console.log(this.loginForm.value);
  }
}
