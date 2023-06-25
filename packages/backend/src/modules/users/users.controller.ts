import { Controller, Get } from '@nestjs/common';
import { Roles } from 'src/shared/decorators/user.decorator';
import { AUTH_API } from 'src/shared';

@Controller(AUTH_API)
export class UsersController {
  @Get()
  @Roles('admin')
  getAll() {
    return 123;
  }
}
