import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AuthService } from '../login/auth.service';
import { ProblemService } from '../problem.service';
import { TocService } from '../toc.service';

import { Problem } from './problem';
import { baseUrl } from '../base-url';

import { Ng2Summernote } from 'ng2-summernote/ng2-summernote';

import 'rxjs/add/operator/filter';

@Component({
  selector: 'problem-form',
  templateUrl: './problem-form.component.html',
  styles: []
})
export class ProblemFormComponent implements OnInit {

  problemForm: FormGroup;
  problemInfoForm;
  @Input() problem: Problem;
  @Input() showPreview: Boolean = true;
  newProblem: Problem;
  @Input() tocs: Array<any>;
  yearList: Array<string>=[];
  yearRange: Number = 6;
  courseList: Array<string>;
  topicList: Array<string>;
  profList: Array<string>;

  @Input() tocMode: Boolean = false;
  @Output() close: EventEmitter<any> = new EventEmitter();

  imgUrl: string = baseUrl + "/image";

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,

    private problemService: ProblemService,
    private tocService: TocService,
    private authService: AuthService
  ) {
    this.createForm();
    this.updateYearList();
    this.tocService.getAllTocs()
      .subscribe(res => {
        this.tocs=res;
        this.updateCourseList();
        this.checkRouteId();
      });
  }

  ngOnInit(){

  }
  ngOnChanges(){
    this.getAllList(this.problem);
    this.setFormValue(this.problem);
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
      commentsCount: problem.commentsCount
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
    this.profs.push(this.fb.control(''));
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
  updateYearList() {
      let today = new Date();
      for(let i=0; i< this.yearRange; i++){
        this.yearList.push(String(today.getFullYear()-i));
      }
  }

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
          if(confirm("문제가 저장되었습니다. 다른 문제를 입력하시겠습니까?")){
            location.reload();
          } else {
            this.router.navigate(['/problem', problem.id]);
          }
        });
    }

  }

  // cleanNum(){
  //   this.numbers.setValue(this.numbers.value.replace(/\s/g, "")) //TODO 한글 입력시 오류
  // }
  noSpace(event){
    return event.which !==32; //이렇게 하면 복붙일때 빈 공간을 막을 수 없음
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
      commentsCount: this.problem? this.problem.commentsCount : 0,
      email: this.problem? this.problem.email : this.authService.getUserEmail()
    };
    return saveProblem;
  }

  toPreviousPage(){
    this.location.back()
  }

  tocModeSubmit(){
    this.newProblem = this.prepareSave();
    console.log(this.newProblem);
    this.problemService.updateProblem(this.newProblem)
      .subscribe(res => {
        let problem = res;
        console.log("Save problem succeeded!", problem);
        this.closeForm(problem);
      })
  }
  closeForm(problem=null){
    this.close.emit(problem);
  }

}
