import {
    CallHandler,
    ExecutionContext, Inject, Injectable, NestInterceptor
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Logger } from 'winston';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {

    constructor(@Inject('winston') private logger: Logger) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        this.log(context.switchToHttp().getRequest());
        return next.handle();
    }

    private log(req: any) {
        this.logger.info(`${req.method} - ${req.route.path}`);
        this.logger.debug(JSON.stringify({
            data: {
                body: req.body,
                query: req.query,
                params: req.params,
            }
        }));

    }
}