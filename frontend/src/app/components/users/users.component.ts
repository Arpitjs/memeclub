import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TokenService } from 'src/app/services/token.service';
import _ from 'lodash'
import io from 'socket.io-client'
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  users = []
  me: any
  arr = []
  socket
  onlineUsers = []
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router
  ) { 
    this.socket = io(environment.server)
  }

  ngOnInit(): void {
    this.me = this.tokenService.GetPayload()
    this.GetUsers()
    this.GetUsersById()
    this.socket.on('refreshPage', () => {
      this.GetUsers()
      this.GetUsersById()
    })
  }
  GetUsers() {
    this.userService.getAllUsers().subscribe((data: any) => {
      this.users = data.filter(user => user.username !== this.me.username)
    })
  }

  GetUsersById() {
    this.userService.getUserById(this.me._id).subscribe((data: any) => {
      if(data.following.length) this.arr = data.following
    },
     err => console.log(err))
  }

  follow(userman) {
    this.userService.follow(userman._id).subscribe(() => this.socket.emit('refresh', {}), err => console.log(err) )
  }

 checkInArray(arr, id) {
   let result = _.find(arr, ['userFollowed._id', id])
   if(result) return true
     return false
 }
 online(ev) {
  this.onlineUsers = ev
 }
 checkIfOnline(name) {
   let result = this.onlineUsers.indexOf(name)
   if(result === -1) {
     return true 
   } else {
     return false
   }
 }

 viewUser(user) {
   this.router.navigate([user.username])
   if(this.me.username !== user.username) {
     this.userService.viewProfileNotify(user._id).subscribe(() => this.socket.emit('refresh', {}))
   }
 }
}