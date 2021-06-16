import {MatPaginatorIntl} from '@angular/material/paginator';
import {appProperties} from '../../../general/message-manage/app-properties';

export class CustomMatPaginatorIntlListCore extends MatPaginatorIntl {

  constructor() {
    super();
    this.getAndInitTranslations();
  }

  getAndInitTranslations() {
    this.itemsPerPageLabel = '';
    this.nextPageLabel = appProperties.next_page_label;
    this.previousPageLabel = appProperties.previous_page_label;
    this.firstPageLabel = appProperties.first_page_label;
    this.lastPageLabel = appProperties.last_page_label;
    this.changes.next();
  }


  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 of ${length}`;
    }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

    // return `${startIndex + 1} - ${endIndex} of ${length} total`;
    return `${startIndex + 1} - ${endIndex} ${appProperties.of} ${length} `;
  }
}
