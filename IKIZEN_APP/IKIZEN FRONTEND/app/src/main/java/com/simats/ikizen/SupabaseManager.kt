package com.simats.ikizen

import io.github.jan.supabase.createSupabaseClient
import io.github.jan.supabase.gotrue.Auth
import io.github.jan.supabase.postgrest.Postgrest

object SupabaseManager {
    // ⚠️ IMPORTANT: Replace these with your actual Supabase Project URL and Anon Key
    const val SUPABASE_URL = "https://wdlxvaoqxdzujwismcao.supabase.co"
    const val SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkbHh2YW9xeGR6dWp3aXNtY2FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyMDY3NzAsImV4cCI6MjEwMTc4Mjc3MH0.jQ9H3jvn-nT_4R4RcZ4RPwQFCprT5_bc5OcBz8hLpnI"

    val client = createSupabaseClient(
        supabaseUrl = SUPABASE_URL,
        supabaseKey = SUPABASE_KEY
    ) {
        install(Postgrest)
        install(Auth)
    }
}
