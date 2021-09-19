import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService extends BaseService {
  url
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
    super('messages')
   }
   sendMessage(recieverId, recieverName, message) {
     return this.http.post(`${this.url}chat-message/${recieverId}`,
      { recieverName, message }, this.setUpHeaders(this.tokenService.getToken())) 
   }
   
   getMessages(recieverId) {
    return this.http.get(`${this.url}chat-message/${recieverId}`, this.setUpHeaders(this.tokenService.getToken())) 
  }

  markMessages(reciever) {
    return this.http.get(`${this.url}reciever-messages/${reciever}`, this.setUpHeaders(this.tokenService.getToken())) 
  }

  markAllMessages() {
    return this.http.get(`${this.url}mark-all-messages`, this.setUpHeaders(this.tokenService.getToken())) 
  }
}