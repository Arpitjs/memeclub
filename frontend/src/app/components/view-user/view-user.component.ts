import { Component, OnInit,AfterViewInit } from '@angular/core'
import * as M from 'materialize-css'
import { ActivatedRoute } from '@angular/router'
import { UserService } from 'src/app/services/user.service'
import { MomentService } from 'src/app/services/moment.service'
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { PostService } from 'src/app/services/post.service'
import { environment } from 'src/environments/environment'
import io from 'socket.io-client'

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})

export class ViewUserComponent implements OnInit, AfterViewInit {
  tabEl
  postsTab = false
  followingTab = false
  followersTab = false
  posts = []
  editForm: FormGroup
  modalEl
  following = []
  followers = []
  user
  userData
  clickedPost
  socket
  images = []
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private postService: PostService,
    private moment: MomentService,
    private formBuilder: FormBuilder
  ) { 
    this.socket = io(environment.server)
  }

  ngOnInit(): void {
    this.postsTab = true
    this.tabEl =  document.querySelector('.nav-content')
    this.modalEl = document.querySelector('.modal')
    M.Modal.init(this.modalEl, {})
    this.user = this.activatedRoute.snapshot.params.name
    this.initEditForm()
    this.GetUser(this.user)
  }
  ngAfterViewInit() {
    this.tabEl.style.display = 'none'
  }
  GetUser(name) {
    this.userService.getUserByName(name).subscribe((res: any) => {
      console.log('res in v user', res)
      this.posts = res.posts.reverse()
      this.following = res.following
      this.followers = res.followers
      this.userData = res
      this.images = res.images
    })
  }

  changeTab(val) {
    if(val === 'posts') {
      this.postsTab = true
      this.followersTab = false
      this.followingTab = false
    }
    if(val === 'following') {
      this.postsTab = false
      this.followersTab = false
      this.followingTab = true
    } 
    if(val === 'followers') {
      this.postsTab = false
      this.followersTab = true
      this.followingTab = false
    } 
  }
  timeFromNow(time) {
    return this.moment.timeFromNow(time)
  }
  openEditModal(post) {
     this.clickedPost = post
  }

  initEditForm() {
    this.editForm = this.formBuilder.group({
      editedPost: ['', Validators.required]
    })
  }

  submitPost() {
    let body = {
      id: this.clickedPost.postId._id,
      post: this.editForm.value.editedPost 
    }
    this.userService.editPostUser(body).subscribe(() => {
      this.socket.emit('refresh', {})
      M.Modal.getInstance(this.modalEl).close()
      this.editForm.reset()
    })
  }
  deletePost() {  
    this.postService.deletePost(this.clickedPost.postId._id).subscribe(() => {
      M.Modal.getInstance(this.modalEl).close()
      this.socket.emit('refresh', {})
    })
  }
  close() {
    this.editForm.reset()
    M.Modal.getInstance(this.modalEl).close()
  }
}
