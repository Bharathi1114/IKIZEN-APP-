// Supabase Setup
const SUPABASE_URL = "https://wdlxvaoqxdzujwismcao.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkbHh2YW9xeGR6dWp3aXNtY2FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyMDY3NzAsImV4cCI6MjEwMTc4Mjc3MH0.jQ9H3jvn-nT_4R4RcZ4RPwQFCprT5_bc5OcBz8hLpnI";

// Initialize the client
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

console.log("Supabase client initialized");
