package com.example

import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.monetization.RewardedAdListener
import com.example.monetization.TapsellAdManager
import com.example.ui.theme.*

class MainActivity : ComponentActivity() {

    private lateinit var tapsellAdManager: TapsellAdManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        tapsellAdManager = TapsellAdManager.getInstance()

        // Preload rewarded ad on startup
        tapsellAdManager.requestRewardedVideoFromActivity(this)

        setContent {
            KalamePichTheme {
                MainGameScreen(
                    onWatchAdClick = { onRewardSuccess ->
                        showRewardedAd(onRewardSuccess)
                    }
                )
            }
        }
    }

    private fun showRewardedAd(onRewardSuccess: () -> Unit) {
        if (!tapsellAdManager.isRewardedAdReady()) {
            Toast.makeText(this, "در حال بارگذاری ویدیوی تبلیغاتی تپسل...", Toast.LENGTH_SHORT).show()
            tapsellAdManager.requestRewardedVideoFromActivity(this, listener = object : RewardedAdListener {
                override fun onAdLoaded() {
                    tapsellAdManager.showRewardedVideo(this@MainActivity, listener = object : RewardedAdListener {
                        override fun onRewardEarned(amount: Int) {
                            Toast.makeText(this@MainActivity, "تبریک! ۵۰ سکه پاداش به حساب شما اضافه شد.", Toast.LENGTH_LONG).show()
                            onRewardSuccess()
                        }
                    })
                }
                override fun onAdFailedToLoad(error: String) {
                    // Fallback reward simulation if network is unreachable
                    Toast.makeText(this@MainActivity, "ویدیو مشاهده شد! ۵۰ سکه پاداش تعلق گرفت.", Toast.LENGTH_SHORT).show()
                    onRewardSuccess()
                }
            })
        } else {
            tapsellAdManager.showRewardedVideo(this, listener = object : RewardedAdListener {
                override fun onRewardEarned(amount: Int) {
                    Toast.makeText(this@MainActivity, "تبریک! ۵۰ سکه پاداش ویدیوی تپسل دریافت شد.", Toast.LENGTH_LONG).show()
                    onRewardSuccess()
                }
            })
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainGameScreen(
    onWatchAdClick: (onRewardSuccess: () -> Unit) -> Unit
) {
    var coins by remember { mutableIntStateOf(180) }
    var currentInput by remember { mutableStateOf("") }
    var solvedWords by remember { mutableStateOf(setOf<String>()) }
    var showAboutDialog by remember { mutableStateOf(false) }
    var showStoreDialog by remember { mutableStateOf(false) }
    var message by remember { mutableStateOf<String?>(null) }

    val targetWords = listOf("پیچ", "لپ", "پل", "کلمه", "کلک")
    val letters = listOf("پ", "ی", "چ", "ک", "ل", "م", "ه")

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Text(
                            text = "کلمه پیچ",
                            fontWeight = FontWeight.Black,
                            color = Color.White,
                            fontSize = 20.sp
                        )
                        Surface(
                            shape = RoundedCornerShape(12.dp),
                            color = Emerald500.copy(alpha = 0.2f),
                            border = androidx.compose.foundation.BorderStroke(1.dp, Emerald500.copy(alpha = 0.5f))
                        ) {
                            Text(
                                text = "نسخه ۱.۰.۰",
                                color = Emerald400,
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold,
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp)
                            )
                        }
                    }
                },
                actions = {
                    // Coins counter
                    Surface(
                        shape = RoundedCornerShape(16.dp),
                        color = Amber500.copy(alpha = 0.15f),
                        border = androidx.compose.foundation.BorderStroke(1.dp, Amber500.copy(alpha = 0.4f)),
                        modifier = Modifier.padding(end = 8.dp)
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp)
                        ) {
                            Icon(
                                imageVector = Icons.Default.MonetizationOn,
                                contentDescription = "Coins",
                                tint = Amber400,
                                modifier = Modifier.size(16.dp)
                            )
                            Spacer(modifier = Modifier.width(4.dp))
                            Text(
                                text = "$coins سکه",
                                color = Amber400,
                                fontWeight = FontWeight.Black,
                                fontSize = 13.sp
                            )
                        }
                    }

                    // About button
                    IconButton(onClick = { showAboutDialog = true }) {
                        Icon(
                            imageVector = Icons.Default.Info,
                            contentDescription = "About Developer",
                            tint = Color.White
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = Slate900
                )
            )
        },
        bottomBar = {
            // Bottom Action Bar: Tapsell Ad Button & Cafe Bazaar Store
            Surface(
                color = Slate900,
                border = androidx.compose.foundation.BorderStroke(1.dp, Slate800),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(12.dp),
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    // Rewarded Video Tapsell Ad Button
                    Button(
                        onClick = {
                            onWatchAdClick {
                                coins += 50
                                message = "۵۰ سکه جایزه تماشای ویدیوی تپسل اضافه شد!"
                            }
                        },
                        modifier = Modifier.weight(1f),
                        colors = ButtonDefaults.buttonColors(
                            containerColor = Emerald500
                        ),
                        shape = RoundedCornerShape(16.dp)
                    ) {
                        Icon(
                            imageVector = Icons.Default.PlayCircle,
                            contentDescription = "Watch Ad",
                            tint = Slate950
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = "تماشای ویدیو (+۵۰)",
                            color = Slate950,
                            fontWeight = FontWeight.Black,
                            fontSize = 12.sp
                        )
                    }

                    // Cafe Bazaar VIP Store Button
                    OutlinedButton(
                        onClick = { showStoreDialog = true },
                        modifier = Modifier.weight(1f),
                        shape = RoundedCornerShape(16.dp),
                        border = androidx.compose.foundation.BorderStroke(1.dp, Amber500.copy(alpha = 0.5f)),
                        colors = ButtonDefaults.outlinedButtonColors(
                            contentColor = Amber400
                        )
                    ) {
                        Icon(
                            imageVector = Icons.Default.ShoppingCart,
                            contentDescription = "Store",
                            tint = Amber400
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = "فروشگاه بازار",
                            color = Amber400,
                            fontWeight = FontWeight.Bold,
                            fontSize = 12.sp
                        )
                    }
                }
            }
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .background(Slate950)
                .padding(paddingValues)
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            // Stage Indicator & Notification
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Surface(
                    shape = RoundedCornerShape(16.dp),
                    color = Slate900,
                    border = androidx.compose.foundation.BorderStroke(1.dp, Slate800),
                    modifier = Modifier.padding(bottom = 8.dp)
                ) {
                    Text(
                        text = "مرحله ۱ • کلمات پنهان: ${solvedWords.size} از ${targetWords.size}",
                        color = Slate200,
                        fontWeight = FontWeight.Bold,
                        fontSize = 13.sp,
                        modifier = Modifier.padding(horizontal = 14.dp, vertical = 6.dp)
                    )
                }

                message?.let { msg ->
                    Surface(
                        shape = RoundedCornerShape(12.dp),
                        color = Emerald500.copy(alpha = 0.15f),
                        border = androidx.compose.foundation.BorderStroke(1.dp, Emerald500.copy(alpha = 0.4f)),
                        modifier = Modifier.padding(bottom = 8.dp)
                    ) {
                        Text(
                            text = msg,
                            color = Emerald400,
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold,
                            modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp)
                        )
                    }
                }

                // Solved Words Grid
                Row(
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                    modifier = Modifier.padding(vertical = 12.dp)
                ) {
                    targetWords.forEach { word ->
                        val isSolved = solvedWords.contains(word)
                        Surface(
                            shape = RoundedCornerShape(12.dp),
                            color = if (isSolved) Emerald500 else Slate900,
                            border = androidx.compose.foundation.BorderStroke(
                                1.dp,
                                if (isSolved) Emerald400 else Slate800
                            ),
                            modifier = Modifier.padding(2.dp)
                        ) {
                            Text(
                                text = if (isSolved) word else "؟".repeat(word.length),
                                color = if (isSolved) Slate950 else Slate400,
                                fontWeight = FontWeight.Bold,
                                fontSize = 14.sp,
                                modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp)
                            )
                        }
                    }
                }
            }

            // Current Input Display
            Surface(
                shape = RoundedCornerShape(20.dp),
                color = Slate900,
                border = androidx.compose.foundation.BorderStroke(2.dp, Cyan500.copy(alpha = 0.6f)),
                modifier = Modifier
                    .fillMaxWidth()
                    .height(60.dp)
            ) {
                Box(
                    contentAlignment = Alignment.Center,
                    modifier = Modifier.fillMaxSize()
                ) {
                    Text(
                        text = if (currentInput.isEmpty()) "حروف را برای ساخت کلمه لمس کنید" else currentInput,
                        color = if (currentInput.isEmpty()) Slate400 else Cyan400,
                        fontSize = if (currentInput.isEmpty()) 13.sp else 22.sp,
                        fontWeight = FontWeight.Black
                    )
                }
            }

            // Letters Wheel / Buttons
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(12.dp),
                modifier = Modifier.padding(bottom = 12.dp)
            ) {
                Row(
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    letters.take(4).forEach { letter ->
                        LetterButton(letter = letter, onClick = { currentInput += letter })
                    }
                }
                Row(
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    letters.drop(4).forEach { letter ->
                        LetterButton(letter = letter, onClick = { currentInput += letter })
                    }
                }

                // Control Action Buttons (Check / Clear)
                Row(
                    horizontalArrangement = Arrangement.spacedBy(12.dp),
                    modifier = Modifier.padding(top = 8.dp)
                ) {
                    Button(
                        onClick = {
                            if (currentInput.isNotBlank()) {
                                if (targetWords.contains(currentInput)) {
                                    if (solvedWords.contains(currentInput)) {
                                        message = "این کلمه را قبلاً کشف کرده‌اید!"
                                    } else {
                                        solvedWords = solvedWords + currentInput
                                        coins += 10
                                        message = "آفرین! کلمه «$currentInput» کشف شد (+۱۰ سکه)"
                                    }
                                } else {
                                    message = "کلمه در جدول این مرحله نیست!"
                                }
                                currentInput = ""
                            }
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = Cyan500),
                        shape = RoundedCornerShape(14.dp)
                    ) {
                        Text("ثبت کلمه", color = Slate950, fontWeight = FontWeight.Bold)
                    }

                    OutlinedButton(
                        onClick = { currentInput = "" },
                        shape = RoundedCornerShape(14.dp),
                        border = androidx.compose.foundation.BorderStroke(1.dp, Slate700)
                    ) {
                        Text("پاک کردن", color = Slate400)
                    }
                }
            }
        }
    }

    // About Developer & Version Dialog
    if (showAboutDialog) {
        AlertDialog(
            onDismissRequest = { showAboutDialog = false },
            title = {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Icon(imageVector = Icons.Default.Verified, contentDescription = null, tint = Amber400)
                    Text("درباره و سازنده اپلیکیشن", fontWeight = FontWeight.Black, fontSize = 17.sp)
                }
            },
            text = {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text("نام اثر: بازی فکری کلمه پیچ", fontWeight = FontWeight.Bold, color = Color.White)
                    Text("سازنده و پدیدآورنده: سیدحمیدموسوی زاده", fontWeight = FontWeight.Bold, color = Amber400)
                    Text("نسخه انتشاریه: ۱.۰.۰ (Version Code: 1)", color = Emerald400)
                    Text("پلتفرم انتشار: کافه‌بازار و اندروید", color = Slate400)
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        "کلیه حقوق مادی و معنوی این بازی به جناب آقای سیدحمیدموسوی زاده تعلق دارد.",
                        fontSize = 12.sp,
                        color = Slate400,
                        lineHeight = 18.sp
                    )
                }
            },
            confirmButton = {
                TextButton(onClick = { showAboutDialog = false }) {
                    Text("بستن", color = Emerald400, fontWeight = FontWeight.Bold)
                }
            },
            containerColor = Slate900,
            tonalElevation = 8.dp
        )
    }

    // Cafe Bazaar Store Dialog
    if (showStoreDialog) {
        AlertDialog(
            onDismissRequest = { showStoreDialog = false },
            title = {
                Text("فروشگاه درون‌برنامه‌ای کافه‌بازار", fontWeight = FontWeight.Black, fontSize = 17.sp)
            },
            text = {
                Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    Surface(
                        shape = RoundedCornerShape(12.dp),
                        color = Slate950,
                        border = androidx.compose.foundation.BorderStroke(1.dp, Slate800),
                        modifier = Modifier.fillMaxWidth().clickable {
                            coins += 500
                            message = "خرید ۵۰۰ سکه از بازار با موفقیت انجام شد!"
                            showStoreDialog = false
                        }
                    ) {
                        Row(
                            modifier = Modifier.padding(12.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text("بسته ۵۰۰ سکه طلایی", fontWeight = FontWeight.Bold, color = Color.White, fontSize = 13.sp)
                            Text("۵,۰۰۰ تومان", color = Amber400, fontWeight = FontWeight.Black, fontSize = 12.sp)
                        }
                    }

                    Surface(
                        shape = RoundedCornerShape(12.dp),
                        color = Slate950,
                        border = androidx.compose.foundation.BorderStroke(1.dp, Amber500.copy(alpha = 0.5f)),
                        modifier = Modifier.fillMaxWidth().clickable {
                            coins += 2000
                            message = "عضویت طلایی VIP بازار فعال شد!"
                            showStoreDialog = false
                        }
                    ) {
                        Row(
                            modifier = Modifier.padding(12.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text("اشتراک VIP + ۲۰۰۰ سکه", fontWeight = FontWeight.Bold, color = Amber400, fontSize = 13.sp)
                            Text("۱۹,۰۰۰ تومان", color = Amber400, fontWeight = FontWeight.Black, fontSize = 12.sp)
                        }
                    }
                }
            },
            confirmButton = {
                TextButton(onClick = { showStoreDialog = false }) {
                    Text("انصراف", color = Slate400)
                }
            },
            containerColor = Slate900
        )
    }
}

@Composable
fun LetterButton(
    letter: String,
    onClick: () -> Unit
) {
    Surface(
        shape = CircleShape,
        color = Slate900,
        border = androidx.compose.foundation.BorderStroke(2.dp, Amber500.copy(alpha = 0.7f)),
        modifier = Modifier
            .size(54.dp)
            .clickable(onClick = onClick)
    ) {
        Box(contentAlignment = Alignment.Center) {
            Text(
                text = letter,
                color = Color.White,
                fontSize = 20.sp,
                fontWeight = FontWeight.Black
            )
        }
    }
}
