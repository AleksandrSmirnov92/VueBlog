require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseKey = process.env.ANON_KEY;
const supabaseUrl = "https://hlsivvkunvjmwgegcrzt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhsc2l2dmt1bnZqbXdnZWdjcnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYzMDkxNTUsImV4cCI6MjAwMTg4NTE1NX0.lDTzCmkEjbaVe1MbAI3swcEI1S7d9dqDKSSraGDfhJg";
export const supabase = createClient(supabaseUrl, supabaseKey);
