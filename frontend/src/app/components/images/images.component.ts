import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload'
import { environment } from 'src/environments/environment';
import { ImageService } from 'src/app/services/image.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import io from 'socket.io-client'

let URL = environment.backendUrl + 'upload-image'
@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  uploader: FileUploader = new FileUploader({ url: URL, disableMultipart: true })
  selectedFile
  images = []
  user
  socket
  constructor(
    private imgService: ImageService,
    private tokenService: TokenService,
    private userService: UserService
  ) { 
    this.socket = io(environment.server)
  }

  ngOnInit(): void {
    this.user = this.tokenService.GetPayload()
    this.GetUser()
    this.socket.on('refreshPage', () => this.GetUser())
  }
  GetUser() {
    this.userService.getUserById(this.user._id).subscribe((res: any)=> {
      console.log(res)
      if(res.images.length) this.images = res.images
    }) 
  }
  onSelect(e) {
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
  upload() {
    if(this.selectedFile) {
      this.imgService.AddImage(this.selectedFile).subscribe(() => {
        this.socket.emit('refresh', {})
        let filePath = <HTMLInputElement>document.getElementById('filePath')
        filePath.value = ''
      }, err => console.log(err))
    }
  }
  setPFP(image) {
    this.imgService.changePFP(image).subscribe(() => this.socket.emit('refresh', {}), 
    err => console.log(err))
  }
}
