import { Pokemon } from "pokeapi-typescript";

export interface PokemonData {
  name: string;
  imageUrl: string;
}

interface PokemonListResponse {
  count: number;
  next: string;
  previous: string | null;
  results: PokemonSummary[];
}

interface PokemonSummary {
  name: string;
  url: string;
}

interface PokemonDetails {
  sprites: sprites;
  species: species;
  url: string;
}

interface sprites {
  front_default: string;
}

interface species {
  name: string;
}

export class PokeServices {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';
  private readonly baseListUrl = `${this.baseUrl}/pokemon`;
  private nextListUrl = this.baseListUrl;

  public reset() {
      this.nextListUrl = this.baseListUrl;
  }

  async getPokemonFullData(url: string): Promise<Pokemon> {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error('Error fetching poke');
      }

      const data: Pokemon = await response.json();

      return data;
  }

  async getPokemonData(url: string): Promise<PokemonData> {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error('Error fetching poke');
      }

      const data: Pokemon = await response.json();

      const pokemon: PokemonData = {
          name: data.species.name,
          imageUrl: data.sprites.front_default,
      };

      return pokemon;
  }

  async getPokemonList(): Promise<string[]> {
      console.log(this.nextListUrl);

      const response = await fetch(this.nextListUrl);
      if (!response.ok) {
          throw new Error('Error trayendo los pokemones');
      }

      const data: PokemonListResponse = await response.json();
      this.nextListUrl = data.next;

      return data.results.map(p => p.url);
  }
}
