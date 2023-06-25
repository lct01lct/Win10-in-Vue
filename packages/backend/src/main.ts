import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './shared/guards';
import morgan = require('morgan');

(async () => {
  const _reflector = new Reflector();

  const app = await NestFactory.create(AppModule, AppModule.appConfig);

  if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

  app.useGlobalGuards(new AuthGuard(_reflector));

  await app.listen(AppModule.PORT);
})();
