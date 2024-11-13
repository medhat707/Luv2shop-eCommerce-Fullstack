package com.way2dev.ecommerce.dao;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.way2dev.ecommerce.entity.Product;
import com.way2dev.ecommerce.entity.ProductCategory;


//origin is about having comman protocol e.g. http , hostname e.g. localhost , port number 4200
@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory , Long>{

}
