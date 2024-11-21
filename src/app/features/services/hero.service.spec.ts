import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HeroService } from './hero.service';
import { Hero } from '../models/HeroI.interface';
import { HeroResponseI } from '../models/HeroResponseI.interface';
import { of } from 'rxjs';

describe('HeroService', () => {
  let service: HeroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService],
    });
    service = TestBed.inject(HeroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all heroes with pagination and filter by name', () => {
    const mockHeroResponse: HeroResponseI = {
      itemsTotal: 2,
      items: [
        { id: 1, name: 'Hero 1', bio: 'Bio 1', images: [] },
        { id: 2, name: 'Hero 2', bio: 'Bio 2', images: [] },
      ],
    };
    service.getAllHeroes(1, 10, 'Hero').subscribe((response) => {
      expect(response).toEqual(mockHeroResponse);
      expect(response.items.length).toBe(2);
      expect(response.items[0].name).toBe('Hero 1');
    });
    const req = httpMock.expectOne(
      `${service['apiUrl']}?hero_name=Hero&page=1&per_page=10`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroResponse);
  });

  it('should retrieve a hero by ID', () => {
    const mockHero: Hero = { id: 1, name: 'Hero 1', bio: 'Bio 1', images: [] };

    service.getHeroById(1).subscribe((response) => {
      expect(response).toEqual(mockHero);
      expect(response.id).toBe(1);
      expect(response.name).toBe('Hero 1');
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockHero);
  });

  it('should create a new hero', () => {
    const mockHero: Hero = { id: 1, name: 'Hero 1', bio: 'Bio 1', images: [] };

    service.createHero(mockHero).subscribe((response) => {
      expect(response).toEqual(mockHero);
    });
    const req = httpMock.expectOne(`${service['apiUrl']}`);

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockHero);

    req.flush(mockHero);
  });

  it('should update a hero', () => {
    const mockHero: Hero = {
      id: 1,
      name: 'Hero',
      bio: 'Bio',
      images: [],
    };
    const updatedHero: Hero = {
      id: 1,
      name: 'Updated Hero',
      bio: 'Updated Bio',
      images: [],
    };
    service.updateHero(1, mockHero).subscribe((response) => {
      expect(response).toEqual(updatedHero);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(mockHero);

    req.flush(updatedHero);
  });

  it('should delete a hero', () => {
    service.deleteHero(1).subscribe((response) => {
      expect(response).toBeNull();
    });
    const req = httpMock.expectOne(`${service['apiUrl']}/1`);

    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
