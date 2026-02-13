import { Module } from '@nestjs/common';
import { ShopifyController } from './shopify.controller';
import { ShopifyAuthService } from './shopify-auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { shopifyApi, ApiVersion, LogSeverity, Shopify } from '@shopify/shopify-api';

const ShopifyApiProvider = {
  provide: 'SHOPIFY_API',
  useFactory: (configService: ConfigService): Shopify => {
    const apiKey = configService.get<string>('SHOPIFY_API_KEY');
    const apiSecretKey = configService.get<string>('SHOPIFY_API_SECRET');
    const host = configService.get<string>('HOST');

    if (!apiKey || !apiSecretKey || !host) {
      throw new Error('Missing Shopify API credentials or HOST in .env file');
    }

    const shopify = shopifyApi({
      apiKey,
      apiSecretKey,
      scopes: ['read_products', 'write_products', 'read_orders'],
      hostName: host.replace(/https?:\/\//, ''),
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


