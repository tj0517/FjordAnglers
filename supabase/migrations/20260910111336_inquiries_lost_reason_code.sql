-- FA-0.16: structured loss reason alongside the existing free-text lost_reason.
-- No backfill here — historical classification is a separate decision (tj).
alter table public.inquiries
  add column lost_reason_code text
  constraint inquiries_lost_reason_code_check
  check (lost_reason_code in (
    'client_silent',
    'no_guide',
    'guide_slow',
    'price',
    'changed_plans',
    'went_elsewhere',
    'other'
  ));

comment on column public.inquiries.lost_reason_code is
  'Structured loss reason for funnel reporting. lost_reason (free text) stays as the human comment.';
