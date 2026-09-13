package com.android.vending.billing;

import android.os.Bundle;

/**
 * InAppBillingService is the service that provides in-app billing capabilities
 * for applications using Cafe Bazaar and standard billing implementations.
 */
interface IInAppBillingService {
    int isBillingSupported(int apiVersion, String packageName, String type);
    Bundle getSkuDetails(int apiVersion, String packageName, String type, in Bundle skusBundle);
    Bundle getBuyIntent(int apiVersion, String packageName, String sku, String type, String developerPayload);
    Bundle getPurchases(int apiVersion, String packageName, String type, String continuationToken);
    int consumePurchase(int apiVersion, String packageName, String purchaseToken);
}
