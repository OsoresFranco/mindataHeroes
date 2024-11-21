import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CoreModule } from '../../../core/core.module';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-dynamic-form',
  imports: [CoreModule, ReactiveFormsModule, FormsModule],
  providers: [HeroService],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent implements OnInit {
  id: number | null = null;
  heroForm!: FormGroup;
  title: string = '';
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private heroService: HeroService
  ) {}

  ngOnInit(): void {
    this.setForm();
    this.formHasValue();
  }

  formHasValue(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.heroService.getHeroById(this.id).subscribe({
        next: (hero) => {
          this.title = `Edit ${hero.name}`;
          this.isEditing = true;
          this.heroForm.patchValue({
            id: hero.id,
            name: hero.name,
            bio: hero.bio,
          });
          for (let i in hero.images) {
            this.pictures.push(
              this.fb.control(hero.images[i], Validators.required)
            );
          }
        },
      });
    } else {
      this.title = `Create a Hero`;
    }
  }

  setForm(): void {
    this.heroForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      bio: ['', [Validators.required]],
      images: this.fb.array([]),
    });
  }

  get pictures(): FormArray {
    return this.heroForm.get('images') as FormArray;
  }

  addPicture(): void {
    if (this.pictures.length < 5) {
      this.pictures.push(this.fb.control('', Validators.required));
    }
  }

  removePicture(index: number): void {
    this.pictures.removeAt(index);
  }

  onSubmit(): void {
    if (this.heroForm.valid) {
      this.isEditing ? this.onUpdateHero() : this.onCreateHero();
    } else {
      this.heroForm.markAllAsTouched();
    }
  }

  redirectToDashboard(): void {
    this.router.navigate(['/']);
  }

  onCreateHero(): void {
    this.heroService.createHero(this.heroForm.value).subscribe({
      next: () => {
        this.redirectToDashboard();
      },
    });
  }
  onUpdateHero(): void {
    this.heroService
      .updateHero(this.heroForm.get('id')?.value, this.heroForm.value)
      .subscribe({
        next: () => {
          this.redirectToDashboard();
        },
      });
  }
}
