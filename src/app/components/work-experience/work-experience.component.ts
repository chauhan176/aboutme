import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.css']
})
export class WorkExperienceComponent implements OnInit {

  constructor(private apiService: ApiService) { 
  }

  ngOnInit(): void {
    this.apiService.updateworkexp().subscribe((data)=>{
      console.log(data);
    });
  }

}
