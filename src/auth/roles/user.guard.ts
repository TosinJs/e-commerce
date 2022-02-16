import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class UserGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { params, user } = request;
        if (params.id === user._id.toString()) {
            return true
        }
        return false
    }
}