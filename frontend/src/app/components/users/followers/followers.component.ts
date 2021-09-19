import { Component, OnInit } from "@angular/core";
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import io from 'socket.io-client'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html'
})

export class followersComponent implements OnInit {
  followers = []
  user
  following = []
  socket
  hasFollowedMe = []
  constructor(
    private tokenService: TokenService,
    private userService: UserService
  ) {
    this.socket = io(environment.server)
  }
  ngOnInit() {
    this.user = this.tokenService.GetPayload()
    // console.log(this.user)
    this.GetUser()
    this.socket.on('refreshPage', () => this.GetUser())
  }

  GetUser() {
    this.userService.getUserById(this.user._id).subscribe((res: any) => {
      this.followers = res.followers
      this.following = res.following
      this.check(this.followers, this.following)
    })
  }

  unFollow(user) {
    this.userService.Unfollow(user.follower._id).subscribe(() => this.socket.emit('refresh', {}), err => console.log(err))
  }
  Follow(user) {
    this.userService.follow(user.follower._id).subscribe(() => this.socket.emit('refresh', {}), err => console.log(err))
  }
  check(arr1, arr2) {
    arr1.forEach(el => {
      arr2.forEach(el2 => {
        if (el.follower._id === el2.userFollowed._id) this.hasFollowedMe.push(el)
      })
    })
  }
}