// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams  } from '@angular/common/http';

// import { map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class YoutubeService {

//   URL: string = 'https://www.googleapis.com/youtube/v3/';
//   apiKey: string = 'AIzaSyB6lZ_75GvXK68eJEieoGdx0OkMwWKCR5o';
//   playlist:string = 'UUekK1yPlqfrKyafksV-0ecg';

//   constructor(public http: HttpClient) {
//     this.getVideos();
//    }

//   getVideos( ) {
//     const url = `${this.URL}playlistItems`;
//     let params = new HttpParams();

//     params = params
//     .set('part', 'snippet')
//     .set('playlistId', this.playlist)
//     .set('maxResults', '10')
//     .set('key', this.apiKey );

//     return this.http.get(url, { params })
//     .subscribe((res: any) => {
//       console.log(res);
//     });
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Http,  URLSearchParams } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private playlist   = 'UUuaPTYj15JSkETGnEseaFFg'; // playlistItems
  private apikey     = 'AIzaSyDZGZXScrp4S0YHescCGHKGsEAX7mRCV58';
  private nextPageToken = '';
  // la sintaxis correcta es
  // youtubeUrl: string = "ht";
  constructor(public http: Http) { }
getVideos () {
  const parametros = new HttpParams()
    .set('part', 'snippet')
    .set('maxResults', '10')
    .set('playlistId', this.playlist)
    .set('key', this.apikey);
 
  let url = `${this.youtubeUrl}/playlistItems`;
 
  let params = new URLSearchParams();
  params.set('part', 'snippet');
  params.set('maxResults', '10'); 
  params.set('playlistId', this.playlist);
  params.set('key', this.apikey);
  if(this.nextPageToken) {
    params.set('pageToken', this.nextPageToken);
  }
 
 
  return this.http.get(url,{search: params}).pipe(map(res => {
    console.log('yo');
    console.log(res);
    console.log(res.json);
    console.log(res.json().nextPageToken);
    this.nextPageToken = res.json().nextPageToken;
    let videos:any[] = [];
    for (let video of res.json().items) {
            let snippet = video.snippet;
            videos.push( snippet);
     }
    return videos;
    }));
}
 
}
 
