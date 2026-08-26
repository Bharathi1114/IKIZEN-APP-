package com.simats.ikizen

import android.os.Bundle
import android.widget.ImageView
import androidx.appcompat.app.AppCompatActivity
import android.widget.Toast
import io.github.jan.supabase.gotrue.auth
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class SettingsActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_settings)

        findViewById<ImageView>(R.id.btnBack).setOnClickListener {
            finish()
        }

        findViewById<android.widget.TextView>(R.id.btnProfile).setOnClickListener {
            startActivity(android.content.Intent(this, ProfileActivity::class.java))
        }
        findViewById<android.widget.TextView>(R.id.btnChangePassword).setOnClickListener {
            startActivity(android.content.Intent(this, ChangePasswordActivity::class.java))
        }
        findViewById<android.widget.TextView>(R.id.btnPrivacy).setOnClickListener {
            startActivity(android.content.Intent(this, PrivacyActivity::class.java))
        }
        findViewById<android.widget.TextView>(R.id.btnTerms).setOnClickListener {
            startActivity(android.content.Intent(this, TermsActivity::class.java))
        }
        findViewById<android.widget.TextView>(R.id.btnHelp).setOnClickListener {
            startActivity(android.content.Intent(this, HelpActivity::class.java))
        }
        
        findViewById<android.widget.TextView>(R.id.btnLogout).setOnClickListener {
            CoroutineScope(Dispatchers.IO).launch {
                try {
                    SupabaseManager.client.auth.signOut()
                    withContext(Dispatchers.Main) {
                        OnboardingDataStore.reset()
                        val intent = android.content.Intent(this@SettingsActivity, LoginActivity::class.java)
                        intent.flags = android.content.Intent.FLAG_ACTIVITY_NEW_TASK or android.content.Intent.FLAG_ACTIVITY_CLEAR_TASK
                        startActivity(intent)
                        finish()
                    }
                } catch (e: Exception) {
                    withContext(Dispatchers.Main) {
                        Toast.makeText(this@SettingsActivity, "Error logging out: ${e.message}", Toast.LENGTH_SHORT).show()
                    }
                }
            }
        }
    }
}
