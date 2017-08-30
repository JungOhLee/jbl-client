import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProblemService } from '../problem.service';
import { Problem, yearList, courseList, topicList } from './problem';

import { Ng2Summernote } from 'ng2-summernote/ng2-summernote';

// TODO adding duplicate, null validators

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
  ) {
    this.createForm();
    // problem-info: year -> course -> topic -> prof

  }



  ngOnInit() {

  }

  ngOnChanges() {
    this.problemForm.reset({
      // topic: this.problem.topic,
      // course: this.problem.course
    })
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

  setAdditionalTags(tags: string[]) {
    const tagFGs = tags.map(tag => this.fb.group({ body: tag }));
    const tagFormArray = this.fb.array(tagFGs);
    this.problemForm.setControl('tags', tagFormArray);
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


  // Submit or Cancel //
  onSubmit() {
    this.newProblem = this.prepareSave();
    this.problemForm.reset();
    console.log(this.newProblem);
    this.problemService.addProblem(this.newProblem)
      .subscribe(res => console.log(res));
  }

  revert() {
    this.ngOnChanges();
  }

  prepareSave(): Problem {
    const formModel = this.problemForm.value;
    const additionalTagsDeepCopy: string[] = formModel.additionalTags.map(
      (tag) => tag.body
    );
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
    console.log(saveProblem.additionalTags);
    return saveProblem;
  }
}
