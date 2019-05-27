import { Component, OnInit, Input } from '@angular/core';
import {  FormGroup, FormControl } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-new-project-form',
  templateUrl: './new-project-form.component.html',
  styleUrls: ['./new-project-form.component.css']
})
export class NewProjectFormComponent implements OnInit {
 
 //@Input('newProjectForm') public newProjectForm:NgForm;
  constructor(private projectService:ProjectService) { }

  ngOnInit() {
  }

 newProjectForm = new FormGroup({
  title:new FormControl(''),
  description:new FormControl('')
 });

  createNewProject=function(){
    this.newProjectForm.submitted=true;
    console.log(`new project create form submitted:`,this.newProjectForm);
    this.projectService.createNewProject(this.newProjectForm.value)
  }

}
