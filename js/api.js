import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
// ganti dengan project kamu
const SUPABASE_URL = "https://yavvboamvvqsrcrlpiwx.supabase.co";
const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhdnZib2FtdnZxc3JjcmxwaXd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzOTY2NTgsImV4cCI6MjA3NDk3MjY1OH0.rhPzeTFwpkKdCiJBcUumc9dB_4CLI_3tuKxVITMbR14";

// buat client sekali saja
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
