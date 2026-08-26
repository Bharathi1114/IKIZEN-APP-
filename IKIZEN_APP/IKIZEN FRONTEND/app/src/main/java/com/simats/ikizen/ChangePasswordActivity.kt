package com.simats.ikizen

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import io.github.jan.supabase.gotrue.auth
import io.github.jan.supabase.gotrue.providers.builtin.Email
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class ChangePasswordActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_change_password)

        findViewById<ImageView>(R.id.btnBack).setOnClickListener {
            finish()
        }

        val etCurrent = findViewById<EditText>(R.id.etCurrentPassword)
        val etNew = findViewById<EditText>(R.id.etNewPassword)
        val btnUpdate = findViewById<Button>(R.id.btnUpdatePassword)

        btnUpdate.setOnClickListener {
            val currentPwd = etCurrent.text.toString()
            val newPwd = etNew.text.toString()

            if (currentPwd.isEmpty() || newPwd.isEmpty()) {
                Toast.makeText(this, "Please fill all fields", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }
            if (newPwd.length < 6) {
                Toast.makeText(this, "New password must be at least 6 characters", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            // Perform Supabase update
            CoroutineScope(Dispatchers.IO).launch {
                try {
                    // Update user auth password
                    SupabaseManager.client.auth.modifyUser {
                        password = newPwd
                    }
                    withContext(Dispatchers.Main) {
                        Toast.makeText(this@ChangePasswordActivity, "Password updated successfully!", Toast.LENGTH_SHORT).show()
                        finish()
                    }
                } catch (e: Exception) {
                    withContext(Dispatchers.Main) {
                        Toast.makeText(this@ChangePasswordActivity, "Error: ${e.message}", Toast.LENGTH_LONG).show()
                    }
                }
            }
        }
    }
}
