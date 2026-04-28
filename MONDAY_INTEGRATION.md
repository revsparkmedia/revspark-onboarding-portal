# Monday.com Integration Spec

## Status: Pending

This portal is currently a clickable prototype with hardcoded data in `app/data/zees.ts`. The next session will replace the hardcoded data source with live Monday.com API calls. This document captures what needs to happen.

## Architecture

- **Source of truth:** A specific Monday.com board (or workspace) for franchisee onboarding.
- **AM workflow:** Michelle and the AM team manage onboarding state in Monday like they already do. No new tools to learn.
- **Portal:** Reads from Monday API on each request (with short-TTL cache). Renders the zee-facing experience.
- **Auth:** Per-zee URL slug like `/z/gameday-plano-a8f3k2`. The slug maps to a Monday item ID. The random suffix is the credential.

## Required input from Michelle (before wiring)

Before any code is written for the next session, Michelle needs to confirm or provide:

1. **Board structure.** Screenshot or read access to the current Gameday onboarding board.
2. **Column mapping.** Which Monday columns hold:
   - Onboarding stage (status column with values matching: welcome_aboard, brand_intake, building_campaigns, final_review, go_live)
   - Target launch date (date column)
   - Day-of-ten (computed from start date + today, or stored)
   - Build status for Meta, Google, Lead Routing, Tracking & Pixels (status columns)
   - Admin checkpoints (Meta access granted, Google access granted, GHL provisioned, domain verified. checkbox columns)
3. **Task structure.** Are tasks subitems of the zee's Monday item, or items in a linked board? What columns do they have?
4. **File handling.** Do uploaded photos and brand assets live in Monday's file column, or somewhere else (Google Drive, Vercel Blob)?
5. **Slug generation.** How should the portal URL slug map to a Monday item? Suggested: `{location-slug}-{6-char-random}` where the random part is stored in a Monday text column, generated when a new onboarding starts.

## Implementation tasks for next session

1. Install `@mondaydotcomorg/api` (or use raw GraphQL via fetch)
2. Add `MONDAY_API_TOKEN` env var (read access only is fine)
3. Add `MONDAY_BOARD_ID` env var
4. Replace `app/data/zees.ts` with `lib/monday/client.ts` exposing `getZeeBySlug(slug)` that hits Monday's GraphQL API
5. Map Monday column values to the existing TypeScript interfaces (`ZeeData`, `OnboardingStage`, etc.)
6. Add a 60-second in-memory cache to avoid hitting API rate limits on every request
7. Add `lib/monday/write.ts` for zee-side actions (mark task complete, upload file, send AM message). Each action writes back to the corresponding Monday column or item.
8. Slug-to-item-id resolution: query Monday board, find item where slug column matches, return its data.
9. 404 handling: if no Monday item matches the slug, render the existing 404 page.

## Anti-goals

- Do not build an AM-facing admin view in the portal. Michelle uses Monday directly.
- Do not store onboarding state in any other database. Monday is the only source of truth.
- Do not require zees to log in. Slug URL is the credential.

## Open questions for Michelle

- Should the portal have any write-back to Monday at all (mark task complete, upload file)? Or is it strictly read-only and AMs do all writes from Monday?
- Are there sensitive columns in the onboarding board that should NOT be exposed to the zee? (Internal notes, AM scoring, billing info, etc.)
- What's the right cadence for the Monday API cache? 60s is the default suggestion. Faster updates = more API calls.
