import { Injectable, Inject, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import type { Shopify } from '@shopify/shopify-api';

@Injectable()
export class ShopifyAuthService {
  constructor(@Inject('SHOPIFY_API') private readonly shopify: Shopify) {}

  async beginAuth(shop: string, req: Request, res: Response): Promise<string> {
    return await this.shopify.auth.begin({
      shop: shop,
      callbackPath: '/shopify/auth/callback',
      isOnline: false,
      rawRequest: req,
      rawResponse: res,
    });
  }

  async handleCallback(req: Request, res: Response): Promise<void> {
    await this.shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });
  }
}
