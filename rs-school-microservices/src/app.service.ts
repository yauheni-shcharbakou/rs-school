import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return '<h1 style="text-align: center; color: red">RS School microservices API worked.</h1>'
  }
}
