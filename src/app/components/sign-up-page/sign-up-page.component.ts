import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css'],
})
export class SignUpPageComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  form = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  submitted: boolean = false;

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/home']);
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const name = this.form.get('firstName')?.value!;
    const surraname = this.form.get('lastName')?.value!;
    const email = this.form.get('email')?.value!;
    const password = this.form.get('password')?.value!;
    this.authService.signUp(name, surraname, email, password);
  }
}
