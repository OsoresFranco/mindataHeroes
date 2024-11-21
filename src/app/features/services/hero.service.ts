import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../models/HeroI.interface';

@Injectable()
export class HeroService {
  private readonly apiUrl =
    'https://x8ki-letl-twmt.n7.xano.io/api:Ldswh5fJ/hero';

  constructor(private http: HttpClient) {}

  getAllHeroes(heroName: string = ''): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.apiUrl}?hero_name=${heroName}`);
  }

  getHeroById(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.apiUrl}/${id}`);
  }

  createHero(payload: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.apiUrl}`, payload);
  }

  updateHero(id: number, payload: Hero): Observable<Hero> {
    return this.http.patch<Hero>(`${this.apiUrl}/${id}`, payload);
  }

  deleteHero(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
