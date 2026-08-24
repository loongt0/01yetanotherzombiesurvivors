import createMiddleware from 'next-intl/middleware';

import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/:locale(en|de|es|fr)', '/:locale(en|de|es|fr)/:path*']
};
