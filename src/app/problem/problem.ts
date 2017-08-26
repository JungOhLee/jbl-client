export class Problem {
  topic: string ='';
  course: string ='';
	year: string ='';
  answer: string ='';
  profs: string[]=[];
  otherTags: string[] =[];
	question: string ='';
  id: Object ={}; // 뭘로 해야하지..?
  commentsCount: number =0;
  numbers: string[]=[];
}

export const courseList =["병리학", "면역학", "이외"];

export const topicList =["topic1", "topic2", "topic3"];

export const yearList =["2017", "2016", "2015", "2014"];
