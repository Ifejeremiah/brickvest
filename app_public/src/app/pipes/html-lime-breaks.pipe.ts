import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlLimeBreaks'
})
export class HtmlLimeBreaksPipe implements PipeTransform {
  transform(text: string,): string {
    return text.replace(/\n/g, '<br/>');
  }
}
