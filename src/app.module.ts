import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { appConfig, dbConfig, jwtConfig } from './config';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { join } from 'path';
import {
  UserModule, AdminModule, SubscriptionModule, AdminMessageModule, SearchHistoryModule, MovieModule, UserFavoriteModule,
  CommentsModule, MovieCategoryModule, MovieActorModule, ActorModule, DeviceModule, CategoryModule
} from './modules';

import {
  Actor, MovieActor, AdminMessage, Category, Device, Movie, MovieCategory, Comments,
  SearchHistory, Subscription, User, UserFavorite, AuthModule
} from './modules';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig, jwtConfig],
    }),
    JwtModule.register({
      secret: 'my secret',
      global: true,
      signOptions: {
        expiresIn: 60 * 15,
      },
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend'),
      serveRoot: "/"
    }, {
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: "/uploads"
    }),



    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [Actor, User, AdminMessage, Category, Comments, Device, Movie, MovieActor, MovieCategory, SearchHistory, Subscription, UserFavorite],
      synchronize: true,
      // sync: {force: true},
      autoLoadModels: true,
    }),
    UserModule,
    SubscriptionModule,
    AdminMessageModule,
    SearchHistoryModule,
    MovieModule,
    UserFavoriteModule,
    CommentsModule,
    MovieCategoryModule,
    MovieActorModule,
    ActorModule,
    DeviceModule,
    CategoryModule,
    AuthModule,
  ],
})
export class AppModule { }
