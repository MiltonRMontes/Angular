import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log("Listo")
  }

  getNewReleases() {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQDvQAKZjFLQCkjQ2qyTZAxpyAbuYFestgzsHdMkpkpMuX3cfO5dI5iFbEGWf23odb_hR1mtoGjfzVBc7jI'
    });

    this.http.get('https://api.spotify.com/v1/browse/new-releases', { headers }).subscribe(data => {
      console.log(data);
    });
  }

}
