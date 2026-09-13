package com.example

import android.app.Application
import android.util.Log
import com.example.monetization.TapsellAdManager

class KalamePichApp : Application() {

    override fun onCreate() {
        super.onCreate()
        Log.i("KalamePichApp", "Kalame Pich app starting - Created by سیدحمیدموسوی زاده - Version 1.0.0")

        // Initialize Tapsell Plus SDK with user's verified App Key
        try {
            val adManager = TapsellAdManager.getInstance()
            adManager.initialize(this, BuildConfig.TAPSELL_APP_KEY)
            Log.i("KalamePichApp", "Tapsell initialized successfully")
        } catch (e: Exception) {
            Log.e("KalamePichApp", "Error initializing Tapsell", e)
        }
    }
}
