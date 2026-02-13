import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { ShopifyAuthService } from './shopify-auth.service';
import type { Request, Response } from 'express';

@Controller('shopify')
export class ShopifyController {
  constructor(private readonly shopifyAuthService: ShopifyAuthService) {}

  @Get('auth')
  async auth(
    @Query('shop') shop: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const redirectUrl = await this.shopifyAuthService.beginAuth(shop, req, res);
    if (redirectUrl) {
      res.redirect(redirectUrl);
    }
  }

  @Get('auth/callback')
  async authCallback(@Req() req: Request, @Res() res: Response) {
    await this.shopifyAuthService.handleCallback(req, res);
    // Redirect to the embedded app's home page after successful auth
    res.redirect(`/`);
  }
}
