import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProblemService } from '../problem.service';
import { Problem, courseList, topicList } from './problem';
@Component({
  selector: 'problem-form',
  templateUrl: './problem-form.component.html',
  styles: []
})
export class ProblemFormComponent implements OnInit {

  problemForm: FormGroup;
  problem: Problem;
  courseList = courseList;
  topicList = topicList;

  constructor(
    private fb: FormBuilder,
    private problemService: ProblemService,
  ){
    this.createForm()
  }

  ngOnInit(){

  }

  ngOnChanges() {
  this.problemForm.reset({
    // topic: this.problem.topic,
    // course: this.problem.course
  })
  }

  createForm(){
    this.problemForm = this.fb.group({
      topic: ['', Validators.required],
      course: ['', Validators.required],
      year: ['', Validators.required],
      answer: ['', Validators.required],
      tags: [],
      question: ['', Validators.required],
      commentsCount: 0,
      number: '',
    })
  }

  onSubmit(){
    this.problem = this.problemForm.value;
    this.problemForm.reset()
    this.problemService.addProblem(this.problem);

  }
  revert(){
    this.ngOnChanges();
  }
  get answer() { return this.problemForm.get('answer'); }


}
