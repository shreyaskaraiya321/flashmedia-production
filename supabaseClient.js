// Import Supabase directly from the web CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

// Paste your actual URL and Anon Key inside these quotes!
const supabaseUrl = 'https://nhvkljfykcvyotwazicu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5odmtsamZ5a2N2eW90d2F6aWN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyMTQwNzMsImV4cCI6MjA5ODc5MDA3M30.R0datZcQ7Npa3R7pogDV8EedP4MSH4bJgb11wVGnjko';

// Export the client instance so any form page can import it and push data
export const supabase = createClient(supabaseUrl, supabaseAnonKey);