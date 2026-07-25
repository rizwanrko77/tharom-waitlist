# Tharom waitlist site — implementation plan

## Objective

Turn `tharom.com` from a single-screen waitlist into a site that reads as a real
company with a verifiable, permission-based email flow.

The immediate driver is an AWS SES production-access denial. AWS Trust & Safety
reviews the public website to decide whether an account will generate spam
complaints. Two problems today:

1. The site is a client-rendered SPA, so a fetch without JavaScript returns an
   empty shell. Confirmed: fetching `https://tharom.com` returns only a `<title>`.
2. There is no privacy policy, no terms, no contact information, and no
   opt-in flow a reviewer can test.

Everything below serves one test: **a reviewer lands on the site, understands
what Tharom is, finds the legal pages, joins the waitlist, receives a
confirmation email, and can unsubscribe — in under two minutes, without
JavaScript being required to read the content.**

## Repo and stack

- Repo: `rizwanrko77/tharom-waitlist`
- Stack: React + TypeScript + Vite, deployed on Cloudflare Pages
- Existing: `functions/api` (Cloudflare Pages Functions), `src/`, `public/`,
  `index.html`
- The main product repo (`rizwanrko77/tharom`) is private and out of scope here.

Keep the existing visual language, palette, and typography. This is an
extension of the current design, not a redesign. Match what is already in `src/`.

## Phase 0 — Confirmed facts

These are settled. Every `{{TOKEN}}` used later in this document resolves to the
value below. Use them verbatim.

| Token | Value |
| --- | --- |
| `{{LEGAL_NAME}}` | RKO Services Pvt Ltd |
| `{{BRAND_LINE}}` | "Tharom is a service operated by RKO Services Pvt Ltd." |
| `{{ADDRESS}}` | Nehtour, Bijnor, Uttar Pradesh, India |
| `{{JURISDICTION}}` | The courts at Bijnor, Uttar Pradesh, India |
| `{{CONTACT_EMAIL}}` | hello@tharom.com |
| `{{RETENTION}}` | Until the user unsubscribes, or up to 24 months after their last interaction, whichever comes first; deleted sooner on request |
| `{{LAUNCH}}` | September 2026 (use the month only, never a specific date) |
| `{{PRICING}}` | Not announced yet |

Subprocessors to disclose in the privacy policy:

- **Hosting and delivery:** Cloudflare
- **Database:** Neon (Postgres)
- **AI model providers:** Anthropic, OpenAI, Google, AWS Bedrock
- **Email delivery:** Resend (Amazon SES once production access is granted)
- **Analytics:** none

Two commitments that must appear prominently, not buried in the policy:

1. Material uploaded by workspaces is **not** used to train or improve AI models.
2. The waitlist is screened. Tharom is aimed at schools and institutions, and
   access is granted by invitation rather than open self-signup.

Still open, and safe to implement around. Leave a `TODO` where each appears:

- `{{DATA_REGION}}` — the Neon region, so the policy can state where data is
  physically stored. Write the section so a region string drops in cleanly.
- `{{GRIEVANCE_CONTACT}}` — the address for complaints and data-deletion
  requests. Default to `{{CONTACT_EMAIL}}` unless told otherwise.
- Whether the AI providers are called directly or all routed through AWS
  Bedrock. Until confirmed, list all four as named above.

## Phase 1 — Make the HTML contain real content (highest priority)

Nothing else in this plan matters if the page is still blank without JavaScript.

Pick one of these, in order of preference:

1. **Prerender at build time.** Add `vite-react-ssg` or `vite-plugin-prerender`
   and prerender every route (`/`, `/privacy`, `/terms`, `/contact`) to static
   HTML. Cloudflare Pages serves the prerendered file, React hydrates on top.
2. **Static HTML fallback.** If prerendering fights the current setup, author
   the marketing and legal pages as plain HTML in `public/` and keep React only
   for the interactive waitlist form.

Also update `index.html` regardless of approach:

- A descriptive `<title>` and `<meta name="description">`
- Open Graph and Twitter card tags with a real preview image in `public/`
- `<link rel="canonical">`
- A `<noscript>` block containing the core value proposition and links to the
  legal pages

