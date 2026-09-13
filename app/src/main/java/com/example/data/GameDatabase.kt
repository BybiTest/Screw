package com.example.data

import android.content.Context
import androidx.room.Dao
import androidx.room.Database
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.room.Update
import kotlinx.coroutines.flow.Flow

@Dao
interface LevelDao {
    @Query("SELECT * FROM word_levels ORDER BY stageNumber ASC")
    fun getAllLevels(): Flow<List<WordLevel>>

    @Query("SELECT * FROM word_levels WHERE stageNumber = :stage LIMIT 1")
    suspend fun getLevelByStage(stage: Int): WordLevel?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertLevels(levels: List<WordLevel>)

    @Update
    suspend fun updateLevel(level: WordLevel)
}

@Dao
interface UserProfileDao {
    @Query("SELECT * FROM user_profile WHERE id = 1 LIMIT 1")
    fun getUserProfile(): Flow<UserProfile?>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertOrUpdate(profile: UserProfile)

    @Query("UPDATE user_profile SET coins = coins + :amount WHERE id = 1")
    suspend fun addCoins(amount: Int)
}

@Database(entities = [WordLevel::class, UserProfile::class], version = 1, exportSchema = false)
abstract class GameDatabase : RoomDatabase() {
    abstract fun levelDao(): LevelDao
    abstract fun userProfileDao(): UserProfileDao

    companion object {
        @Volatile
        private var INSTANCE: GameDatabase? = null

        fun getDatabase(context: Context): GameDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    GameDatabase::class.java,
                    "kalame_pich_database"
                ).build()
                INSTANCE = instance
                instance
            }
        }
    }
}
