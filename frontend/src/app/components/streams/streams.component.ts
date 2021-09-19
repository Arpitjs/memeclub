import { Component, Input, OnInit } from '@angular/core';
import * as M from 'materialize-css'

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})
export class StreamsComponent implements OnInit {
  streams = false
  topStreams = false
  constructor() { }

  ngOnInit(): void {
    this.streams = true
    let tabs = document.querySelector('.tabs')
    M.Tabs.init(tabs, {})
  }
  changeTabs(val) {
    if(val === 'streams') {
      this.streams = true
      this.topStreams = false
    }
    if(val === 'top') {
      this.streams = false
      this.topStreams = true
    }
  }
  
}