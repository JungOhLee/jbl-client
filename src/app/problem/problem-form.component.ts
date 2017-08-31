import { Component, Input, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProblemService } from '../problem.service';
import { Problem } from './problem';
import { ActivatedRoute } from '@angular/router';

import { Ng2Summernote } from 'ng2-summernote/ng2-summernote';

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
  yearList: Array<string>;
  courseList: Array<string>;
  topicList: Array<string>;
  profList;

  constructor(
    private fb: FormBuilder,
    private problemService: ProblemService,
    private route: ActivatedRoute
  ) {
    this.createForm();
    // problem-info: year -> course -> topic -> prof

    this.route.params.subscribe(param => {
      console.log(param.id); //for debug
      if(param.id){
        this.problemService.getProblem(param.id)
          .subscribe(res => {
            this.problem = res;
            this.setFormValue(this.problem);
            this.getAllList();
          });
      }
    })
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
      question: ['질문을 입력하세요', Validators.required],
      answer: ['', Validators.required],

      additionalTags: this.fb.array([]),
      commentsCount: 0,
      numbers: ['', Validators.pattern('^[^0].*')],
    });

    this.problemInfoForm = this.problemForm.get('info');
    this.problemService.findInfo(this.problemInfoForm.value)
      .subscribe(res => { this.yearList = res })
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
      additionalTags: [],
      numbers: problem.numbers.join(", "),
      commentsCount: 0
    };
    this.problemForm.setValue(value);
    this.setProfs(problem.profs);
    this.setAdditionalTags(problem.additionalTags);
    console.log(this.problemForm);
  }

  setProfs(profs: string[]) {
    const profFCs = profs.map(prof => this.fb.control(prof, Validators.required));
    const profFormArray = this.fb.array(profFCs);
    this.problemInfoForm.setControl('profs', profFormArray);
  }

  setAdditionalTags(tags: string[]) {
    const tagFGs = tags.map(tag => this.fb.group({ body: tag }));
    const tagFormArray = this.fb.array(tagFGs);
    this.problemForm.setControl('additionalTags', tagFormArray);
  }

  addTag() {
    this.additionalTags.push(this.fb.group({ body: '' }));
  }
  deleteTag(index) {
    this.additionalTags.removeAt(index);
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
  get additionalTags(): FormArray { return this.problemForm.get('additionalTags') as FormArray; }
  get course() { return this.problemForm.get('info.course')}
  get year() { return this.problemForm.get('info.year')}
  get topic() { return this.problemForm.get('info.topic') }
  get profs(): FormArray { return this.problemForm.get('info.profs') as FormArray; }


  // Getting Select Box List //
  updateCourseList() {
    const courseControl = this.problemInfoForm.get('course');
    const topicControl = this.problemInfoForm.get('topic');
    topicControl.setValue('');
    courseControl.setValue('');
    this.problemService.findInfo(this.problemInfoForm.value)
      .subscribe(res => { this.courseList = res })
  }

  updateTopicList() {
    const topicControl = this.problemInfoForm.get('topic');
    topicControl.setValue('');
    this.problemService.findInfo(this.problemInfoForm.value)
      .subscribe(res => { this.topicList = res })
  }

  updateProfList() {
    // const profsControl = this.problemInfoForm.get('profs');
    // profsControl.setValue('');
    this.problemService.findInfo(this.problemInfoForm.value)
      .subscribe(res => { this.profList = res })
  }

  getAllList(){
    this.problemService.findInfo({
      year: this.problem.year,
      course: "",
      topic: ""
    }).subscribe(
      res => {if(res){this.courseList = res}}
    )
    this.problemService.findInfo({
      year: this.problem.year,
      course: this.problem.course,
      topic: ""
    }).subscribe(
      res=> {if(res){this.topicList = res}}
    )
    this.problemService.findInfo({
      year: this.problem.year,
      course: this.problem.course,
      topic: this.problem.topic,
      profs: []
    }).subscribe(
      res => {if(res){this.profList = res}}
    )
  }

  // Submit or Cancel //
  onSubmit() {
    this.newProblem = this.prepareSave();
    this.problemForm.reset();
    console.log(this.newProblem);
    this.problemService.addProblem(this.newProblem)
      .subscribe(res => console.log(res));
  }

  revert() {
    this.createForm(); //TODO 이부분에서 summernote 가 instance 없다고 오류남
    this.setFormValue(this.problem);
    this.getAllList();
  }

  prepareSave(): Problem {
    const formModel = this.problemForm.value;
    const additionalTagsDeepCopy: string[] = formModel.additionalTags
      .map((tag) => tag.body)
      .filter(body => body!="")
    ;
    const saveProblem: Problem = {
      id: this.problem? this.problem.id : {} ,
      topic: formModel.info.topic,
      course: formModel.info.course,
      year: formModel.info.year,
      profs: formModel.info.profs,
      question: formModel.question,
      answer: formModel.question,
      additionalTags: additionalTagsDeepCopy,
      numbers: formModel.numbers.replace(/\s+/g, "").split(","),
      commentsCount: 0
    };
    return saveProblem;
  }
}
