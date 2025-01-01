package com.way2dev.ecommerce.service;

import java.util.Set;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.way2dev.ecommerce.dao.CustomerRepository;
import com.way2dev.ecommerce.dto.Purchase;
import com.way2dev.ecommerce.dto.PurchaseResponse;
import com.way2dev.ecommerce.entity.Customer;
import com.way2dev.ecommerce.entity.Order;
import com.way2dev.ecommerce.entity.OrderItem;

import jakarta.transaction.Transactional;

@Service
public class CheckoutServiceImpl implements CheckoutService{

	private CustomerRepository customerRepository;
	
	public CheckoutServiceImpl(CustomerRepository customerRepository) {
		this.customerRepository = customerRepository;
	}
	
	@Override
	@Transactional
	public PurchaseResponse placeOrder(Purchase purchase) {
		// getting the orders from the purchase class
		Order order = purchase.getOrder();
		//generate tracking number
		String orderTrackingNumber = generateOrderTrackingNumber();
		//assign this tracking number to the order
		order.setOrderTrackingNumber(orderTrackingNumber);
		// get order items from purchase
		Set<OrderItem> orderItems = purchase.getOrderItems();
		//populate order with order items
		for(OrderItem item: orderItems) {
			order.add(item);
		}
		//populate order with shipping and billingAddress
		order.setShippingAddress(purchase.getShippingAddress());
		order.setBillingAddress(purchase.getBillingAddress());
		// get customer from purchase
		Customer theCustomer = purchase.getCustomer();
		// assign the order to the cusomer
		theCustomer.add(order);
		//save the customer with order info into DB
		customerRepository.save(theCustomer);
		
		//return a response
		return new PurchaseResponse(orderTrackingNumber);
	}

	private String generateOrderTrackingNumber() {
		// generate a random UIUD number
		return UUID.randomUUID().toString();
	}

}
