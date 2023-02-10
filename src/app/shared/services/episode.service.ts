import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Episode } from '../interfaces/episode.interface'

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  baseurlAPI = 'https://rickandmortyapi.com/api/episode'

  constructor(private http: HttpClient) { }

  searchEpisode(query = '', page = 1) {
    const filter = `${this.baseurlAPI}/?name=${query}&page=${page}`

    return this.http.get<Episode[]>(filter)
  }

  getDetails(id: number) {
    return this.http.get<Episode>(`${this.baseurlAPI}/${id}`)
  }

}
