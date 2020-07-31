import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(private apiService: ApiService) { 
  }

  ngOnInit(): void {
    this.apiService.updateprojects().subscribe((data)=>{
      console.log(data);
    });
  }

}
