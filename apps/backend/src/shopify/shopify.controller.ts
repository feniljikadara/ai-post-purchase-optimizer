import { Controller, Get, Query, Res } from '@nestjs/common';
import { ShopifyAuthService } from './shopify-auth.service';
import { Response } from 'express';

@Controller('shopify')
export class ShopifyController {
  constructor(private readonly shopifyAuthService: ShopifyAuthService) {}

  @Get('auth')
  async auth(@Query('shop') shop: string, @Res() res: Response) {
    const redirectUrl = await this.shopifyAuthService.beginAuth(shop, res);
    if (redirectUrl) {
      res.redirect(redirectUrl);
    }
  }

  @Get('auth/callback')
  async authCallback(@Query() query: any, @Res() res: Response) {
    await this.shopifyAuthService.handleCallback(query);
    // Redirect to the embedded app's home page after successful auth
    res.redirect(`/`);
  }
}
