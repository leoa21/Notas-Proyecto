import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  // Inyeccion de dependencias
  constructor( private http: HttpClient ) { }

  // Funcion encargada de hacer la peticion a la API de noticias
  getNoticia() {
    return this.http.get<RespuestaTopNoticia>(`https://newsapi.org/v2/top-headlines?country=mx&apiKey=${apiKey}`);
  }
  
}

// Interfaces que usaremos para la creacion de las noticias 

export interface RespuestaTopNoticia{
  status: string;
  totalResultas: number;
  articles: Article[];
}

export interface Article{
  source: Source;
  author?: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content?: string;
}

export interface Source{
  id?: string;
  name: string;
}
