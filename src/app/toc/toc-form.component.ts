import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TocService } from '../toc.service';

@Component({
  selector: 'toc-form',
  templateUrl: './toc-form.component.html',
  styles: []
})
export class TocFormComponent implements OnInit{

  tocForm: FormGroup;
  listOne = ["1","3","5","7"];
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
  topicList: Array<string> =["topic1", "topic2", "topic3"];
  profList: Array<string> = ["prof1", "prof2", "prof3"];

  constructor(
    private fb: FormBuilder,
    private tocService: TocService,
    private route: ActivatedRoute
  ){
    this.createForm();

  }

  ngOnInit(){
    this.tocService.getToc()
      .subscribe( res => {console.log(res); this.toc=res[0]})
  }

  createForm(){
    this.tocForm = this.fb.group({
      topic: ["hi"],
      profs: this.fb.array([[""]])
    })
  }

  get topic(): FormControl { return this.tocForm.get('topic') as FormControl; }
  get profs(): FormArray { return this.tocForm.get('profs') as FormArray; }

  addProf() {
    this.profs.push(this.fb.control('', Validators.required));
  }
  deleteProf(index){
    this.profs.removeAt(index);
  }

  onSubmit(){
    const saveValue = this.tocForm.value
    this.tocForm.reset();
    this.toc.topics.push(saveValue);
  }
}