**Verification:** `curl -s https://tharom.com | grep -i "privacy"` must return a
match. Run the same check against every route before considering this phase done.

## Phase 2 — Routing and page structure

Add client-side routing (React Router, or file-based if simpler) with these
routes, each prerendered per Phase 1:

- `/` — landing
- `/privacy` — privacy policy
- `/terms` — terms of service
- `/contact` — contact
- `/waitlist/confirm` — lands here after clicking the confirmation link
- `/unsubscribe` — unsubscribe handling and confirmation

Add a global `Footer` component rendered on every route:

- `© {year} {{LEGAL_NAME}}`
- Links: Privacy, Terms, Contact
- `{{CONTACT_EMAIL}}`
- `{{ADDRESS}}` (city and country is enough)

Add a minimal global header with the Tharom wordmark linking to `/`.

## Phase 3 — Page content

Write real copy. No lorem ipsum, no placeholder headings shipped to production.
Plain, specific language over marketing abstraction.

### `/` landing

Expand well beyond the current form. Sections, in order:

1. **Hero** — what Tharom is in one sentence a school administrator would
   understand, plus the waitlist form.
2. **The problem** — institutions hold large amounts of teaching material that
   learners cannot easily interrogate.
3. **How it works** — three steps: a workspace uploads its material (documents,
   transcripts, video); Tharom grounds an AI assistant in that material; learners
   chat with it to work through the content. Numbered here because it genuinely
   is a sequence.
4. **Who it's for** — schools and educational institutions first, and any
   organisation with a body of knowledge its users need to learn from.
5. **What a workspace gets** — branded subdomain (`{slug}.tharom.com`), its own
   content library, its own users, usage-based metering.
6. **FAQ** — 4 to 6 questions covering data handling, who can access uploaded
   material, pricing status, and launch timing. Answer honestly, including
   "not decided yet" where that is the truth.
7. **Waitlist form** repeated at the bottom.

### `/privacy`

Must explicitly cover, in plain language:

- What is collected at this stage: email address, plus signup timestamp, IP
  address, and referring page, all recorded as proof of consent
- What emails are sent: a confirmation email on signup, and occasional product
  updates until launch
- How to opt out: unsubscribe link in every email, plus emailing
  `{{CONTACT_EMAIL}}`
- Who processes the data: `{{SUBPROCESSORS}}`
- Retention: `{{RETENTION}}`, and deletion on request
- No selling or sharing of data with advertisers
- A contact route for data requests
- Last-updated date

### `/terms`

Service description, eligibility, acceptable use, intellectual property,
disclaimers for a pre-launch beta, limitation of liability, changes to terms,
governing law `{{JURISDICTION}}`, contact. Keep it short and readable.

### `/contact`

`{{LEGAL_NAME}}`, `{{CONTACT_EMAIL}}`, `{{ADDRESS}}`, and a note on response
times. A form is optional; a visible address is the part that matters.

## Phase 4 — Double opt-in waitlist

This is the section that most directly answers the denial. The goal is that
consent is provable and testable rather than merely asserted.

### Storage

Use Cloudflare D1. Schema:

```sql
CREATE TABLE waitlist (
  id            TEXT PRIMARY KEY,
  email         TEXT NOT NULL UNIQUE,
  status        TEXT NOT NULL DEFAULT 'pending',
    -- pending | confirmed | unsubscribed | bounced
  token         TEXT NOT NULL UNIQUE,
  created_at    TEXT NOT NULL,
  confirmed_at  TEXT,
  unsubscribed_at TEXT,
  source_page   TEXT,
  ip            TEXT,
  user_agent    TEXT
);

CREATE INDEX idx_waitlist_status ON waitlist(status);
CREATE INDEX idx_waitlist_token  ON waitlist(token);
```

`token` is a cryptographically random opaque value (`crypto.randomUUID()` twice
concatenated, or 32 random bytes hex-encoded). It serves both confirmation and
unsubscribe, so it must not be guessable.

### Endpoints (`functions/api`)

**`POST /api/waitlist`**

