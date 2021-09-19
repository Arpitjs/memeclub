import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class PostService extends BaseService {
url
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { 
    super('posts')
  }
  createPost(post) {
    return this.http.post(this.url + 'add-post', post, this.setUpHeaders(this.tokenService.getToken()))
  }
  getAllPosts(postsPerPage?, currentPage?) {
    let queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`
    return this.http.get(this.url + 'posts' + queryParams, this.setUpHeaders(this.tokenService.getToken()))
  }
  addLike(id) {
    return this.http.post(this.url + 'add-like',id , this.setUpHeaders(this.tokenService.getToken()))
  }
  addComment(comment, postId) {
    return this.http.post(this.url + 'add-comment/' + postId ,comment, this.setUpHeaders(this.tokenService.getToken()))
  }
    getPost(postId) {
    return this.http.get(this.url + 'post/' + postId , this.setUpHeaders(this.tokenService.getToken()))
  }
  editPost(body) {
    return this.http.put(this.url + 'edit-post', body, this.setUpHeaders(this.tokenService.getToken()))
  }
  deletePost(id) {
    return this.http.delete(`${this.url}delete-post/${id}`, this.setUpHeaders(this.tokenService.getToken()))
  }
}