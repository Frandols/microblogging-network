import { CreateUserPayload } from '../../users/users.service'

export default interface Strategy<T extends string> {
  findUser: (code: string) => Promise<CreateUserPayload<T>>
}
