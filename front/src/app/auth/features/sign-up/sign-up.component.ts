import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../data-access/auth.service';

interface SignUpForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styles: ``,
})
export default class SignUpComponent {
  private _authService = inject(AuthService);
  private _formBuilder = inject(FormBuilder);
  private _router = inject(Router);

  form = this._formBuilder.group<SignUpForm>({
    email: this._formBuilder.nonNullable.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.nonNullable.control('', Validators.required),
  });

  submit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.getRawValue();

    this._authService.signUp(email, password).subscribe({
      next: (response) => {
        this._router.navigateByUrl('/dashboard');
      },
      error: (error) => console.error(error),
    });
  }
}
