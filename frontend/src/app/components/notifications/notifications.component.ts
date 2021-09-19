import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import io from 'socket.io-client'
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  socket
  user
  notifications = []
  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private moment: MomentService
  ) { 
    this.socket = io(environment.server)
  }

  ngOnInit(): void {
    this.user = this.tokenService.GetPayload()
    this.GetUser()
    this.socket.on('refreshPage', () => this.GetUser())
  }
  GetUser() {
    this.userService.getUserById(this.user._id).subscribe((res: any) => {
      this.notifications = res.notifications.reverse()
    })
  }

  MarkAsRead(notification) {
    this.userService.MarkNotification(notification._id).subscribe(() => this.socket.emit('refresh', {}))
  }
  delete(deleteVal) {
    this.userService.MarkNotification(deleteVal._id, true).subscribe(() => this.socket.emit('refresh', {}))
  }

  timeFromNow(time) {
   return this.moment.timeFromNow(time)
   }
}
