export class Problem {
  id: string ='';
  _status: string ='';
  topic: string ='';
  course: string ='';
	year: string ='';
  answer: string ='';
  profs: string[]=[];
  tags: string[] =[];
	question: string ='';
  commentsCount: number =0;
  numbers: string[]=[];
  email: string;
}

export const courseList =["병리학", "면역학", "이외"];

export const topicList =["topic1", "topic2", "topic3"];

export const yearList =["2017", "2016", "2015", "2014"];
