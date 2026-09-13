plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
    alias(libs.plugins.google.devtools.ksp)
}

android {
    namespace = "com.example"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.example.kalamepich"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"

        val tapsellAppKey = (System.getenv("TAPSELL_APP_KEY")?.takeIf { it.isNotBlank() })
            ?: ((project.findProperty("TAPSELL_APP_KEY") as? String)?.takeIf { it.isNotBlank() })
            ?: "acndtrkbtbnoisqghcfnlpmasmpgtmikmgpgrlrbekjdggtfpldqgthcbmjqbsmdbpssnt"

        val tapsellRewardedZoneId = (System.getenv("TAPSELL_REWARDED_ZONE_ID")?.takeIf { it.isNotBlank() })
            ?: ((project.findProperty("TAPSELL_REWARDED_ZONE_ID") as? String)?.takeIf { it.isNotBlank() })
            ?: "6aa701ba1f07c00619f4519a"

        val tapsellBannerZoneId = (System.getenv("TAPSELL_BANNER_ZONE_ID")?.takeIf { it.isNotBlank() })
            ?: ((project.findProperty("TAPSELL_BANNER_ZONE_ID") as? String)?.takeIf { it.isNotBlank() })
            ?: "6aa70201796a202335abbcde"

        buildConfigField("String", "TAPSELL_APP_KEY", "\"$tapsellAppKey\"")
        buildConfigField("String", "TAPSELL_REWARDED_ZONE_ID", "\"$tapsellRewardedZoneId\"")
        buildConfigField("String", "TAPSELL_BANNER_ZONE_ID", "\"$tapsellBannerZoneId\"")
    }

    signingConfigs {
        create("release") {
            val keystoreFile = rootProject.file("release.keystore")
            if (keystoreFile.exists()) {
                storeFile = keystoreFile
                storePassword = (System.getenv("KEYSTORE_PASSWORD")?.takeIf { it.isNotBlank() }) ?: "bazaar123456"
                keyAlias = (System.getenv("KEY_ALIAS")?.takeIf { it.isNotBlank() }) ?: "bazaarkey"
                keyPassword = (System.getenv("KEY_PASSWORD")?.takeIf { it.isNotBlank() }) ?: "bazaar123456"
                enableV1Signing = true
                enableV2Signing = true
            } else {
                // Safe fallback to debug signing if release.keystore is absent
                initWith(getByName("debug"))
            }
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            signingConfig = signingConfigs.getByName("release")
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
        debug {
            applicationIdSuffix = ".debug"
            isDebuggable = true
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }

    buildFeatures {
        compose = true
        buildConfig = true
        aidl = true
    }

    lint {
        abortOnError = false
        checkReleaseBuilds = false
    }
}

dependencies {
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.activity.compose)
    implementation(libs.androidx.compose.ui)
    implementation(libs.androidx.compose.ui.graphics)
    implementation(libs.androidx.compose.ui.tooling.preview)
    implementation(libs.androidx.compose.material3)
    implementation(libs.androidx.compose.material.icons.extended)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.lifecycle.runtime.compose)
    implementation(libs.androidx.lifecycle.viewmodel.compose)
    
    // Room
    implementation(libs.androidx.room.runtime)
    implementation(libs.androidx.room.ktx)
    ksp(libs.androidx.room.compiler)

    // Image loading & Networking
    implementation(libs.coil.compose)
    implementation(libs.okhttp)

    // Tapsell Plus SDK
    implementation(libs.tapsell.plus.sdk)

    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)
    debugImplementation(libs.androidx.compose.ui.tooling)
    debugImplementation(libs.androidx.compose.ui.test.manifest)
}