- Body: `{ email, source_page }`
- Validate email format; normalise to lowercase and trim
- Rate limit by IP (Cloudflare KV counter or D1, ~5 per hour)
- Add a honeypot field to the form and reject submissions that fill it
- If the email exists and is `confirmed`, respond success without resending
- If the email exists and is `pending`, resend the confirmation (throttled to
  once per 10 minutes)
- Otherwise insert with `status='pending'`, capture `ip`, `user_agent`,
  `source_page`, `created_at`
- Send the confirmation email
- Always respond with a generic success message so the endpoint cannot be used
  to test whether an address is registered

**`GET /api/waitlist/confirm?token=...`**

- Look up by token; if `pending`, set `status='confirmed'` and `confirmed_at`
- Redirect to `/waitlist/confirm` with a success or expired state
- Tokens expire after 7 days; expired tokens offer a "send a new link" action

**`GET /api/unsubscribe?token=...`**

- Set `status='unsubscribed'` and `unsubscribed_at`
- Redirect to `/unsubscribe` showing confirmation
- Must work in one click, with no login and no required form

### Form UI

- Consent line directly beneath the input, always visible:
  *"By joining, you agree to receive occasional product updates from Tharom.
  Unsubscribe anytime."* with "Privacy Policy" linked to `/privacy`
- After submit, replace the form with: *"Check your inbox. We've sent a link to
  confirm your email address."* — do not claim they are on the list yet
- Inline error states that say what went wrong and how to fix it
- Keyboard accessible, visible focus, `aria-live` on the result message

### Emails

Sender for now: **Resend**, not SES. SES is still sandboxed and can only send to
verified addresses, so real signups cannot be confirmed through it. Add the
Resend API key as a Cloudflare Pages environment variable (`RESEND_API_KEY`);
never commit it. Migrating to SES later is a single function swap — isolate the
send call behind `src/lib/email.ts` (or `functions/_lib/email.ts`) with one
`sendEmail({ to, subject, html, text })` signature so the provider can be
changed in one place.

Every email must include, in the footer:

- `{{LEGAL_NAME}}` and `{{ADDRESS}}`
- A working unsubscribe link (`/api/unsubscribe?token=...`)
- A line explaining why the recipient is receiving it

**Confirmation email** — subject: `Confirm your Tharom waitlist signup`

Body: one sentence of context, one clear confirm button, the raw URL as a
fallback, an expiry note, and a line telling anyone who did not sign up to
ignore the message. Send both HTML and plain text parts.

Also set the `List-Unsubscribe` and `List-Unsubscribe-Post` headers on every
send.

## Phase 5 — Operational hygiene

- `public/robots.txt` allowing crawling, with a sitemap reference
- `public/sitemap.xml` listing all public routes
- A simple admin read path for the owner to check signup counts — either a D1
  query run locally via Wrangler, or a token-protected `GET /api/admin/stats`.
  Do not ship an unauthenticated stats endpoint.
- Handle bounces: when the email provider reports a hard bounce, set
  `status='bounced'` and never send to that address again.

## Acceptance criteria

Ship only when all of these pass:

1. `curl -s https://tharom.com` returns readable body copy, not an empty shell.
   Same for `/privacy`, `/terms`, `/contact`.
2. Every page has a footer linking Privacy, Terms, and Contact.
3. Submitting a real address delivers a confirmation email within a minute.
4. Clicking the confirmation link flips the record to `confirmed` and shows a
   success page.
5. The unsubscribe link works in one click, from a fresh browser with no session.
6. Submitting the same address twice does not send two emails within 10 minutes.
7. The privacy policy names the actual subprocessors, with no `{{...}}` tokens
   left anywhere in production output.
8. Lighthouse accessibility score above 90; the form is fully keyboard operable.
9. Mobile layout works from 360px width up.

## Out of scope

- Any change to the main `tharom` product repo
- App authentication, workspaces, or subdomain routing
- Migrating the waitlist sender to SES (revisit after production access is
  granted)
- Analytics beyond what already exists

## Notes for whoever implements this

Phase 1 is the one that cannot be skipped or deferred. A beautifully written
privacy policy that only exists after JavaScript executes does not solve the
problem that prompted this work.
