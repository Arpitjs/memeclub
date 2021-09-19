import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  users = []
  noOfPosts
  me
  following
  followers
  constructor(
    private userService: UserService,
    private tokenService: TokenService

  ) {
  }

  ngOnInit(): void {
    this.getNoPost()
    this.me = this.tokenService.GetPayload()
    if (!this.noOfPosts) this.noOfPosts = 0
    if (!this.followers) this.followers = 0
    if (!this.following) this.following = 0
  }
  getNoPost() {
    this.userService.getAllUsers().subscribe((res: any) => {
      this.users = res
      this.users.forEach(user => {
      // console.log(user)
        if (user.username === this.me.username) {
          if (user.posts.length) this.noOfPosts = user.posts.length
          if (user.following.length) this.following = user.following.length
          if (user.followers.length) this.followers = user.followers.length
        }
      })
    })
  }
}
