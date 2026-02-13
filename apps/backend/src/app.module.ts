import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopifyModule } from './src/shopify/shopify.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), ShopifyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
