
package com.way2dev.ecommerce.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.way2dev.ecommerce.entity.Product;
import com.way2dev.ecommerce.entity.ProductCategory;

import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;

// created to disable post,delete,update operations because we do not need them for now
@Configuration
public class MyDateRestConfig implements RepositoryRestConfigurer {
	/*
	1. adding support for exposing the id field in spring data Rest
	For that we first need the entityManager and inject it in class constructor
	
	2. define helper method to help us to expose the ids 
	
	3. call helper method inside the configureRepositoryRestConfiguration method
	*/
	
	
	
	private EntityManager entityManager;
	
	public MyDateRestConfig(EntityManager theEntityManager) {
		entityManager = theEntityManager;
	}
	
	
	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
		// TODO Auto-generated method stub
		RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);
		
		HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST , 
				HttpMethod.DELETE};
		
		//disable HTTP methods for Product
		config.getExposureConfiguration()
			.forDomainType(Product.class)
			.withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
			.withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
		
		//disable HTTP methods for ProductCategory
		config.getExposureConfiguration()
			.forDomainType(ProductCategory.class)
			.withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
			.withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
		
		//calling the internal helper method
		exposeIds(config);

	}
	
	public void exposeIds(RepositoryRestConfiguration config) {
		//expose ids
		
		//get a list of all entity class from the  entity manager
		Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
		
		//create an array list of those entities types
		List<Class> entityClasses = new ArrayList<>();
		
		/*populate arrayList
		 get all entity types for the entities
		*/
		
		for(EntityType tempEntityType : entities ) {
			entityClasses.add(tempEntityType.getJavaType());
		}
		
		//expose the entity ids for the array of entity/domain types
		Class[] domainTypes = entityClasses.toArray(new Class[0]);
		config.exposeIdsFor(domainTypes);
		
	}
	

}
