package com.way2dev.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.way2dev.ecommerce.entity.Country;


/* Here we extend the JpaRepository .. this creates a fully functioning RestAPI for us
 * And since the Country ends with a "y"
 * so we've to define a custom rest api end point to get Country from the DB
 * */

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "countries" , path="countries")
public interface CountryRepository extends JpaRepository<Country, Integer>{

}
