import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class TokenService {
    constructor(
    ) {
    }

    setToken(token) {
        localStorage.setItem('token', token)
    }
    getToken() {
        return localStorage.getItem('token')
    }
    deleteToken() {
        localStorage.removeItem('token')
    }
    GetPayload() {
        let user = JSON.parse(localStorage.getItem('user'))
        return user
    }
}