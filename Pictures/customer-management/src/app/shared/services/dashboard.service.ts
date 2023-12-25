import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = 'http://localhost:3000/customer';

  constructor(private http: HttpClient) {}

  getCustomer() {
    return this.http.get<any[]>(this.apiUrl);
  }

  saveCustomer(formvalue: any) {
    console.log(formvalue.id);

    if (formvalue.id) {
      return this.http.put<any[]>(`${this.apiUrl}/${formvalue.id}/`, formvalue);
    } else {
      return this.http.post<any[]>(this.apiUrl, formvalue);
    }
  }

  deleteCustomer(id: any) {
    return this.http.delete<any[]>(`${this.apiUrl}/${id}/`);
  }
}
