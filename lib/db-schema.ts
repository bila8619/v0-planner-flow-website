export const createTables = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'essential', 'complete', 'pro', 'family')),
    subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('active', 'cancelled', 'expired', 'trialing')),
    subscription_id TEXT,
    stripe_customer_id TEXT,
    subscription_end_date DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    stripe_subscription_id TEXT UNIQUE NOT NULL,
    stripe_price_id TEXT,
    plan_name TEXT NOT NULL,
    billing_cycle TEXT CHECK (billing_cycle IN ('monthly', 'yearly')),
    status TEXT CHECK (status IN ('active', 'cancelled', 'past_due', 'unpaid', 'incomplete')),
    current_period_start DATETIME,
    current_period_end DATETIME,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );

  CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    stripe_payment_intent_id TEXT UNIQUE NOT NULL,
    amount INTEGER NOT NULL,
    currency TEXT DEFAULT 'usd',
    status TEXT CHECK (status IN ('succeeded', 'failed', 'pending')),
    plan_name TEXT NOT NULL,
    billing_cycle TEXT CHECK (billing_cycle IN ('monthly', 'yearly')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );

  CREATE TABLE IF NOT EXISTS template_access (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    template_id TEXT NOT NULL,
    access_granted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_accessed_at DATETIME,
    UNIQUE(user_id, template_id),
    FOREIGN KEY (user_id) REFERENCES users (id)
  );

  CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
  CREATE INDEX IF NOT EXISTS idx_users_stripe_customer ON users (stripe_customer_id);
  CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions (user_id);
  CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe ON subscriptions (stripe_subscription_id);
  CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions (status, current_period_end);
  CREATE INDEX IF NOT EXISTS idx_payments_user ON payments (user_id);
  CREATE INDEX IF NOT EXISTS idx_payments_stripe ON payments (stripe_payment_intent_id);
  CREATE INDEX IF NOT EXISTS idx_template_access_user ON template_access (user_id, template_id);
`

export interface User {
  id: number
  email: string
  password: string
  plan: "free" | "essential" | "complete" | "pro" | "family"
  subscription_status: "active" | "cancelled" | "expired" | "trialing"
  subscription_id?: string
  stripe_customer_id?: string
  subscription_end_date?: string
  created_at: string
  updated_at?: string
}

export interface Subscription {
  id: number
  user_id: number
  stripe_subscription_id: string
  stripe_price_id?: string
  plan_name: string
  billing_cycle: "monthly" | "yearly"
  status: "active" | "cancelled" | "past_due" | "unpaid" | "incomplete"
  current_period_start: string
  current_period_end: string
  cancel_at_period_end: boolean
  created_at: string
  updated_at?: string
}

export interface Payment {
  id: number
  user_id: number
  stripe_payment_intent_id: string
  amount: number
  currency: string
  status: "succeeded" | "failed" | "pending"
  plan_name: string
  billing_cycle: "monthly" | "yearly"
  created_at: string
}

export interface TemplateAccess {
  id: number
  user_id: number
  template_id: string
  access_granted_at: string
  last_accessed_at?: string
}
