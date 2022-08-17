import { HttpClient, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const UPLOADS_API = 'http://localhost:8080/files';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
 
  constructor(private http: HttpClient) { }
  
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${UPLOADS_API}/photos`, formData, {
      reportProgress: false,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  // pasidarit backEnd servisa visem paveiksliukam , jai reikia???
  getFiles(): Observable<any> {
    return this.http.get(`${UPLOADS_API}/files`);
  }
  
  // turi atsisiust viena faila pagal pavadinima
  fetchRecipeImage(photoId:any): Observable<Blob> {
    let url = UPLOADS_API + '/photo/' + photoId ;
    console.log("Profile image URL is " + url);

    return this.http.get(url, { responseType: 'blob' });
  }
}