import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  constructor(public ytservice: YoutubeService) {
    this.ytservice.getVideos();
   }

  ngOnInit() {
  }

}
