-- Enable HTTP extension for external API calls
CREATE EXTENSION IF NOT EXISTS http;

-- Function to create Stripe checkout session
CREATE OR REPLACE FUNCTION create_stripe_checkout_session(price_id TEXT)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    stripe_response JSON;
    checkout_url TEXT;
    user_id UUID;
    user_email TEXT;
BEGIN
    -- Get current user
    user_id := auth.uid();
    IF user_id IS NULL THEN
        RETURN json_build_object('error', 'User not authenticated');
    END IF;
    
    -- Get user email
    SELECT email INTO user_email FROM auth.users WHERE id = user_id;
    
    -- Create Stripe checkout session via HTTP request
    SELECT content::JSON INTO stripe_response
    FROM http((
        'POST',
        'https://api.stripe.com/v1/checkout/sessions',
        ARRAY[
            http_header('Authorization', 'Bearer ' || current_setting('app.stripe_secret_key')),
            http_header('Content-Type', 'application/x-www-form-urlencoded')
        ],
        'application/x-www-form-urlencoded',
        'mode=subscription' ||
        '&line_items[0][price]=' || price_id ||
        '&line_items[0][quantity]=1' ||
        '&success_url=' || current_setting('app.site_url') || '/checkout/success?session_id={CHECKOUT_SESSION_ID}' ||
        '&cancel_url=' || current_setting('app.site_url') || '/pricing' ||
        '&customer_email=' || user_email ||
        '&metadata[user_id]=' || user_id::TEXT
    )::http_request);
    
    -- Extract checkout URL
    checkout_url := stripe_response->>'url';
    
    RETURN json_build_object('url', checkout_url);
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('error', SQLERRM);
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION create_stripe_checkout_session(TEXT) TO authenticated;
