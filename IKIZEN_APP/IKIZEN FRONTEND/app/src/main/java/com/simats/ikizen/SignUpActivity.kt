package com.simats.ikizen

import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

import android.content.Intent
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.widget.AppCompatButton
import io.github.jan.supabase.gotrue.auth
import io.github.jan.supabase.gotrue.providers.builtin.Email
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class SignUpActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_sign_up)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.tvTitle)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(v.paddingLeft, systemBars.top, v.paddingRight, v.paddingBottom)
            insets
        }
        
        val etEmail = findViewById<EditText>(R.id.etEmail)
        val etPassword = findViewById<EditText>(R.id.etPassword)
        val etFullName = findViewById<EditText>(R.id.etFullName)
        val btnCreateAccount = findViewById<AppCompatButton>(R.id.btnCreateAccount)
        val tvLogin = findViewById<android.widget.TextView>(R.id.tvLogin)

        tvLogin.setOnClickListener {
            startActivity(Intent(this, LoginActivity::class.java))
            finish()
        }

        btnCreateAccount.setOnClickListener {
            val email = etEmail.text.toString().trim()
            val password = etPassword.text.toString().trim()
            val fullName = etFullName.text.toString().trim()
            
            if (email.isEmpty() || password.isEmpty() || fullName.isEmpty()) {
                Toast.makeText(this, "Please fill out all fields", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }
            
            btnCreateAccount.isEnabled = false
            btnCreateAccount.text = "Creating..."
            
            CoroutineScope(Dispatchers.Main).launch {
                try {
                    SupabaseManager.client.auth.signUpWith(Email) {
                        this.email = email
                        this.password = password
                    }
                    OnboardingDataStore.reset()
                    OnboardingDataStore.userProfile = OnboardingDataStore.userProfile.copy(name = fullName)
                    
                    val intent = Intent(this@SignUpActivity, BasicsActivity::class.java)
                    intent.putExtra("USER_FULL_NAME", fullName)
                    startActivity(intent)
                    finish()
                } catch (e: Exception) {
                    val msg = e.message ?: ""
                    val cleanMsg = if (msg.contains("User already registered")) {
                        "This email is already registered."
                    } else if (msg.contains("Password should be at least")) {
                        "Password is too short (minimum 6 characters)."
                    } else {
                        "Sign Up Failed. Check your email format and password."
                    }
                    Toast.makeText(this@SignUpActivity, cleanMsg, Toast.LENGTH_LONG).show()
                    btnCreateAccount.isEnabled = true
                    btnCreateAccount.text = "Create Account"
                }
            }
        }
    }
}
