import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule, DatabaseModule, RmqModule } from './modules';
import { JwtModule } from '@nestjs/jwt';
import { jwtOptions } from './configs';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
      isGlobal: true,
    }),
    RmqModule.register({ exchanges: ['test'] }),
    AuthModule,
    JwtModule.registerAsync(jwtOptions),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
