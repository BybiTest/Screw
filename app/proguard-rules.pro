# Tapsell Plus Proguard Rules
-keep class ir.tapsell.plus.** { *; }
-keep interface ir.tapsell.plus.** { *; }
-dontwarn ir.tapsell.plus.**

# Cafe Bazaar In-App Billing AIDL
-keep class com.android.vending.billing.** { *; }
-keep interface com.android.vending.billing.** { *; }

# Kotlin Coroutines & Room
-keepclassmembers class * extends androidx.room.RoomDatabase {
    <init>();
}
-keep class * extends androidx.room.RoomDatabase
-dontwarn androidx.room.paging.**

# Compose
-keep class androidx.compose.material.icons.** { *; }
