import { Router } from '@angular/router';
import { User } from './../_models/user';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ValidatorHelper } from '../_helpers/ValidatorHelper';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  user: Partial<User> = {};
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService, private alertify: AlertifyService,
    private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    };

    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  isInvalidControl(controlName: string): boolean {
    return ValidatorHelper.isInvalidControl(this.registerForm, controlName);
  }

  getControlError(controlName: string, specificErrorMessage?: string): string {
    return ValidatorHelper.getControlError(this.registerForm, controlName, specificErrorMessage);
  }

  register() {
    if (this.registerForm.valid) {
      Object.assign(this.user, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.alertify.success('Registration successful');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
        });
      });
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
