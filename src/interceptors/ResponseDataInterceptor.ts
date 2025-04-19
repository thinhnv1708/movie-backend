import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import ResponseDataBuilder from '../lib/ResponseDataBuilder';

@Injectable()
export class ResponseDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof ResponseDataBuilder) {
          return data.build();
        }

        return new ResponseDataBuilder().withData(data).build();
      }),
    );
  }
}
