import { Injectable } from "@angular/core";
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable()

export class UserService extends BaseService {
    url
    token
    constructor(
        private http: HttpClient,
        private tokenSerivce: TokenService
    ){
        super
        ('users')
        this.token = this.tokenSerivce.getToken()
    }

    getAllUsers() {
        return this.http.get(this.url + 'get-users', this.setUpHeaders(this.token))
    }
    follow(userFollowed) {
        return this.http.post(this.url + 'follow/',{ userId: userFollowed }, this.setUpHeaders(this.token))
    }
    Unfollow(userUnfollowed) {
        return this.http.post(this.url + 'Unfollow/',{ userId: userUnfollowed }, this.setUpHeaders(this.token))
    }
    getUserById(id) {
        return this.http.get(this.url + 'get-user/' + id, this.setUpHeaders(this.token))       
    }
    getUserByName(username) {
        return this.http.get(this.url + 'get-userByName/' + username, this.setUpHeaders(this.token))      
    }
    MarkNotification(id, deleteVal?) {
        return this.http.post(this.url + 'mark/' + id, { id, deleteVal },this.setUpHeaders(this.token))
    }
    MarkAllAsRead() {
        return this.http.post(this.url + 'mark-all', {}, this.setUpHeaders(this.token))
    }
    viewProfileNotify(id) {
        return this.http.post(this.url + 'view-profile', { id }, this.setUpHeaders(this.token))
    }
    changePassword(body) {
        return this.http.post(this.url + 'change-password', body, this.setUpHeaders(this.token))
    }
    editPostUser(body) {
        return this.http.post(this.url + 'edit-postUser', body, this.setUpHeaders(this.token))
    }
}