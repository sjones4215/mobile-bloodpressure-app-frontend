import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VitalsData } from '../models/vitals-data';

@Injectable({
  providedIn: 'root'
})
export class VitalsService {
  baseUrl: string = environment.baseUrl
  constructor(private http: HttpClient) { }

  getAllVitals():Observable<VitalsData>{
   return this.http.get<VitalsData>( this.baseUrl + 'vitals/index')
  }

  deleteVital(id: number) {
    return this.http.delete(this.baseUrl + 'vitals/destroy?id=' + id)
  }

  vitalsByMonth() {
    
  }
}
