import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export default class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const gqlExecutionContext = GqlExecutionContext.create(context)

    const { req } = gqlExecutionContext.getContext()

    const authorization: string = req.headers.authorization

    if (!authorization) return false

    const token = authorization.replace(/^Bearer\s/, '')

    req.token = token

    return true
  }
}
