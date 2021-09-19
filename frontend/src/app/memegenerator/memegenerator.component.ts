import { Component, OnInit, ViewChild } from '@angular/core';
import { ColorEvent } from 'ngx-color';
import { PostService } from '../services/post.service';
import { environment } from 'src/environments/environment';
import io from 'socket.io-client'
import { Router } from '@angular/router';

@Component({
  selector: 'app-memegenerator',
  templateUrl: './memegenerator.component.html',
  styleUrls: ['./memegenerator.component.css']
})
export class GeneratorComponent implements OnInit {
@ViewChild('memeCanvas', { static: false }) myCanvas
topText: string = ''
bottomText: string = ''
caption: string = ''
fileEvent: any
textColor: string = '#000000'
backgroundColor: string = '#F9F9FB'
socket
submitting
  constructor(
    private postService: PostService,
    private router: Router
  ) { 
    this.socket = io(environment.server)
  }

  ngOnInit(): void {
  }
  preview(e: any) {
    this.fileEvent = e
    let canvas = this.myCanvas.nativeElement;
    let ctx = canvas.getContext('2d')
    let render = new FileReader()
    render.readAsDataURL(this.fileEvent.target.files[0])
    render.onload =  function(event) {
      const img = new Image()
      img.src = event.target.result as string
      img.onload = function() {
        ctx.drawImage(img, 50, 150, 600, 500)
      }
    }
  }
  drawText() {
    let canvas = this.myCanvas.nativeElement;
    let ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle =  this.backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    this.preview(this.fileEvent)
    ctx.fillStyle = this.textColor
    ctx.font = '50px Comoic Sans MS'
    ctx.textAlign = 'center'
    ctx.fillText(this.topText, canvas.width/2, 100)
    ctx.fillText(this.bottomText, canvas.width/2, 750)

  }
  canvasTextColor($event: ColorEvent) {
    this.textColor = $event.color.hex
    this.drawText()
  }
  canvasBgColor($event: ColorEvent) {
    this.backgroundColor = $event.color.hex
    this.drawText()
  }
  downloadImg() {
    this.submitting = true
    let body
    let canvas = this.myCanvas.nativeElement
    let image = canvas.toDataURL('image/png')
    let link = document.createElement('a')
    link.download = 'memeImg.png'
    link.href = image
    link.click()
    body = {
      post: this.caption,
      image: image
    }
    this.postService.createPost(body).subscribe(() => {
      this.submitting = false
      this.router.navigate(['/streams'])
    },
     err => console.log(err))
  }
  downloadOnlyImg() {
    let canvas = this.myCanvas.nativeElement
    let image = canvas.toDataURL('image/png')
    let link = document.createElement('a')
    link.download = 'memeImg.png'
    link.href = image
    link.click()
  }
}

