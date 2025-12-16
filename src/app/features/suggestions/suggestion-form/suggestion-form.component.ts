import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {
  suggestionForm!: FormGroup;
  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  // Liste temporaire pour auto-incrément (copie de list-suggestion ; remplace par service plus tard)
  suggestions: Suggestion[] = [ /* Ta liste ici */ ];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.suggestionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^[A-Z][a-zA-Z]*$/)]],
      description: ['', [Validators.required, Validators.minLength(30)]],
      category: ['', Validators.required],
      date: [{ value: new Date().toISOString().split('T')[0], disabled: true }],  // Date système au format YYYY-MM-DD
      status: [{ value: 'en attente', disabled: true }]
    });
  }

  onSubmit(): void {
    if (this.suggestionForm.valid) {
      const newId = this.suggestions.length ? Math.max(...this.suggestions.map(s => s.id)) + 1 : 1;
      const newSuggestion: Suggestion = {
        id: newId,
        title: this.suggestionForm.get('title')?.value,
        description: this.suggestionForm.get('description')?.value,
        category: this.suggestionForm.get('category')?.value,
        date: new Date(),
        status: 'en attente',
        likes: 0
      };
      // Ajoute à la liste temporaire (plus tard, via POST HTTP)
      this.suggestions.push(newSuggestion);
      this.router.navigate(['/suggestions']);
    }
  }
}
