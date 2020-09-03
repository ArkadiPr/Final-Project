package com.geekbrains.finalproject.controllers;

import com.geekbrains.finalproject.entities.Product;
import com.geekbrains.finalproject.exceptions.ResourceNotFoundException;
import com.geekbrains.finalproject.services.ProductService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@AllArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.findAll();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.findById(id);
    }

    @PostMapping
    public Product addNewProduct(@RequestBody Product product) {
        if(product.getId() != null) {
            product.setId(null);
        }
        return productService.saveOrUpdate(product);
    }

    @PutMapping
    public Product editProduct(@RequestBody Product product) {
        if(!productService.existsById(product.getId())) {
            throw new ResourceNotFoundException("Товар с " + product.getId() + " не найден");
        }
        return productService.saveOrUpdate(product);
    }

    @DeleteMapping
    public void deleteAll() {
        productService.deleteAll();
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        productService.deleteById(id);
    }
}
