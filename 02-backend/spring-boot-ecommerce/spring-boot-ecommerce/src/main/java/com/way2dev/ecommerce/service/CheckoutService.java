package com.way2dev.ecommerce.service;

import com.way2dev.ecommerce.dto.Purchase;
import com.way2dev.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {
	
	PurchaseResponse placeOrder(Purchase purchase);

}
