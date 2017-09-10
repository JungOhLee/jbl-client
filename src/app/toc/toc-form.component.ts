import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TocService } from '../toc.service';

@Component({
  selector: 'toc-form',
  templateUrl: './toc-form.component.html',
  styles: []
})
export class TocFormComponent implements OnInit{

  topicForm: FormGroup;
  toc = {
    course: "course1",
    topics: [{
      topic: "topic1",
      profs: ["prof1", "prof2"]
    },{
      topic: "topic2",
      profs: ["prof2","prof3"]
    },{
      topic: "topic3",
      profs: ["prof3","prof4"]
    }]
  }
  topicList: Array<string> =[];
  profList: Array<string> =[];

  showCourseInput: boolean = false;
  showTopicInput: boolean = false;
  showProfInput= [];

  constructor(
    private fb: FormBuilder,
    private tocService: TocService,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.createForm();
    this.route.params.subscribe(param => {
      if(param.course){
        this.setToc(param.course)
      }
    })
  }

  ngOnInit(){
  }

  createForm(){
    this.topicForm = this.fb.group({
      topic: [""],
      profs: this.fb.array([[""]])
    })
  }

  get topic(): FormControl { return this.topicForm.get('topic') as FormControl; }
  get profs(): FormArray { return this.topicForm.get('profs') as FormArray; }

  addProf() {
    this.profs.push(this.fb.control('', Validators.required));
  }
  deleteProf(index){
    this.profs.removeAt(index);
  }

  setToc(course){
    this.tocService.getToc(course)
      .subscribe( res => {
        console.log(res);
        this.toc=res;
        this.setTopicList();
        this.setProfList();
      })
  }
  setTopicList(){
    this.topicList = this.toc.topics.map(item => item.topic);
  }
  setProfList(){
    this.toc.topics.map(item => {
      for(let prof of item.profs){
        if (this.profList.indexOf(prof) == -1) {
          this.profList.push(prof);
      }
    }})
  }

  toggleCourseInput(){
    this.showCourseInput = !this.showCourseInput;
  }
  toggleTopicInput(){
    this.showTopicInput = !this.showTopicInput;
  }
  toggleProfInput(i){
    this.showProfInput[i] =!this.showProfInput[i];
  }
  addTopic(){
    const saveValue = this.topicForm.value
    this.topicForm.reset();
    this.toc.topics.push(saveValue);
  }
  deleteTopic(i){
    this.toc.topics.splice(i,1);
  }

  saveToc(){
    const saveValue = this.prepareSave();
    this.tocService.addToc(saveValue)
      .subscribe( res => {
        console.log(res);
        this.router.navigate(['/toc',saveValue.course]);
      })
  }
  prepareSave(){
    const currentToc = this.toc
    const topicsDeepCopy = currentToc.topics.map(topic => {
      return {
        topic: topic.topic,
        profs: topic.profs.join(",")
      }
    })
    const saveToc = {
      course: currentToc.course,
      topics: topicsDeepCopy
    }
    return saveToc
  }
}
