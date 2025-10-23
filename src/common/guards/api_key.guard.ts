import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {


    const request = context.switchToHttp().getRequest();

    const headerName = process.env.API_token;
    
    if (!headerName) {
      console.log('Access denied ❌ - API token header name not configured');
      return false;
    }
    const apiKey = request.headers[headerName];

    if (!apiKey) {
      console.log('Access denied ❌ - no token');
      return false;
    }

    console.log('Access granted ✅');
    return true;
  }
}
  