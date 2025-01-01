package com.way2dev.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.way2dev.ecommerce.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

	
}
