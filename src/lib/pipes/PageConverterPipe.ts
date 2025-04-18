import { PipeTransform } from '@nestjs/common';
import { PAGE_DEFAULT } from '../contants';

export class PageConverterPipe implements PipeTransform {
  transform(data: string) {
    const page = Number(data);

    if (Number.isNaN(page) || page <= 0) {
      return PAGE_DEFAULT;
    }

    return page;
  }
}
