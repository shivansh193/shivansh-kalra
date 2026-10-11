import { NextResponse, type NextRequest } from 'next/server'

// AI crawlers and assistant fetchers get the whole site as plain text
// instead of HTML. Humans and search engines get the normal pages.
const AI_AGENTS = /GPTBot|ChatGPT-User|OAI-SearchBot|ClaudeBot|Claude-User|Claude-SearchBot|anthropic-ai|PerplexityBot|Perplexity-User|Google-Extended|CCBot|Applebot-Extended|Bytespider|Amazonbot|meta-externalagent|cohere-ai|YouBot|DuckAssistBot|MistralAI-User/i

export function proxy(request: NextRequest) {
  const ua = request.headers.get('user-agent') ?? ''
  if (AI_AGENTS.test(ua)) {
    return NextResponse.rewrite(new URL('/llms-full.txt', request.url))
  }
  return NextResponse.next()
}

export const config = {
  // Pages only: skip Next internals, the text files themselves, and static assets.
  matcher: ['/((?!_next/|llms|favicon|robots|.*\.(?:pdf|png|jpg|svg|ico|txt)$).*)'],
}
