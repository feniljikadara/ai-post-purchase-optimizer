import { Module } from '@nestjs/common';
import { ShopifyController } from './shopify.controller';
import { ShopifyAuthService } from './shopify-auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { shopifyApi } from '@shopify/shopify-api';
import Shopify, { ApiVersion, LogSeverity } from '@shopify/shopify-api';

const ShopifyApiProvider = {
  provide: 'SHOPIFY_API',
  useFactory: (configService: ConfigService) => {
    const shopify = shopifyApi({
      apiKey: configService.get<string>('SHOPIFY_API_KEY'),
      apiSecretKey: configService.get<string>('SHOPIFY_API_SECRET'),
      scopes: ['read_products', 'write_products', 'read_orders'],
      hostName: configService.get<string>('HOST').replace(/https?:\/\//, ''),
      apiVersion: ApiVersion.October23,
      isEmbeddedApp: true,
      logger: {
        level: LogSeverity.Debug,
      },
    });
    return shopify;
  },
  inject: [ConfigService],
};

@Module({
  imports: [ConfigModule],
  controllers: [ShopifyController],
  providers: [ShopifyAuthService, ShopifyApiProvider],
})
export class ShopifyModule {}
