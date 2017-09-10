import { Component, Input, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { ProblemService } from '../problem.service';
import { Problem } from './problem';
import { TocService } from '../toc.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Ng2Summernote } from 'ng2-summernote/ng2-summernote';

import 'rxjs/add/operator/filter';
// TODO adding duplicate validators

@Component({
  selector: 'problem-form',
  templateUrl: './problem-form.component.html',
  styles: []
})
export class ProblemFormComponent implements OnInit {

  problemForm: FormGroup;
  problemInfoForm;
  @Input() problem: Problem;
  newProblem: Problem;
  tocs: Array<any>;
  yearList: Array<string> = ["2017","2016","2015","2014","2013"];
  courseList: Array<string>;
  topicList: Array<string>;
  profList;
  showModal=false;

  constructor(
    private fb: FormBuilder,
    private problemService: ProblemService,
    private tocService: TocService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {
    this.createForm();
    // problem-info: year -> course -> topic -> prof

    this.tocService.getAllTocs()
      .subscribe(res => {
        this.tocs=res;
        this.updateCourseList();
        this.checkRouteId();
      });
  }

  ngOnInit(){
  }

  createForm() {
    this.problemForm = this.fb.group({
      info: this.fb.group({
        topic: ['', Validators.required],
        course: ['', Validators.required],
        year: ['', Validators.required],
        profs: this.fb.array([['',Validators.required]], Validators.required)
      }),
      question: ['질문', Validators.required],
      answer: ['', Validators.required],

      tags: this.fb.array([]),
      commentsCount: 0,
      numbers: ['', Validators.pattern('^[^0].*')],
    });
    this.problemInfoForm = this.problemForm.get('info');
  }

  checkRouteId(){
    this.route.params.subscribe(param => {
      console.log("param id:", param.id); //for debug
      if(param.id){
        this.problemService.getProblem(param.id)
          .subscribe(res => {
            this.problem = res;
            this.getAllList(this.problem);
            this.setFormValue(this.problem);
          });
      }
    })
  }

  setFormValue(problem) {
    let value = {
      info: {
        topic: problem.topic,
        course: problem.course,
        year: problem.year,
        profs: ['']
      },
      question: problem.question,
      answer: problem.answer,
      tags: [],
      numbers: problem.numbers.join(","),
      commentsCount: 0
    };
    this.problemForm.setValue(value);
    this.setProfs(problem.profs);
    this.setTags(problem.tags);
    console.log(this.problemForm);
  }

  setProfs(profs: string[]) {
    const profFCs = profs.map(prof => this.fb.control(prof, Validators.required));
    const profFormArray = this.fb.array(profFCs);
    this.problemInfoForm.setControl('profs', profFormArray);
  }

  setTags(tags: string[]) {
    const tagFGs = tags.map(tag => this.fb.group({ body: tag }));
    const tagFormArray = this.fb.array(tagFGs);
    this.problemForm.setControl('tags', tagFormArray);
  }

  addTag() {
    this.tags.push(this.fb.group({ body: '' }));
  }
  deleteTag(index) {
    this.tags.removeAt(index);
  }
  addProf() {
    this.profs.push(this.fb.control('', Validators.required));
  }
  deleteProf(index){
    this.profs.removeAt(index);
  }

  get question() { return this.problemForm.get('question'); }
  get answer() { return this.problemForm.get('answer'); }
  get numbers() { return this.problemForm.get('numbers'); }
  get tags(): FormArray { return this.problemForm.get('tags') as FormArray; }
  get course() { return this.problemForm.get('info.course')}
  get year() { return this.problemForm.get('info.year')}
  get topic() { return this.problemForm.get('info.topic') }
  get profs(): FormArray { return this.problemForm.get('info.profs') as FormArray; }


  // Getting Select Box List //
  updateCourseList() {
    const courseControl = this.problemInfoForm.get('course');
    const topicControl = this.problemInfoForm.get('topic');
    this.courseList=this.tocs.map(toc => toc.course);
  }

  updateTopicList(course) {
    const topicControl = this.problemInfoForm.get('topic');
    topicControl.setValue('');
    let toc = this.tocs.find(toc => toc.course === course);
    this.topicList = toc.topics.map(topic => topic.topic);
  }

  updateProfList(topicTitle, course) {
    course = course || this.course.value;
    this.problemInfoForm.setControl('profs', this.fb.array([['',Validators.required]], Validators.required))
    let toc = this.tocs.find(toc => toc.course === course);
    let topic = toc.topics.find(topic => topic.topic=== topicTitle );
    this.profList = topic.profs.map(prof => prof);
  }

  getAllList(problem){
    this.updateTopicList(problem.course);
    this.updateProfList(problem.topic, problem.course);
  }

  // Submit or Cancel //
  onSubmit() {
    this.newProblem = this.prepareSave();
    console.log(this.newProblem);
    if(this.problem) {
      this.problemService.updateProblem(this.newProblem)
        .subscribe(res => {
          let problem = res;
          console.log("Save problem succeeded!", problem);
          this.router.navigate(['/problem', problem.id]);
        });
    } else {
      this.problemService.addProblem(this.newProblem)
        .subscribe(res => {
          let problem = res;
          console.log("Save problem succeeded!", problem);
          this.router.navigate(['/problem', problem.id]);
        });
    }

  }

  cleanNum(){
    this.numbers.setValue(this.numbers.value.replace(/ /g, ""))
  }

  prepareSave(): Problem {
    const formModel = this.problemForm.value;
    console.log("formModel:", formModel);
    const tagsDeepCopy: string[] = formModel.tags
      .map((tag) => tag.body.trim())
      .filter(body => body!="");

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    function noEmpty(value){
      return value !== "";
    }
    const saveProblem: Problem = {
      id: this.problem? this.problem.id : "" ,
      _status: this.problem? this.problem._status : "",
      topic: formModel.info.topic,
      course: formModel.info.course,
      year: formModel.info.year,
      profs: formModel.info.profs.filter(onlyUnique).filter(noEmpty),
      question: formModel.question,
      answer: formModel.answer,
      tags: tagsDeepCopy.filter(onlyUnique),
      numbers: formModel.numbers.replace(/\s+/g, "").split(",").filter(onlyUnique).filter(noEmpty),
      commentsCount: 0
    };
    return saveProblem;
  }

  toPreviousPage(){
    this.location.back()
  }
}
