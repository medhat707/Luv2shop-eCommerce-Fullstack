package com.way2dev.ecommerce.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.way2dev.ecommerce.entity.State;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource
public interface StateRepository extends JpaRepository<State, Integer>{
	
	/* 
	 * do a custom query to get state by country code
	 * This exposes this endpoint
	 * http://localhost:8085/api/states/search/findByCountryCode?code=US
	 */
	
	List<State> findByCountryCode(@Param("code") String code);
	

}
