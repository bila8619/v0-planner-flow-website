-- Create function to get user's template access limit based on subscription plan
create or replace function public.get_template_access_limit(plan_name text)
returns integer
language plpgsql
security definer
as $$
begin
  case plan_name
    when 'free' then return 5;
    when 'essential' then return 15;
    when 'complete' then return 30;
    when 'pro' then return 45;
    when 'family' then return 45;
    else return 5; -- default to free plan
  end case;
end;
$$;

-- Create function to check if user can access a template
create or replace function public.can_access_template(user_uuid uuid, template_index integer)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  user_plan text;
  access_limit integer;
begin
  -- Get user's subscription plan
  select subscription_plan into user_plan
  from public.profiles
  where id = user_uuid;
  
  -- If no profile found, default to free plan
  if user_plan is null then
    user_plan := 'free';
  end if;
  
  -- Get access limit for the plan
  access_limit := public.get_template_access_limit(user_plan);
  
  -- Check if template index is within the allowed range (1-based indexing)
  return template_index <= access_limit;
end;
$$;

-- Create function to update user subscription
create or replace function public.update_user_subscription(
  user_uuid uuid,
  new_plan text,
  new_status text default 'active',
  stripe_customer text default null,
  stripe_subscription text default null,
  start_date timestamp with time zone default timezone('utc'::text, now()),
  end_date timestamp with time zone default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.profiles
  set 
    subscription_plan = new_plan,
    subscription_status = new_status,
    subscription_start_date = start_date,
    subscription_end_date = end_date,
    stripe_customer_id = coalesce(stripe_customer, stripe_customer_id),
    stripe_subscription_id = coalesce(stripe_subscription, stripe_subscription_id),
    updated_at = timezone('utc'::text, now())
  where id = user_uuid;
end;
$$;
