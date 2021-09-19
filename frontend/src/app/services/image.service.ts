import { Injectable } from "@angular/core";
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable()

export class ImageService extends BaseService {
    url
    token
    constructor(
        private http: HttpClient,
        private tokenSerivce: TokenService
    ) {
        super
            ('images')
        this.token = this.tokenSerivce.getToken()
    }
    AddImage(img) {
        return this.http.post(this.url + 'upload-image', { img }, this.setUpHeaders(this.token))
    }
    changePFP(img) {
        return this.http.post(this.url + 'upload-PFP', { img }, this.setUpHeaders(this.token))
    }
}