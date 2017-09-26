export class Toc {
  course:string;
  courseAliases:Array<string>;
  topics:Array<Topic>
}

class Topic {
  topic:string;
  profs:Array<string>;
  topicAliases:Array<string>;
}
