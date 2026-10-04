import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// 环境变量缺失时给出明确提示，避免构建期只报一句 "supabaseUrl is required"
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "缺少 NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY 环境变量，请检查 .env.local 或 Vercel 后台配置"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
