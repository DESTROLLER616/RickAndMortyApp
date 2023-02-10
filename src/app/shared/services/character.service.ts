import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  baseUrlAPI = 'https://rickandmortyapi.com/api/character'

  constructor(private http: HttpClient) { }

  searchCharacters(query = '', page = 1) {
    const filter = `${this.baseUrlAPI}/?name=${query}&page=${page}`

    return this.http.get<Character[]>(filter)
  }

  getDetails(id: number) {
    return this.http.get<Character>(`${this.baseUrlAPI}/${id}`)
  }
}
