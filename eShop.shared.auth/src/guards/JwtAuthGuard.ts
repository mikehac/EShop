import { Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  handleRequest(err: Error | null, user: any, info: any): any {
    if (err || !user) {
      throw new UnauthorizedException("Access Denied! Invalid Token.");
    }
    return user;
  }
}
