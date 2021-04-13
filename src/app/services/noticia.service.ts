import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  constructor( private http: HttpClient ) { }

  getNoticia() {
    return this.http.get<RespuestaTopNoticia>(`https://newsapi.org/v2/top-headlines?country=mx&apiKey=e97189003c5841a085939b61ca33904e`);
  }
}

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
