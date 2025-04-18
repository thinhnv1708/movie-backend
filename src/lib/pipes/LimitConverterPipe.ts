import { PipeTransform } from '@nestjs/common';
import { LIMIT_DEFAULT } from '../contants';

export class LimitConverterPipe implements PipeTransform {
  transform(data: string) {
    const limit = Number(data);

    if (Number.isNaN(limit) || limit <= 0) {
      return LIMIT_DEFAULT;
    }

    return limit;
  }
}
