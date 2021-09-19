import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  errorMsg
  loader = false
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    public tokenService: TokenService
    ) { }

  ngOnInit(): void {
    this.init()
  }

  init() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    })
  }
  register() {
    this.loader = true
    this.authService.register(this.registerForm.value).subscribe((res: any) => {
      this.tokenService.setToken(res.token)
      localStorage.setItem('user', JSON.stringify(res.user))
      setTimeout(() => {
      this.router.navigate(['/streams'])
      }, 3000)
    }, err => {
      this.loader = false
      this.errorMsg = err.error
    })
  }
}
