-- Remove template access logging functionality from Supabase
-- This script removes the table, functions, triggers, and policies

-- Drop the template_access_log table and all related objects
DROP TABLE IF EXISTS public.template_access_log CASCADE;

-- Drop any functions related to template access logging
DROP FUNCTION IF EXISTS public.log_template_access(uuid, text) CASCADE;
DROP FUNCTION IF EXISTS public.get_user_template_access(uuid) CASCADE;

-- Drop any triggers related to template access logging
DROP TRIGGER IF EXISTS update_profile_templates_accessed ON public.template_access_log;

-- Remove templates_accessed column from profiles table if it exists
ALTER TABLE public.profiles DROP COLUMN IF EXISTS templates_accessed;

-- Clean up any RLS policies related to template access logging
DROP POLICY IF EXISTS "Users can view own template access" ON public.template_access_log;
DROP POLICY IF EXISTS "Users can insert own template access" ON public.template_access_log;

-- Remove any indexes related to template access logging
DROP INDEX IF EXISTS idx_template_access_log_user_id;
DROP INDEX IF EXISTS idx_template_access_log_template_id;
DROP INDEX IF EXISTS idx_template_access_log_accessed_at;

COMMIT;
