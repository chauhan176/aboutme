import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-technical-skills',
  templateUrl: './technical-skills.component.html',
  styleUrls: ['./technical-skills.component.css']
})
export class TechnicalSkillsComponent implements OnInit {

  constructor(private apiService: ApiService) { 
  }

  ngOnInit(): void {
    this.apiService.updatetechskills().subscribe((data)=>{
      console.log(data);
    });
  }

}
