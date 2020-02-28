import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ChatModel} from '../model/chat.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private basicURL = '/api';
  private chatURL = this.basicURL + '/chat';

  constructor(private http: HttpClient) { }


  // Chat part
  getChatHistory(from: string, to: string): Observable<any> {
    return this.sendRequest('get', this.chatURL + `/${from}/${to}`);
  }
  addChatHistory(chat: ChatModel): Observable<any> {
    return this.sendRequest('post', this.chatURL, chat);
  }

  /**
   * Total request function.
   * @param verb
   * @param url
   * @param body
   */
  private sendRequest<T>(verb: string, url: string, body?: any): Observable<T> {
    let headerOptions = new HttpHeaders();
    headerOptions = headerOptions.set( 'Access-Key', '<secret>');
    headerOptions = headerOptions.set( 'Application-Name', ['BTD system', 'Jim']);
    return this.http.request<T>(verb, url, {
      body: body,
      headers: headerOptions
    });
  }
}
