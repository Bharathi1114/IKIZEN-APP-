package com.simats.ikizen

import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class RoutineActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_routine)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.rootLayout)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        
        findViewById<android.widget.ImageView>(R.id.btnBack).setOnClickListener {
            finish()
        }
        
        findViewById<androidx.appcompat.widget.AppCompatButton>(R.id.btnContinueRoutine).setOnClickListener {
            startActivity(android.content.Intent(this, TargetActivity::class.java))
        }

        setupTimePicker(R.id.ivEdit1, R.id.tvTime1)
        setupTimePicker(R.id.ivEdit2, R.id.tvTime2)
        setupTimePicker(R.id.ivEdit3, R.id.tvTime3)
        setupTimePicker(R.id.ivEdit4, R.id.tvTime4)
        setupTimePicker(R.id.ivEdit5, R.id.tvTime5)
        setupTimePicker(R.id.ivEdit6, R.id.tvTime6)
        setupTimePicker(R.id.ivEdit7, R.id.tvTime7)
        setupTimePicker(R.id.ivEdit8, R.id.tvTime8)
        setupTimePicker(R.id.ivEdit9, R.id.tvTime9)
    }

    private fun setupTimePicker(ivEditId: Int, tvTimeId: Int) {
        findViewById<android.widget.ImageView>(ivEditId).setOnClickListener {
            val tvTime = findViewById<android.widget.TextView>(tvTimeId)
            val currentTime = tvTime.text.toString()
            var hour = 7
            var minute = 0
            try {
                val parts = currentTime.split(":")
                hour = parts[0].toInt()
                minute = parts[1].toInt()
            } catch (e: Exception) {}

            val picker = android.app.TimePickerDialog(this, { _, selectedHour, selectedMinute ->
                val formattedTime = String.format(java.util.Locale.US, "%02d:%02d", selectedHour, selectedMinute)
                tvTime.text = formattedTime
            }, hour, minute, true)
            picker.show()
        }
    }
}
