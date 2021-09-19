import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { environment } from 'src/environments/environment';
import io from 'socket.io-client'
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, AfterViewInit {
toolbarEl
post = []
comments
socket
currentPost
commentGroup: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private moment: MomentService
  ) {
    this.socket = io(environment.server)
   }

  ngOnInit(): void {
    this.toolbarEl = document.querySelector('.nav-content')
    this.commentGroup = this.formBuilder.group({
      comment: ['', Validators.required ]
    })
    this.post = this.activatedRoute.snapshot.params.id
    this.getPost()
    this.socket.on('refreshPage', () => this.getPost())
  }
  ngAfterViewInit() {
    this.toolbarEl.style.display = 'none'
  }
  commentIt() {
    this.postService.addComment(this.commentGroup.value, this.post).subscribe(() => {
      this.commentGroup.reset()
   this.socket.emit('refresh', {})
    }, err => console.log(err))
  }
  getPost() {
    this.postService.getPost(this.post).subscribe((res: any) =>{
      this.comments = res.comments.reverse()
      this.currentPost = res.post
    }, err => console.log(err) )
  }
  timeFromNow(time) { return this.moment.timeFromNow(time) }
}
