import createMiddleware from 'next-intl/middleware';

import {routing} from './i18n/routing';

// next-intl owns `/en/` canonicalization and cookie synchronization. Next's
// trailing-slash policy runs first for bare `/en`, then middleware redirects it.
export default createMiddleware(routing);

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
