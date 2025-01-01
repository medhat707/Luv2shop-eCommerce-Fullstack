package com.way2dev.ecommerce.dto;

import java.util.Set;

import com.way2dev.ecommerce.entity.Address;
import com.way2dev.ecommerce.entity.Customer;
import com.way2dev.ecommerce.entity.Order;
import com.way2dev.ecommerce.entity.OrderItem;

public class Purchase {
	
	private Customer customer;
	private Address billingAddress;
	private Address shippingAddress;
	private Order order;
	private Set<OrderItem> orderItems;
	
	
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	public Address getBillingAddress() {
		return billingAddress;
	}
	public void setBillingAddress(Address billingAddress) {
		this.billingAddress = billingAddress;
	}
	public Address getShippingAddress() {
		return shippingAddress;
	}
	public void setShippingAddress(Address shippingAddress) {
		this.shippingAddress = shippingAddress;
	}
	public Order getOrder() {
		return order;
	}
	public void setOrder(Order order) {
		this.order = order;
	}
	public Set<OrderItem> getOrderItems() {
		return orderItems;
	}
	public void setOrderItems(Set<OrderItem> orderItems) {
		this.orderItems = orderItems;
	}
	
	
}
