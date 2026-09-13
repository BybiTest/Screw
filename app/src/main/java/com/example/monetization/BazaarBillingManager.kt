package com.example.monetization

import android.app.Activity
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.content.ServiceConnection
import android.os.Bundle
import android.os.IBinder
import android.util.Log
import com.android.vending.billing.IInAppBillingService
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

class BazaarBillingManager(private val context: Context) {

    companion object {
        private const val TAG = "BazaarBilling"
        const val SKU_VIP_MONTHLY = "vip_monthly"
        const val SKU_VIP_LIFETIME = "vip_lifetime"
        const val SKU_COINS_500 = "coins_pack_500"
        const val SKU_COINS_2000 = "coins_pack_2000"
        const val BAZAAR_BILLING_ACTION = "ir.cafebazaar.pardakht.InAppBillingService.BIND"
        const val BAZAAR_PACKAGE = "com.farsitel.bazaar"
    }

    private var billingService: IInAppBillingService? = null
    private var isBound = false

    private val _isVipUser = MutableStateFlow(false)
    val isVipUser: StateFlow<Boolean> = _isVipUser.asStateFlow()

    private val serviceConnection = object : ServiceConnection {
        override fun onServiceConnected(name: ComponentName?, service: IBinder?) {
            billingService = IInAppBillingService.Stub.asInterface(service)
            isBound = true
            Log.d(TAG, "Cafe Bazaar Billing service connected")
        }

        override fun onServiceDisconnected(name: ComponentName?) {
            billingService = null
            isBound = false
            Log.d(TAG, "Cafe Bazaar Billing service disconnected")
        }
    }

    fun bindService(): Boolean {
        return try {
            val intent = Intent(BAZAAR_BILLING_ACTION).apply {
                setPackage(BAZAAR_PACKAGE)
            }
            context.bindService(intent, serviceConnection, Context.BIND_AUTO_CREATE)
        } catch (e: Exception) {
            Log.e(TAG, "Error binding Cafe Bazaar service", e)
            false
        }
    }

    fun unbindService() {
        if (isBound) {
            try {
                context.unbindService(serviceConnection)
                isBound = false
            } catch (e: Exception) {
                Log.e(TAG, "Error unbinding Cafe Bazaar service", e)
            }
        }
    }

    fun isConnected(): Boolean = billingService != null

    fun setVip(active: Boolean) {
        _isVipUser.value = active
    }
}
