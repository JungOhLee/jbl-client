import { Pipe, PipeTransform } from '@angular/core';

// change space to underbar in topic name

@Pipe({name: 'topicId'})
export class TopicIdPipe implements PipeTransform{
  transform(value: string, result: string): string{
    let modifiedTopic = value.replace(/ /g, "-");
    return modifiedTopic;
  }
}
