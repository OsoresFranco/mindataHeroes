import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Hero } from '../models/HeroI.interface';
import { HeroResponseI } from '../models/HeroResponseI.interface';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private readonly apiUrl =
    'https://x8ki-letl-twmt.n7.xano.io/api:Ldswh5fJ/hero';

  constructor(private readonly http: HttpClient) {}

  private readonly updateSubject = new BehaviorSubject<string>('asd');
  isUpdated$ = this.updateSubject.asObservable();

  updateEmitter(): void {
    const hash = Math.random().toString();
    this.updateSubject.next(hash);
  }

  getAllHeroes(
    page: number,
    per_page: number,
    heroName: string = ''
  ): Observable<HeroResponseI> {
    return this.http.get<HeroResponseI>(
      `${this.apiUrl}?hero_name=${heroName}&page=${page}&per_page=${per_page}`
    );
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
