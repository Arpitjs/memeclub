import { Component, OnInit,AfterViewInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { TokenService } from 'src/app/services/token.service';
import io from 'socket.io-client'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, AfterViewInit {
  recieverName
  recieverData
  message
  user
  socket
  messages = []
  typing = false
  typingMsg
  @Input() onlineUsers
  isOnline = false
  constructor(
    private messageService: MessagesService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private tokenService: TokenService
  ) {
    this.socket = io(environment.server)
  }

  ngOnInit(): void {
    this.user = this.tokenService.GetPayload()
    this.recieverName = this.activatedRoute.snapshot.params.name
    this.getUserByName()
    this.socket.on('is_typing', data => {
      if(data.sender === this.recieverName) this.typing = true
      this.socket.on('has_stopped_typing', data => {
        if(data.sender === this.recieverName) this.typing = false
      })
    })
  }

  ngAfterViewInit() {
    let params = {
      room1: this.user.username,
      room2: this.recieverName
    }

    this.socket.emit('join chat', params)
  }

  ngOnChanges(changes) {
    let title = document.querySelector('.nameCol')
    let online = changes.onlineUsers.currentValue
    if(online.length) {
      let result = online.indexOf(this.recieverName)
     if(result === -1) {
       this.onlineUsers = false;
       (title as HTMLElement).style.marginTop = '20px'
     } else {
       this.onlineUsers = true;
       (title as HTMLElement).style.marginTop = '10px'
     }
    }
  }

  getUserByName() {
    this.userService.getUserByName(this.recieverName).subscribe(res => {
      this.recieverData = res
      this.getAllMessages(this.recieverData._id)
      this.socket.on('refreshPage', () => this.getAllMessages(this.recieverData._id))
    })
  }
  sendMessage() {
    if (this.message) {
      this.messageService.sendMessage(this.recieverData._id, this.recieverName, this.message)
        .subscribe(() => {
          this.socket.emit('refresh', {})
          this.message = ''
        })
    }
  }

  isTyping() {
    let data = {
      sender: this.user.username,
      reciever: this.recieverName
    }
    this.socket.emit('start_typing', data)
    if(this.typingMsg) {
      clearTimeout(this.typingMsg)
    }
    this.typingMsg = setTimeout(() => {
      this.socket.emit('stop_typing', data)
    }, 500)
  }

  getAllMessages(recieverId) { this.messageService.getMessages(recieverId).subscribe((res: any) => this.messages = res.message) }
}
