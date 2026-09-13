package com.example.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable

private val DarkColorScheme = darkColorScheme(
    primary = Emerald500,
    secondary = Amber500,
    tertiary = Cyan500,
    background = Slate950,
    surface = Slate900,
    onPrimary = Slate950,
    onSecondary = Slate950,
    onBackground = Slate200,
    onSurface = Slate200
)

@Composable
fun KalamePichTheme(
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = DarkColorScheme,
        typography = Typography,
        content = content
    )
}
