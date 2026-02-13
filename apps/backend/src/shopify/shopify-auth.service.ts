import { Injectable, Inject } from '@nestjs/common';
import { Response } from 'express';
import Shopify from '@shopify/shopify-api';

@Injectable()
export class ShopifyAuthService {
  constructor(@Inject('SHOPIFY_API') private readonly shopify: typeof Shopify) {}

  async beginAuth(shop: string, res: Response): Promise<string> {
    return await this.shopify.auth.begin({
      shop: shop,
      callbackPath: '/shopify/auth/callback',
      isOnline: false, // Using offline tokens for background access
      rawResponse: res,
    });
  }

  async handleCallback(query: any): Promise<void> {
    await this.shopify.auth.callback({
      rawRequest: { url: `/?${new URLSearchParams(query).toString()}` } as any,
      rawResponse: null,
      query,
    });
  }
}
