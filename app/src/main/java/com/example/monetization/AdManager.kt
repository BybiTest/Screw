package com.example.monetization

import android.app.Activity
import android.content.Context

interface RewardedAdListener {
    fun onAdLoaded() {}
    fun onAdOpened() {}
    fun onRewardEarned(amount: Int) {}
    fun onAdClosed(rewardCompleted: Boolean) {}
    fun onAdFailedToLoad(error: String) {}
    fun onAdShowFailed(error: String) {}
}

interface BannerAdListener {
    fun onAdLoaded() {}
    fun onAdFailedToLoad(error: String) {}
}

interface AdManager {
    fun initialize(context: Context, appKey: String)
    fun isInitialized(): Boolean
    fun isRewardedAdReady(): Boolean
    fun requestRewardedVideo(zoneId: String, listener: RewardedAdListener?)
    fun showRewardedVideo(activity: Activity, zoneId: String, listener: RewardedAdListener)
}
