package com.example.data

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "word_levels")
data class WordLevel(
    @PrimaryKey val id: Int,
    val stageNumber: Int,
    val letters: String, // e.g. "پ,ی,چ"
    val targetWords: String, // comma separated e.g. "پیچ,چپ"
    val isCompleted: Boolean = false,
    val scoreEarned: Int = 0
)

@Entity(tableName = "user_profile")
data class UserProfile(
    @PrimaryKey val id: Int = 1,
    val coins: Int = 200,
    val currentLevel: Int = 1,
    val isVip: Boolean = false,
    val adsWatchedCount: Int = 0
)
