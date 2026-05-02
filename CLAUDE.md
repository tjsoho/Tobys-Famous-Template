# Toby's Coding Rules

> A complete guide to writing code that is indistinguishable from the senior dev's style in the Sloane Make codebase. Every pattern, convention, and micro-decision documented.

---

## Table of Contents

1. [Tech Stack & Architecture](#tech-stack--architecture)
2. [Monorepo Structure](#monorepo-structure)
3. [File & Folder Naming](#file--folder-naming)
4. [Import Ordering](#import-ordering)
5. [Function Declaration Style](#function-declaration-style)
6. [Component Patterns](#component-patterns)
7. [TypeScript Patterns](#typescript-patterns)
8. [Server Components (Pages)](#server-components-pages)
9. [Client Components](#client-components)
10. [Server Actions](#server-actions)
11. [API Route Handlers](#api-route-handlers)
12. [Forms](#forms)
13. [Data Fetching & React Query](#data-fetching--react-query)
14. [Services & Business Logic](#services--business-logic)
15. [Supabase & Database](#supabase--database)
16. [RLS Policies](#rls-policies)
17. [Migrations](#migrations)
18. [Styling & Tailwind](#styling--tailwind)
19. [Internationalization (i18n)](#internationalization-i18n)
20. [Error Handling](#error-handling)
21. [Loading & Empty States](#loading--empty-states)
22. [Toast Notifications](#toast-notifications)
23. [Context Providers](#context-providers)
24. [Custom Hooks](#custom-hooks)
25. [Configuration Files](#configuration-files)
26. [Testing](#testing)
27. [Git Workflow](#git-workflow)
28. [Verification Checklist](#verification-checklist)
29. [Things to NEVER Do](#things-to-never-do)

---

## Tech Stack & Architecture

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.x |
| UI Library | React | 19.x |
| Language | TypeScript | 5.9.x |
| Database | Supabase (PostgreSQL) | - |
| Styling | Tailwind CSS | 4.x |
| Component Library | Shadcn UI | - |
| Monorepo | Turborepo + pnpm | - |
| Forms | react-hook-form + Zod | - |
| State (Client) | React Query (@tanstack/react-query) | 5.x |
| Email | React Email + Resend | - |
| Payments | Stripe | - |
| Logging | Pino | - |
| Monitoring | Sentry | - |
| i18n | i18next | - |
| Testing | Playwright (E2E) | - |

**Multi-tenant model**: Personal accounts (`auth.users.id = accounts.id`) and Team accounts (shared workspaces with members/roles/permissions). All data links via `account_id` foreign key.

---

## Monorepo Structure

```
root/
├── apps/
│   ├── web/                          # Main Next.js app
│   │   ├── app/                      # App Router pages
│   │   │   ├── (marketing)/          # Public marketing pages (route group)
│   │   │   ├── (auth)/               # Auth pages (route group)
│   │   │   ├── home/
│   │   │   │   ├── (user)/           # Personal account routes
│   │   │   │   └── [account]/        # Team account routes (dynamic)
│   │   │   ├── admin/                # Super admin panel
│   │   │   └── api/                  # API routes
│   │   ├── components/               # App-level shared components
│   │   ├── config/                   # Feature flags, paths, navigation
│   │   ├── lib/                      # Utilities, i18n setup
│   │   ├── styles/                   # CSS/Tailwind files
│   │   └── supabase/                 # Database schemas & migrations
│   │       ├── schemas/              # Numbered SQL schema files
│   │       └── migrations/           # Timestamped migration files
│   └── e2e/                          # Playwright E2E tests
│
├── packages/
│   ├── ui/           (@kit/ui)       # Shadcn components, If, Trans, toast
│   ├── next/         (@kit/next)     # enhanceAction, enhanceRouteHandler
│   ├── supabase/     (@kit/supabase) # DB clients, auth helpers, hooks
│   ├── features/                     # Feature modules
│   │   ├── accounts/                 # Personal account management
│   │   ├── team-accounts/            # Team/workspace management
│   │   ├── auth/                     # Authentication
│   │   ├── admin/                    # Super admin
│   │   └── notifications/            # Notification system
│   ├── shared/       (@kit/shared)   # Logger, utilities
│   ├── mailers/      (@kit/mailers)  # Email sending
│   ├── email-templates/              # React Email templates
│   ├── billing/      (@kit/billing)  # Stripe integration
│   ├── policies/     (@kit/policies) # Feature policy system
│   ├── analytics/    (@kit/analytics)# Event tracking
│   ├── monitoring/   (@kit/monitoring)# Sentry, logging
│   ├── i18n/         (@kit/i18n)     # Internationalization
│   ├── otp/          (@kit/otp)      # One-time passwords
│   └── mcp-server/                   # MCP tool server
│
└── tooling/
    ├── eslint/                       # ESLint config
    ├── prettier/                     # Prettier config
    ├── typescript/                   # Shared tsconfig
    └── scripts/                      # Utility scripts
```

### Route-Level Organization

Within each route directory in `app/`, the pattern is:

```
[route]/
├── page.tsx                    # The page component (server component)
├── layout.tsx                  # Layout wrapper (if needed)
├── loading.tsx                 # Loading UI (Spinner)
├── error.tsx                   # Error boundary
├── _components/                # Route-specific components (underscore prefix!)
│   ├── some-table.tsx
│   └── some-form.tsx
├── _lib/                       # Route-specific logic
│   ├── schema.ts               # Zod schemas for this route
│   └── server/                 # Server-only code
│       ├── some-page.loader.ts # Data loading
│       ├── some.service.ts     # Business logic
│       └── some.action.ts      # Server actions
```

**Critical**: The underscore prefix (`_components/`, `_lib/`) tells Next.js these are NOT routes. Always use this convention.

---

## File & Folder Naming

| Type | Convention | Examples |
|------|-----------|----------|
| Components (files) | `kebab-case.tsx` | `document-list.tsx`, `team-activity-table.tsx` |
| Components (exports) | `PascalCase` | `DocumentList`, `TeamActivityTable` |
| Services | `kebab-case.service.ts` | `team-billing.service.ts`, `otp.service.ts` |
| Loaders | `kebab-case.loader.ts` | `team-account-workspace.loader.ts` |
| Server Actions | `kebab-case.action.ts` | `resolve-question.action.ts` |
| Multi-action files | `server-actions.ts` | `server-actions.ts` (when route has multiple) |
| Hooks | `use-kebab-case.ts` | `use-supabase.ts`, `use-user.ts` |
| Contexts | `kebab-case.context.ts` | `sidebar.context.ts` |
| Schemas | `kebab-case.schema.ts` | `update-email.schema.ts` |
| Types | `types.ts` | `types.ts` |
| Config files | `kebab-case.config.ts` | `feature-flags.config.ts`, `paths.config.ts` |
| Navigation configs | `kebab-case-navigation.config.tsx` | `team-account-navigation.config.tsx` |
| SQL migrations | `YYYYMMDDHHMMSS_description.sql` | `20260411100000_unanswered_questions.sql` |
| SQL schemas | `NN-name.sql` (numbered prefix) | `04-roles.sql`, `06-roles-permissions.sql` |
| Tests | `kebab-case.test.ts` | In `__tests__/` directories |
| E2E page objects | `kebab-case.po.ts` | `auth.po.ts` |
| Directories | `kebab-case` | `team-activity/`, `_components/`, `_lib/` |

---

## Import Ordering

Imports follow a strict order enforced by Prettier with `@trivago/sort-imports`:

```typescript
// 1. Directives (MUST be first line)
'use client';
// or
'use server';
// or
import 'server-only';

// 2. React / React hooks
import { useCallback, useMemo, useState, useTransition } from 'react';

// 3. Next.js
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// 4. External libraries
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation } from '@tanstack/react-query';
import { FileText, LayoutDashboard, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

// 5. @kit/* monorepo packages (alphabetical)
import { Button } from '@kit/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@kit/ui/form';
import { If } from '@kit/ui/if';
import { toast } from '@kit/ui/sonner';
import { Trans } from '@kit/ui/trans';
import { cn } from '@kit/ui/utils';

import { enhanceAction } from '@kit/next/actions';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { getLogger } from '@kit/shared/logger';

// 6. App config imports (~/config/*)
import { pathsConfig } from '~/config/paths.config';
import featureFlagsConfig from '~/config/feature-flags.config';

// 7. App lib imports (~/lib/*)
import { createI18nServerInstance } from '~/lib/i18n/i18n.server';

// 8. Local imports (./ relative)
import { DocumentList } from './_components/document-list';
import { loadDocumentsPage } from './_lib/server/documents-page.loader';
```

**Rules**:
- Blank line between each group
- Within each group, alphabetical order
- Multi-line destructured imports: one per line, trailing comma
- Always use `@kit/ui/{component}` (never deep import from shadcn paths)
- Type-only imports use `import type { ... }` when possible

---

## Function Declaration Style

### Components: Named function declarations

```typescript
// Server components - async function declaration
async function TeamAccountHomePage({ params }: TeamAccountHomePageProps) {
  const slug = (await params).account;
  // ...
  return <Page>...</Page>;
}
export default withI18n(TeamAccountHomePage);

// Client components - named function (exported)
export function DocumentList({ documents, accountId }: DocumentListProps) {
  // ...
  return <div>...</div>;
}

// Private helper components within a file - named function (not exported)
function DocumentStatusBadge({ status }: { status: string }) {
  return <Badge>{status}</Badge>;
}
```

### Server Actions: Arrow functions with `enhanceAction`

```typescript
export const resolveQuestionAction = enhanceAction(
  async (data) => {
    const client = getSupabaseServerClient();
    // ... business logic
  },
  { schema: ResolveQuestionSchema, auth: true },
);
```

### Service factories: Named function declarations returning class instances

```typescript
export function createTeamBillingService(client: SupabaseClient<Database>) {
  return new TeamBillingService(client);
}
```

### Hooks: Named function declarations

```typescript
export function useUser(initialData?: JWTUserData | null) {
  return useQuery({ queryFn, queryKey, initialData });
}
```

### Utility functions: Arrow functions for simple helpers

```typescript
const formatDate = (dateStr: string | null): string => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString();
};

const PAGE_SIZE = 20;
```

### Callbacks inside components: Arrow functions with useCallback

```typescript
const handleDelete = useCallback(
  async (documentId: string) => {
    setDeletingId(documentId);
    try {
      // ...
    } catch {
      toast.error(<Trans i18nKey="common:documents.deleteFailed" />);
    } finally {
      setDeletingId(null);
    }
  },
  [accountId, router],
);
```

---

## Component Patterns

### Server Component (Page)

```typescript
import { getSupabaseServerClient } from '@kit/supabase/server-client';

import { createI18nServerInstance } from '~/lib/i18n/i18n.server';
import { withI18n } from '~/lib/i18n/with-i18n';

import { SomeComponent } from './_components/some-component';
import { loadPageData } from './_lib/server/page-data.loader';

interface PageProps {
  params: Promise<{ account: string }>;
}

async function MyPage(props: PageProps) {
  const slug = (await props.params).account;
  const data = await loadPageData(slug);

  return (
    <Page style={'custom'}>
      <PageHeader
        displaySidebarTrigger={false}
        title={'Page Title'}
        description={'Page description'}
      />

      <PageBody className={'space-y-8 py-2'}>
        <SomeComponent data={data} accountSlug={slug} />
      </PageBody>
    </Page>
  );
}

export default withI18n(MyPage);
```

### Client Component

```typescript
'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@kit/ui/button';
import { Trans } from '@kit/ui/trans';

export interface MyComponentProps {
  items: Item[];
  accountId: string;
}

export function MyComponent({ items, accountId }: MyComponentProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const query = searchQuery.toLowerCase();
    return items.filter((item) =>
      item.name.toLowerCase().includes(query),
    );
  }, [items, searchQuery]);

  const handleDelete = useCallback(
    async (itemId: string) => {
      // ... logic
    },
    [accountId, router],
  );

  return (
    <div className="space-y-4">
      {/* UI here */}
    </div>
  );
}
```

---

## TypeScript Patterns

### Props interfaces: Declared above the component

```typescript
interface TeamAccountHomePageProps {
  params: Promise<{ account: string }>;
}

async function TeamAccountHomePage({ params }: TeamAccountHomePageProps) {
  // ...
}
```

### Inline object types for simple props

```typescript
function getSidebar(props: {
  account: string;
  accountId: string;
  accounts: AccountModel[];
  user: JWTUserData;
  logoType?: LogoType;
}) {
  // ...
}
```

### Exported interfaces for shared/public types

```typescript
export interface DocumentItem {
  id: string;
  filename: string;
  modality: string;
  status: string;
  created_at: string | null;
  updated_at: string | null;
}
```

### Record types for config mappings

```typescript
const STATUS_BADGE_VARIANT: Record<
  string,
  'warning' | 'info' | 'success' | 'destructive'
> = {
  pending: 'warning',
  processing: 'info',
  ready: 'success',
  failed: 'destructive',
};
```

### `as const` for config objects

```typescript
const typeConfig = {
  document_chat: {
    labelKey: 'common:teamActivity.documentChat',
    Icon: FileText,
    variant: 'info' as const,
  },
};
```

### Derived types with `Awaited<ReturnType<>>`

```typescript
export type TeamAccountWorkspace = Awaited<
  ReturnType<typeof loadTeamWorkspace>
>;
```

### Zod schemas (for validation, NOT interfaces)

```typescript
const ResolveQuestionSchema = z.object({
  questionId: z.string().uuid(),
  resolved: z.boolean(),
  accountSlug: z.string().min(1),
});
```

### NO generics on `useForm` - let Zod infer

```typescript
// CORRECT
const form = useForm({
  resolver: zodResolver(Schema),
  defaultValues: { name: '', email: '' },
});

// WRONG - never do this
const form = useForm<z.infer<typeof Schema>>({ ... });
```

---

## Server Components (Pages)

### Next.js 16 params pattern: ALWAYS await

```typescript
interface PageProps {
  params: Promise<{ account: string }>;
}

async function MyPage(props: PageProps) {
  const slug = (await props.params).account;
  // ...
}
```

### Data loading: Use cached loader functions

```typescript
// _lib/server/my-page.loader.ts
import 'server-only';
import { cache } from 'react';

import { getSupabaseServerClient } from '@kit/supabase/server-client';

export const loadMyPageData = cache(async (accountSlug: string) => {
  const client = getSupabaseServerClient();
  const { data, error } = await client
    .from('my_table')
    .select('id, name, created_at')
    .eq('account_slug', accountSlug)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
});
```

### Parallel data loading with Promise.all

```typescript
const [workspace, activities, members] = await Promise.all([
  loadTeamWorkspace(slug),
  loadActivities(slug),
  loadMembers(slug),
]);
```

### Page structure uses `<Page>`, `<PageHeader>`, `<PageBody>`

```typescript
return (
  <Page style={'custom'}>
    <PageHeader
      displaySidebarTrigger={false}
      title={'Dashboard'}
      description={'Overview of your account'}
    />
    <PageBody className={'space-y-8 py-2'}>
      <Suspense fallback={<Spinner />}>
        <DataComponent data={data} />
      </Suspense>
    </PageBody>
  </Page>
);
```

### `withI18n` HOC wraps every page

```typescript
export default withI18n(TeamAccountHomePage);
```

### `generateMetadata` exported alongside page

```typescript
export const generateMetadata = async () => {
  const i18n = await createI18nServerInstance();
  const title = i18n.t('account:homePage');
  return { title };
};
```

---

## Client Components

### Hook ordering within component body

1. `useTransition` / `useRouter` / `usePathname` / `useSearchParams`
2. `useState` declarations (grouped logically)
3. `useForm` (for form components)
4. `useMemo` (derived/computed values)
5. `useCallback` (event handlers)
6. `useEffect` (side effects, rare - prefer server)
7. Return JSX

### State declarations: typed explicitly when not obvious

```typescript
const [deletingId, setDeletingId] = useState<string | null>(null);
const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
const [currentPage, setCurrentPage] = useState(0);
```

### URL-based state for filters/pagination

```typescript
const pathname = usePathname();
const router = useRouter();
const searchParams = useSearchParams();

function goToPage(newPage: number) {
  const params = new URLSearchParams(searchParams.toString());
  if (newPage > 1) {
    params.set('page', String(newPage));
  } else {
    params.delete('page');
  }
  const qs = params.toString();
  router.replace(qs ? `${pathname}?${qs}` : pathname);
}
```

---

## Server Actions

### Pattern: `enhanceAction` with Zod schema

```typescript
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { enhanceAction } from '@kit/next/actions';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

const MyActionSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  accountSlug: z.string().min(1),
});

export const myAction = enhanceAction(
  async (data) => {
    const client = getSupabaseServerClient();

    const { error } = await client
      .from('my_table')
      .update({ name: data.name })
      .eq('id', data.id);

    if (error) {
      throw error;
    }

    revalidatePath(`/home/${data.accountSlug}/my-page`, 'page');
  },
  { schema: MyActionSchema, auth: true },
);
```

### Rules:
- Always `'use server'` at the top of the file
- Always validate with a Zod schema
- Always set `auth: true` (unless public action)
- Move complex logic to a service file
- Use `revalidatePath` after mutations
- NEVER use `router.refresh()` or `router.push()` after Server Actions
- Throw errors, don't return error objects

---

## API Route Handlers

### Pattern: `enhanceRouteHandler` with auth

```typescript
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { enhanceRouteHandler } from '@kit/next/routes';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

const BodySchema = z.object({
  name: z.string().min(1),
});

export const POST = enhanceRouteHandler(
  async ({ request, body, user }) => {
    const client = getSupabaseServerClient();

    const { data, error } = await client
      .from('my_table')
      .insert({ name: body.name, user_id: user.id })
      .select('id')
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  },
  { auth: true, schema: BodySchema },
);
```

### For streaming responses (AI/chat):

```typescript
export const maxDuration = 60;

export const POST = enhanceRouteHandler(
  async ({ request, user }) => {
    const { messages } = await request.json();
    // ... validation and processing
    const result = streamText({ model, system, messages, tools });
    return result.toUIMessageStreamResponse();
  },
  { auth: true },
);
```

### For static responses:

```typescript
export const dynamic = 'force-static';

export const GET = () => {
  return new Response('ok', {
    headers: { 'content-type': 'text/plain' },
  });
};
```

---

## Forms

### Complete form pattern

```typescript
'use client';

import { useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@kit/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@kit/ui/form';
import { Input } from '@kit/ui/input';
import { toast } from '@kit/ui/sonner';
import { Trans } from '@kit/ui/trans';

import { myAction } from '../_lib/server/my.action';
import { MyFormSchema } from '../_lib/schema';

// Omit server-provided fields from the form schema
const FormSchema = MyFormSchema.omit({ accountId: true });

export function MyForm(props: {
  accountId: string;
  defaultName: string;
}) {
  const [pending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: props.defaultName,
    },
  });

  return (
    <Form {...form}>
      <form
        className={'flex flex-col space-y-4'}
        onSubmit={form.handleSubmit((data) => {
          startTransition(async () => {
            try {
              await myAction({
                accountId: props.accountId,
                ...data,
              });

              form.reset(data);
              toast.success(
                <Trans i18nKey="common:updateSuccess" />,
              );
            } catch {
              toast.error(
                <Trans i18nKey="common:updateError" />,
              );
            }
          });
        })}
      >
        <FormField
          control={form.control}
          name={'name'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Trans i18nKey={'common:name'} />
              </FormLabel>
              <FormControl>
                <Input
                  data-test={'name-input'}
                  placeholder={'Enter name'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          data-test={'submit-button'}
          type={'submit'}
          disabled={pending}
        >
          {pending ? (
            <Trans i18nKey={'common:saving'} />
          ) : (
            <Trans i18nKey={'common:save'} />
          )}
        </Button>
      </form>
    </Form>
  );
}
```

### Form rules:
- **NO generics** on `useForm` - let zodResolver infer types
- Use `useTransition` for pending state (not `useState`)
- Submit handler is inline in `form.handleSubmit()` inside `onSubmit`
- Wrap async work in `startTransition`
- Use `form.reset(data)` after successful save (pass current data to prevent dirty state)
- Toast for success/error feedback
- `data-test` attribute on every interactive element
- String props use `{'value'}` (curly braces with single quotes)
- FormField `name` prop uses `{'fieldName'}` style

---

## Data Fetching & React Query

### Mutation pattern

```typescript
export function useUpdateAccountData(accountId: string) {
  const client = useSupabase();
  const mutationKey = ['account:data', accountId];

  const mutationFn = async (data: UpdateData) => {
    const response = await client
      .from('accounts')
      .update(data)
      .match({ id: accountId });

    if (response.error) throw response.error;
    return response.data;
  };

  return useMutation({ mutationKey, mutationFn });
}
```

### Query pattern with polling

```typescript
return useQuery({
  queryKey: ['version-updater'],
  staleTime: refetchInterval / 2,
  gcTime: refetchInterval,
  refetchIntervalInBackground: true,
  refetchInterval,
  initialData: null,
  queryFn: async () => {
    const response = await fetch('/api/version');
    return response.text();
  },
});
```

### Server-side data fetching (preferred)

```typescript
// In loader files - use cache() wrapper
import { cache } from 'react';

export const loadData = cache(async (slug: string) => {
  const client = getSupabaseServerClient();
  const { data, error } = await client
    .from('table')
    .select('*')
    .eq('slug', slug);

  if (error) throw error;
  return data;
});
```

### Hierarchy of data fetching:
1. **Server Components with RLS** (preferred - most secure)
2. **Client with React Query** (for real-time / interactive)
3. **Admin Client** (sparingly, with manual validation)

---

## Services & Business Logic

### Service class pattern

```typescript
// team-billing.service.ts
import 'server-only';

import { SupabaseClient } from '@supabase/supabase-js';
import { z } from 'zod';

import { getLogger } from '@kit/shared/logger';
import type { Database } from '@kit/supabase/database';

export function createTeamBillingService(
  client: SupabaseClient<Database>,
) {
  return new TeamBillingService(client);
}

class TeamBillingService {
  private readonly namespace = 'billing.team-account';

  constructor(
    private readonly client: SupabaseClient<Database>,
  ) {}

  async createCheckoutSession(params: {
    accountId: string;
    planId: string;
    returnUrl: string;
  }) {
    const logger = await getLogger();
    const ctx = { name: this.namespace, ...params };

    logger.info(ctx, 'Creating checkout session');

    try {
      // ... business logic
      return { checkoutToken };
    } catch (error) {
      logger.error(
        { ...ctx, error },
        'Error creating checkout session',
      );
      throw new Error('Checkout not created');
    }
  }
}
```

### Service rules:
- Always `import 'server-only'` at the top
- Factory function exports (e.g., `createTeamBillingService`)
- Private class with `private readonly` fields
- Namespace field for structured logging context
- Constructor accepts Supabase client
- Methods are `async`
- Structured logging with context objects (`ctx`)
- Error handling: log error with context, throw clean error message

---

## Supabase & Database

### Client usage

```typescript
// Server Component (RLS enforced - preferred)
import { getSupabaseServerClient } from '@kit/supabase/server-client';
const client = getSupabaseServerClient();

// Client Component (via hook)
import { useSupabase } from '@kit/supabase/hooks/use-supabase';
const client = useSupabase();

// Admin (bypasses RLS - use sparingly!)
import { getSupabaseServerAdminClient } from '@kit/supabase/server-admin-client';
const adminClient = getSupabaseServerAdminClient();
```

### Query pattern

```typescript
const { data, error } = await client
  .from('documents')
  .select('id, filename, modality, status, created_at, updated_at')
  .eq('account_id', workspace.account.id)
  .order('created_at', { ascending: false });

if (error) {
  throw error;
}
```

### Auth helpers

```typescript
import { requireUser } from '@kit/supabase/require-user';

// In server actions/routes
const { data: user } = await requireUser(client);

// RLS helper functions (in SQL)
has_role_on_account(user_id, account_id, role_name)
has_permission(user_id, account_id, permission_name)
is_account_owner(user_id, account_id)
is_team_member(user_id, account_id)
is_super_admin(user_id)
```

### Type generation

```typescript
import type { Tables } from '@kit/supabase/database';

// Use Tables<'table_name'> for row types
type Document = Tables<'documents'>;
```

---

## RLS Policies

### Standard table with RLS

```sql
create table if not exists public.my_table (
  id uuid primary key default extensions.uuid_generate_v4(),
  account_id uuid not null references public.accounts(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

-- ALWAYS enable RLS
alter table public.my_table enable row level security;

-- Select: team members can read
create policy my_table_select
  on public.my_table
  for select
  to authenticated
  using (
    public.has_role_on_account(auth.uid(), account_id)
  );

-- Insert: team members can create
create policy my_table_insert
  on public.my_table
  for insert
  to authenticated
  with check (
    public.has_role_on_account(auth.uid(), account_id)
  );

-- Update: only owner or admin
create policy my_table_update
  on public.my_table
  for update
  to authenticated
  using (
    public.has_permission(auth.uid(), account_id, 'settings.update')
  );

-- Delete: only owner
create policy my_table_delete
  on public.my_table
  for delete
  to authenticated
  using (
    public.is_account_owner(auth.uid(), account_id)
  );
```

### Owner-only pattern (using exists + primary_owner)

```sql
create policy owner_only_select
  on public.unanswered_questions
  for select
  to authenticated
  using (
    exists (
      select 1 from public.accounts a
      where a.id = unanswered_questions.account_id
        and a.primary_owner_user_id = auth.uid()
    )
  );
```

### Index pattern

```sql
create index if not exists idx_my_table_account_created
  on public.my_table (account_id, created_at desc);
```

---

## Migrations

### Creating a new migration

```bash
pnpm --filter web run supabase migrations new my_migration_name
```

### Modifying existing schema

```bash
pnpm --filter web run supabase:db:diff -f my_change_name
```

### Migration file structure

```sql
-- 20260411100000_my_feature.sql

-- Create table
create table if not exists public.my_table (
  id uuid primary key default extensions.uuid_generate_v4(),
  account_id uuid not null references public.accounts(id) on delete cascade,
  -- fields...
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.my_table enable row level security;

-- Create indexes
create index if not exists idx_my_table_account
  on public.my_table (account_id, created_at desc);

-- RLS policies
create policy my_table_select on public.my_table
  for select to authenticated
  using (public.has_role_on_account(auth.uid(), account_id));

-- (more policies...)
```

### After schema changes, regenerate types

```bash
pnpm supabase:web:typegen
```

---

## Styling & Tailwind

### NEVER use hardcoded colors

```typescript
// CORRECT
className="bg-background text-foreground border-border"
className="text-muted-foreground bg-muted"
className="bg-primary text-primary-foreground"
className="bg-destructive text-destructive-foreground"

// WRONG - never do this
className="bg-white text-gray-500 border-gray-300"
className="bg-blue-500 text-white"
```

### Semantic color tokens available

| Token | Purpose |
|-------|---------|
| `background` / `foreground` | Page background / main text |
| `card` / `card-foreground` | Card surfaces |
| `primary` / `primary-foreground` | Primary actions |
| `secondary` / `secondary-foreground` | Secondary actions |
| `muted` / `muted-foreground` | Subtle backgrounds / secondary text |
| `accent` / `accent-foreground` | Hover states |
| `destructive` / `destructive-foreground` | Errors / danger |
| `border` | Borders |
| `input` | Input borders |
| `ring` | Focus rings |

### Tailwind class ordering

```
display > flex/grid > items/justify > sizing > spacing > text > colors > effects > states
```

```typescript
className="flex flex-col items-center justify-between w-full gap-4 px-6 py-4 text-sm font-semibold bg-background text-muted-foreground border-border shadow-lg hover:bg-accent/50 dark:bg-muted"
```

### Conditional classes with `cn()`

```typescript
import { cn } from '@kit/ui/utils';

// Object syntax for conditionals
className={cn('flex items-center gap-x-4', {
  'bg-muted': isSelected,
  'opacity-50': isDisabled,
})}

// Ternary for simple toggle
className={cn('base-classes', isActive && 'active-classes')}
```

### Container utility

```typescript
// Custom container (defined in theme.utilities.css)
className="container"
// Equivalent to: margin-inline: auto; px-4 lg:px-8 xl:max-w-[80rem]
```

### Animation classes

```typescript
className="animate-in fade-in zoom-in-95 slide-in-from-bottom-16 fill-mode-both duration-1000"
```

---

## Internationalization (i18n)

### Always use `Trans` component (NEVER raw strings for UI text)

```typescript
import { Trans } from '@kit/ui/trans';

// Simple key
<Trans i18nKey={'common:save'} />

// With namespace
<Trans i18nKey={'auth:signInWithEmail'} />

// With interpolation values
<Trans
  i18nKey={'common:pageOfPages'}
  values={{ page: currentPage, total: totalPages }}
/>
```

### In forms (where you need plain string)

```typescript
import { useTranslation } from 'react-i18next';

const { t } = useTranslation('auth');
placeholder={t('emailPlaceholder')}
```

### Namespace convention

| Namespace | Content |
|-----------|---------|
| `common` | Shared UI strings (buttons, labels, routes) |
| `auth` | Authentication pages |
| `account` | Account settings |
| `billing` | Billing/payments |
| `admin` | Admin panel |

### NEVER use `react-i18next/Trans` - always `@kit/ui/trans`

ESLint enforces this:
```javascript
// eslint rule:
'no-restricted-imports': ['error', {
  paths: [{ name: 'react-i18next', importNames: ['Trans'] }],
}],
```

---

## Error Handling

### Server Actions: Throw errors (enhanceAction catches them)

```typescript
export const myAction = enhanceAction(
  async (data) => {
    const { error } = await client.from('table').update(data);
    if (error) {
      throw error;
    }
    revalidatePath('/path');
  },
  { schema: MySchema, auth: true },
);
```

### Services: Log + throw clean error

```typescript
try {
  const result = await performOperation();
  logger.info({ ...ctx, result }, 'Operation succeeded');
  return result;
} catch (error) {
  logger.error({ ...ctx, error }, 'Operation failed');
  throw new Error('Clean error message for client');
}
```

### Client components: Try/catch with toast

```typescript
try {
  await myAction(data);
  toast.success(<Trans i18nKey="common:success" />);
} catch {
  toast.error(<Trans i18nKey="common:error" />);
}
```

### API routes: Return error responses

```typescript
if (error) {
  return NextResponse.json(
    { error: error.message },
    { status: 500 },
  );
}
```

---

## Loading & Empty States

### Loading component (minimal)

```typescript
// loading.tsx
import { Spinner } from '@kit/ui/spinner';

export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Spinner className="text-primary size-8" />
    </div>
  );
}
```

### Error boundary

```typescript
// error.tsx
'use client';

import { useCaptureException } from '@kit/monitoring/hooks';

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useCaptureException(error);
  return (
    <div>
      <p>Something went wrong</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
};

export default ErrorPage;
```

### Empty state in data components

```typescript
{items.length === 0 ? (
  <div className="text-muted-foreground py-12 text-center text-sm">
    <Trans i18nKey="common:noItems" />
  </div>
) : (
  // render items
)}
```

### Suspense boundaries

```typescript
<Suspense fallback={<Spinner className="text-primary size-8" />}>
  <AsyncComponent />
</Suspense>
```

---

## Toast Notifications

```typescript
import { toast } from '@kit/ui/sonner';
import { Trans } from '@kit/ui/trans';

// Success
toast.success(<Trans i18nKey="common:updateSuccess" />);

// Error
toast.error(<Trans i18nKey="common:updateError" />);

// Warning
toast.warning('Some warning message');

// Loading toast (with ID for updating)
const toastId = toast.loading('Saving...');
// Later:
toast.success('Saved', { id: toastId });
// Or on error:
toast.error('Failed', { id: toastId });
```

---

## Context Providers

### Pattern

```typescript
'use client';

import { createContext, useContext } from 'react';

interface MyContextValue {
  items: Item[];
  user: User;
}

export const MyContext = createContext<MyContextValue>(
  {} as MyContextValue,
);

export function MyContextProvider(
  props: React.PropsWithChildren<{ value: MyContextValue }>,
) {
  return (
    <MyContext.Provider value={props.value}>
      {props.children}
    </MyContext.Provider>
  );
}

// Consumer hook
export function useMyContext() {
  const ctx = useContext(MyContext);
  if (!ctx) {
    throw new Error('useMyContext must be used within MyContextProvider');
  }
  return ctx;
}
```

### Rules:
- Context providers are purely functional wrappers
- Use `React.PropsWithChildren<{ value: T }>`
- Export a consumer hook with error checking
- Default value is `{} as T` (not `null`)

---

## Custom Hooks

### Pattern

```typescript
export function useMyHook(accountId: string) {
  const client = useSupabase();

  const doSomething = useCallback(
    async (itemId: string) => {
      const { error } = await client
        .from('items')
        .update({ active: true })
        .eq('id', itemId);

      if (error) throw error;
    },
    [client],
  );

  return doSomething;
}
```

### Hook naming: `use{Feature}{Action}`

```typescript
useUser()                    // Get current user
useSupabase()               // Get Supabase client
useUserWorkspace()          // Get user workspace context
useTeamAccountWorkspace()   // Get team workspace context
useUpdateAccountData()      // Mutation hook
useDismissNotification()    // Action hook
```

---

## Configuration Files

### Feature flags (Zod-validated env vars)

```typescript
// config/feature-flags.config.ts
const FeatureFlagsSchema = z.object({
  enableThemeToggle: z.boolean(),
  enableAccountDeletion: z.boolean(),
  enableTeamAccountBilling: z.boolean(),
  // ...
});

const featuresFlagConfig = FeatureFlagsSchema.parse({
  enableThemeToggle: getBoolean(
    process.env.NEXT_PUBLIC_ENABLE_THEME_TOGGLE,
    true,
  ),
  // ...
});

export default featuresFlagConfig;
```

### Paths config

```typescript
// config/paths.config.ts
const pathsConfig = PathsSchema.parse({
  auth: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
  },
  app: {
    home: '/home',
    accountHome: '/home/[account]',
  },
});

export default pathsConfig;
```

### Navigation config (with icons)

```typescript
// config/team-account-navigation.config.tsx
const iconClasses = 'w-4 h-4';

const getRoutes = (account: string) => [
  {
    label: 'common:routes.application',
    children: [
      {
        label: 'common:routes.dashboard',
        path: pathsConfig.app.accountHome.replace('[account]', account),
        Icon: <LayoutDashboard className={iconClasses} />,
        end: true,
      },
    ].filter(Boolean),
  },
];
```

---

## Testing

### Always add `data-test` attributes

```typescript
<Button data-test={'submit-button'}>Submit</Button>
<Input data-test={'email-input'} {...field} />
<div data-test={'document-list'}>...</div>
```

### E2E uses Page Object pattern

```typescript
// tests/my-feature.po.ts
export class MyFeaturePO {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/my-page');
  }

  async clickSubmit() {
    await this.page.getByTestId('submit-button').click();
  }
}
```

### Use `expect().toPass()` for flaky network operations

---

## Git Workflow

### Remote name is `sloane-ai` (NOT `origin`)

```bash
git push -u sloane-ai my-branch
```

### Branch naming

```
feat/feature-name
fix/bug-description
chore/task-description
```

### PR creation

```bash
gh pr create --repo sloane-ai/sloane-make --title "feat: add feature" --body "Description"
```

### Pre-commit hooks run lint + typecheck

Always ensure code passes before committing.

---

## Verification Checklist

After every implementation, run:

```bash
pnpm typecheck           # TypeScript check
pnpm lint:fix            # ESLint fix
pnpm format:fix          # Prettier fix
```

---

## Things to NEVER Do

| Rule | Why |
|------|-----|
| Never use hardcoded colors | Use semantic tokens (`bg-background`, etc.) |
| Never use `react-i18next/Trans` | Use `@kit/ui/trans` (ESLint enforces this) |
| Never put generics on `useForm` | Let Zod resolver infer types |
| Never use `router.refresh()` after Server Actions | Use `revalidatePath` instead |
| Never use `router.push()` after Server Actions | Use `redirect()` from next/navigation |
| Never use admin client without validation | Admin bypasses RLS - always check `isSuperAdmin()` first |
| Never create tables without RLS | Every table MUST have RLS enabled |
| Never use `SECURITY DEFINER` without controls | Explicit security validation required |
| Never skip `data-test` on interactive elements | E2E tests depend on them |
| Never use default exports for components | Use named exports (except page components wrapped in `withI18n`) |
| Never put raw strings in UI | Always use `<Trans>` or `t()` |
| Never fetch data in client components if server works | Server Components with RLS are preferred |
| Never use `git push origin` | Remote is `sloane-ai` |
| Never commit without running typecheck + lint | Pre-commit hooks will catch this |
| Never use `useState` for form pending state | Use `useTransition` |
| Never define Zod schemas inline in actions | Put them in separate schema files or at file top |
| Never use deep imports from shadcn | Always `@kit/ui/{component}` |

---

## Quick Reference Card

```
Server Component Page:    async function + withI18n + await params
Client Component:         'use client' + named export + useState/useCallback
Server Action:            'use server' + enhanceAction + Zod schema
API Route:                enhanceRouteHandler + auth: true
Data Loader:              'server-only' + cache() wrapper
Service:                  createXxxService factory + private class
Form:                     useForm + zodResolver + useTransition + no generics
Mutation:                 useMutation + client from useSupabase()
Navigation:               pathsConfig.app.xxx.replace('[account]', slug)
Translation:              <Trans i18nKey="namespace:key" />
Toast:                    toast.success(<Trans i18nKey="..." />)
Conditional:              <If condition={x}>...</If> or cn('base', { 'active': x })
```
