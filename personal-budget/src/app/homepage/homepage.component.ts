import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, OnInit, ViewChildren } from '@angular/core';
import { ArticleComponent } from '../article/article.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import { ElementRef,ViewChild } from '@angular/core';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { D3Service } from '../services/d3.service';
import { DataService } from '../services/data.service';




@Component({
  selector: 'pb-homepage',
  standalone: true,
  imports: [ArticleComponent,HttpClientModule,BreadcrumbsComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})

export class HomepageComponent implements AfterViewInit,OnInit{

  public chart:any;
  /*dataSource ={datasets: [{data: [],
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
                    }; */

  public chartData= [];
  public ctx:any;
  private colors: any;
  private svg: any;
  constructor(private http:HttpClient, private element:ElementRef,private d3service:D3Service,private dataService:DataService){

  }
  ngOnInit(): void {
   this.dataService.getBudgetData();
   this.chartData= this.dataService.chartData;
  }

  ngAfterViewInit(): void {
    this.createChart();
    this.createDonutChart(this.dataService.chartData);
  }

  /**
   * Function to create pie chart
   */
  createChart(){
    const ctx = this.element.nativeElement.querySelector(`#myChart`);
    this.chart = new Chart(ctx, {
        type: 'pie',
        data: this.dataService.dataSource
    });
  }

  private margin = { top: 10, right: 30, bottom: 30, left: 40 };
  private width = 800;
  private height = 400;
  private radius = Math.min(this.width,this.height) / 2 - this.margin.left;
  createDonutChart(data) {
    const colorsRange = [
      '#ffcd56',
      '#ff6384',
      '#f6a2eb',
      '#fd6b19',
      'green',
      'yellow',
      'blue'
    ];


    this.colors = this.d3service.d3
    .scaleOrdinal()
    .domain(data.map(d => d.value.toString()))
    .range(colorsRange);

    this.svg = this.d3service.d3
       .select("figure#donut")
        .append("svg")
      .attr("viewBox", `0 0 ${this.width} ${this.height}`)
        .append("g")
        .attr("transform", `translate(${this.width / 2},${this.height / 2})`);;


    //var data_ready = pie(this.chartData);
    var pie = this.d3service.d3.pie()
        .sort(null)
        .value(d => d.value);

    var arc = this.d3service.d3.arc()
        .outerRadius(this.radius * 0.8)
        .innerRadius(this.radius * 0.4);

    var outerArc = this.d3service.d3.arc()
        .innerRadius(this.radius * 0.9)
        .outerRadius(this.radius * 0.9);


    /* ------- PIE SLICES -------*/
     this.svg.selectAll("allSlices")
                //.selectAll("path.slice")
                .data(pie(this.chartData))
                .enter()
                .append("path")
                .attr("d",arc)
                .attr("fill", d => this.colors(d.data.value))
                .attr("class", "slice")
                .attr("stroke", "white")
                .style("stroke-width", "2px")
                .style("opacity", 0.7);



    /* ------- TEXT LABELS -------*/
     this.svg.selectAll("allLabels")
      .data(pie(this.chartData))
      .enter()
      .append("text")
      .attr("dy", ".45em")
      .text(function(d) {
        return d.data.name
      })
      .attr("transform", d => {
        var pos = outerArc.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = this.radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return "translate(" + pos + ")";
      }).style("text-anchor", d =>{
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          return midangle < Math.PI ? "start":"end";
      });



    /* ------- SLICE TO TEXT POLYLINES -------*/

     this.svg.selectAll("allPolylines")
      .data(pie(this.chartData))
      .enter()
      .append("polyline")
      .style("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .attr("points", d => {
        var posA = arc.centroid(d); // line insertion in the slice
        var posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
        var posC = outerArc.centroid(d); // Label position = almost the same as posB
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = this.radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC];
      });
    }

}
