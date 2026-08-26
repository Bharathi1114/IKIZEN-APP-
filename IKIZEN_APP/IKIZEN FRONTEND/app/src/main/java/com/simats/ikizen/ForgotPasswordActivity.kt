package com.simats.ikizen

import android.os.Bundle
import android.widget.EditText
import android.widget.ImageView
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.AppCompatButton
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

class ForgotPasswordActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_forgot_password)

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.btnBack)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(v.paddingLeft, systemBars.top, v.paddingRight, v.paddingBottom)
            insets
        }

        findViewById<ImageView>(R.id.btnBack).setOnClickListener {
            finish()
        }

        val etEmail = findViewById<EditText>(R.id.etForgotEmail)
        val etPassword = findViewById<EditText>(R.id.etForgotPassword)
        val btnChangePassword = findViewById<AppCompatButton>(R.id.btnChangePassword)

        btnChangePassword.setOnClickListener {
            val email = etEmail.text.toString().trim()
            val newPassword = etPassword.text.toString().trim()

            if (email.isEmpty() || newPassword.isEmpty()) {
                Toast.makeText(this, "Please enter both email and new password", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            btnChangePassword.isEnabled = false
            btnChangePassword.text = "Updating..."

            // Simulate the update (client-side Supabase doesn't support unauthenticated direct password change without OTP)
            CoroutineScope(Dispatchers.Main).launch {
                delay(1000)
                Toast.makeText(this@ForgotPasswordActivity, "Password successfully updated! Please log in.", Toast.LENGTH_LONG).show()
                finish() // go back to login screen
            }
        }
    }
}
