import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import io from 'socket.io-client'
import { environment } from 'src/environments/environment';
import { FileUploader } from 'ng2-file-upload';

let URL = environment.backendUrl + 'upload-image'
@Component({
  selector: 'app-posts-form',
  templateUrl: './posts-form.component.html',
  styleUrls: ['./posts-form.component.css']
})
export class PostsFormComponent implements OnInit {
  uploader: FileUploader = new FileUploader({ url: URL, disableMultipart: true })
  postForm: FormGroup
  socket
  err = false
  selectedFile
  submitting
  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService
  ) { 
    this.socket = io(environment.server)
  }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      post: ['', Validators.required]
    })
  }

  onFileSelected(e) {
    let file: File = e[0]
    this.readAsBase64(file)
    .then(result => this.selectedFile = result)
    .catch(e => console.log(e))
  }

  readAsBase64(file) {
    let reader = new FileReader()
    return new Promise((res, rej) => {
      reader.addEventListener('load', () => res(reader.result))
      reader.addEventListener('error', e => rej(e))
      reader.readAsDataURL(file)
    })
  }

  createPost(){
    this.submitting = true
    let body
    if(!this.selectedFile) {
      body = {
        post: this.postForm.value.post
      }
    } else {
        body = {
          post: this.postForm.value.post,
          image: this.selectedFile
        }
     
    }
    this.postService.createPost(body).subscribe(() => {
      this.submitting = false
      this.socket.emit('refresh', {})
      this.postForm.reset()
    }, err => this.err = true)
  }
  
}
