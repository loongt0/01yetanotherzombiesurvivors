import createMiddleware from 'next-intl/middleware';

import {routing} from './i18n/routing';

// Resolve language from the URL so English fallbacks remain reachable, even
// with a non-English browser preference or an old NEXT_LOCALE cookie.
export default createMiddleware(routing);

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
