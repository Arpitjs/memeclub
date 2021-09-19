import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  passwordForm: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.Init()
  }
  Init() {
    this.passwordForm = this.formBuilder.group({
      cpassword: ['', Validators.required],
      newpassword: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    }, {
      validator: this.Validate.bind(this)
    })
  }
  changePassword() {
    this.userService.changePassword(this.passwordForm.value).subscribe(res => console.log(res))
  }

  Validate(passwordFormGroup: FormGroup){
    let new_pswd = passwordFormGroup.controls.newpassword.value
    let confirm_pswd = passwordFormGroup.controls.confirmpassword.value

    if(!confirm_pswd.length) {
      return null 
    }
    if(confirm_pswd !== new_pswd) {
      return {
        dontMatch: true
      }
    }
    return null
  }
}
