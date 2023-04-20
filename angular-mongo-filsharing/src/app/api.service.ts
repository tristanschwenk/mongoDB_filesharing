import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = "http://localhost:3333"
  constructor(
    private http:HttpClient,
  ) { }

  getFiles() {
    return this.http.get(`${this.baseUrl}/files`)
  }

  getFile(filename: string) {
    return `${this.baseUrl}/files/${filename}`
  }

  addFile(formData: FormData)  {
    return this.http.post(`${this.baseUrl}/files`, formData)
  }

  deleteFile(filename: string) {
    return this.http.delete(`${this.baseUrl}/files/${filename}`)
  }
}
