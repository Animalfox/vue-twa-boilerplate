import type { Result } from './Result'

export interface UseCase<IRequest, IResponse> {
  execute(request?: IRequest): Promise<Result<IResponse, Error>>
}
