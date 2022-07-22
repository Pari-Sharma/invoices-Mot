import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AllApiCallsService {

  constructor(private http: HttpClient) { }

  uploadAllFile(value:any , folder:any , subfolder:any){
    const formData = new FormData()
    formData.append('files' , value)
      let headers = new HttpHeaders({
        'Content-Type': 'multipart/form-data',
      });
      let url = `https://localhost:44323/Api/bucket/upload?folder=${folder}&subfolder=${subfolder}`
      return this.http.post<any>(url,formData)
  }
}
