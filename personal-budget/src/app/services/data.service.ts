import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService  {

  public chartData =[];
  dataSource ={datasets: [{data: [],
                  backgroundColor: [
                      '#ffcd56',
                      '#ff6384',
                      '#f6a2eb',
                      '#fd6b19',
                      'green',
                      'yellow',
                      'blue'
                  ]
                  }],
              labels: []
              };
  constructor(private http:HttpClient) { }

  getBudgetData() {
    if(this.chartData.length ===0 ){
      this.http.get('http://localhost:3000/budget')
      .subscribe((res:any) =>{
        for (let i = 0; i < res.myBudget.length; i++) {
          this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
          this.dataSource.labels[i] = res.myBudget[i].title;

          const budgetItem = {
              value: res.myBudget[i].budget,
              name: res.myBudget[i].title
          };
          // Add the created object to the array
          this.chartData.push(budgetItem);
        }
      });
    }
  }

}
