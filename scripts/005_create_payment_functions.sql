-- Create Stripe checkout session function
create or replace function public.create_stripe_checkout_session(
  price_id text,
  success_url text default null,
  cancel_url text default null
)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid;
  user_email text;
  customer_id text;
  result json;
begin
  -- Get current user
  current_user_id := auth.uid();
  if current_user_id is null then
    return json_build_object('error', 'User not authenticated');
  end if;

  -- Get user email and customer ID
  select email, stripe_customer_id 
  into user_email, customer_id
  from profiles 
  where id = current_user_id;

  if user_email is null then
    return json_build_object('error', 'User profile not found');
  end if;

  -- Return checkout session data for frontend to handle
  return json_build_object(
    'success', true,
    'user_id', current_user_id,
    'email', user_email,
    'customer_id', customer_id,
    'price_id', price_id,
    -- Updated hardcoded URLs to use plannerflow.shop domain
    'success_url', coalesce(success_url, 'https://plannerflow.shop/checkout/success'),
    'cancel_url', coalesce(cancel_url, 'https://plannerflow.shop/pricing')
  );
end;
$$;

-- Create function to update subscription after payment
create or replace function public.update_user_subscription(
  user_id_param uuid,
  stripe_customer_id_param text,
  stripe_subscription_id_param text,
  subscription_plan_param text,
  subscription_status_param text default 'active'
)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  result json;
begin
  -- Update user profile with subscription details
  update profiles 
  set 
    stripe_customer_id = stripe_customer_id_param,
    stripe_subscription_id = stripe_subscription_id_param,
    subscription_plan = subscription_plan_param,
    subscription_status = subscription_status_param,
    subscription_start_date = now(),
    subscription_end_date = case 
      when subscription_plan_param like '%yearly%' then now() + interval '1 year'
      else now() + interval '1 month'
    end,
    updated_at = now()
  where id = user_id_param
  returning json_build_object(
    'id', id,
    'subscription_plan', subscription_plan,
    'subscription_status', subscription_status,
    'updated_at', updated_at
  ) into result;

  return coalesce(result, json_build_object('error', 'User not found'));
end;
$$;

-- Grant execute permissions
grant execute on function public.create_stripe_checkout_session(text, text, text) to authenticated;
grant execute on function public.update_user_subscription(uuid, text, text, text, text) to authenticated;
