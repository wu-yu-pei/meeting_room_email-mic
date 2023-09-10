import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import defConfig from './config/def.config';
import { isDev } from './utils';
import devConfig from './config/dev.config';
import prodConfig from './config/prod.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [defConfig, isDev() ? devConfig : prodConfig],
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
