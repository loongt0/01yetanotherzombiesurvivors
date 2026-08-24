import createMiddleware from 'next-intl/middleware';
import {NextResponse, type NextRequest} from 'next/server';

import {routing} from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);
const internalRewriteHeader = 'x-farever-i18n-rewrite';

export default function proxy(request: NextRequest) {
  if (request.headers.get(internalRewriteHeader) === '1') {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.delete(internalRewriteHeader);

    return NextResponse.next({request: {headers: requestHeaders}});
  }

  const response = handleI18nRouting(request);

  if (response.headers.has('x-middleware-rewrite')) {
    const overriddenHeaders = new Set(
      response.headers
        .get('x-middleware-override-headers')
        ?.split(',')
        .filter(Boolean) ?? []
    );
    overriddenHeaders.add(internalRewriteHeader);
    response.headers.set(
      'x-middleware-override-headers',
      [...overriddenHeaders].join(',')
    );
    response.headers.set(`x-middleware-request-${internalRewriteHeader}`, '1');
  }

  return response;
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
