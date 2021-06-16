import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'highlighTitleSearchPipe'
})
export class HighlighTitleSearchPipe implements PipeTransform {

  transform(value: string, search: string): string {
    const valueStr = value + ''; // Ensure numeric values are converted to strings
    return valueStr.replace(new RegExp('(?![^&;]+;)(?!<[^<>]*)(' + search + ')(?![^<>]*>)(?![^&;]+;)', 'gi'), '<span class="title-select">$1</span>');
  }

}
