import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styles: []
})
export class ArtistComponent implements OnInit {

  artist: any = {};
  loadingArtist: boolean;
  topTracks: any[];

  constructor(private router: ActivatedRoute,
              private spotify: SpotifyService) {
    this.loadingArtist = true;
    this.router.params.subscribe( params => {
      this.getArtista(params.id);
      this.getTopTracks(params.id);
      console.log(params.id);
    });
  }

  getArtista(id: string) {
    this.spotify.getArtist(id)
        .subscribe( artist => {
          this.artist = artist;
          this.loadingArtist = false;
        });
  }

  getTopTracks(id: string) {
    this.spotify.getTracks(id)
      .subscribe(topTracks => {
        console.log(topTracks);
        this.topTracks = topTracks;
      });
  }

  ngOnInit() {
  }

}
