import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memeapi',
  templateUrl: './memeapi.component.html',
  styleUrls: ['./memeapi.component.css']
})
export class MemeapiComponent implements OnInit {
  apiImgs = []
  url = 'https://api.imgflip.com/get_memes'

  constructor() { }

  ngOnInit(): void {
    this.getImages()
  }
  async callApi() {
    let data = await fetch(this.url)
    return data.json()
  }
 getImages() {
   this.callApi()
   .then(response => response.data.memes.forEach(meme => this.apiImgs.push(meme.url)))
   .catch(err => console.log(err))
 }
}
