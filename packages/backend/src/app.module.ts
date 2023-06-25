import 'dotenv/config';
import { Module, NestApplicationOptions } from '@nestjs/common';
import { UsersModule } from './modules/users';

@Module({
  imports: [UsersModule],
  controllers: [],
})
export class AppModule {
  public static PORT: number = Number(process.env.PORT);
  public static appConfig: NestApplicationOptions = { logger: ['error', 'warn'], cors: true };
}
