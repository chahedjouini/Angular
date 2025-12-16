import { Component } from '@angular/core';
import { Suggestion } from '../../models/suggestion';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent {
  searchText: string = '';
  
  suggestions: Suggestion[] = [
    {
      id: 1,
      title: 'Organiser une journée team building',
      description: 'Suggestion pour organiser une journée de team building pour renforcer les liens entre les membres de l\'équipe.',
      category: 'Événements',
      date: new Date('2025-01-20'),
      status: 'acceptee'
    },
    {
      id: 2,
      title: 'Améliorer le système de réservation',
      description: 'Proposition pour améliorer la gestion des réservations en ligne avec un système de confirmation automatique.',
      category: 'Technologie',
      date: new Date('2025-01-15'),
      status: 'refusee'
    },
    {
      id: 3,
      title: 'Créer un système de récompenses',
      description: 'Mise en place d\'un programme de récompenses pour motiver les employés et reconnaître leurs efforts.',
      category: 'Ressources Humaines',
      date: new Date('2025-01-25'),
      status: 'refusee'
    },
    {
      id: 4,
      title: 'Moderniser l\'interface utilisateur',
      description: 'Refonte complète de l\'interface utilisateur pour une meilleure expérience utilisateur.',
      category: 'Technologie',
      date: new Date('2025-01-30'),
      status: 'en_attente'
    },
    {
      id: 5,
      title: 'Formation à la sécurité informatique',
      description: 'Organisation d\'une formation sur les bonnes pratiques de sécurité informatique pour tous les employés.',
      category: 'Formation',
      date: new Date('2025-02-05'),
      status: 'acceptee'
    }
  ];

  favorites: Suggestion[] = [];
  likes: { [key: number]: number } = {};

  // Méthode pour incrémenter les likes
  incrementLike(suggestionId: number): void {
    if (!this.likes[suggestionId]) {
      this.likes[suggestionId] = 0;
    }
    this.likes[suggestionId]++;
  }

  // Méthode pour ajouter aux favoris
  addToFavorites(suggestion: Suggestion): void {
    if (!this.favorites.find(fav => fav.id === suggestion.id)) {
      this.favorites.push(suggestion);
      alert(`"${suggestion.title}" ajouté aux favoris!`);
    } else {
      alert('Cette suggestion est déjà dans vos favoris!');
    }
  }

  // Méthode pour obtenir le nombre de likes
  getLikes(suggestionId: number): number {
    return this.likes[suggestionId] || 0;
  }

  // Méthode pour filtrer les suggestions
  getFilteredSuggestions(): Suggestion[] {
    if (!this.searchText) {
      return this.suggestions;
    }
    
    const searchLower = this.searchText.toLowerCase();
    return this.suggestions.filter(suggestion =>
      suggestion.title.toLowerCase().includes(searchLower) ||
      suggestion.category.toLowerCase().includes(searchLower)
    );
  }
}