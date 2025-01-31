package com.example.exercise.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor@Entity
public class Product {

    @Id
    @GeneratedValue
    private UUID id;

    @NotBlank(message = "Название не должно быть пустым")
    private String name;

    @NotBlank(message = "Артикул не должен быть пустым")
    @Column(unique = true)
    private String article;

    @NotBlank(message = "Описание не должно быть пустым")
    private String description;

    @NotBlank(message = "Категория товара не должна быть пустой")
    private String category;

    @NotNull(message = "Цена не должна быть пустой")
    @DecimalMin(value = "0.0", inclusive = false, message = "Цена должна быть больше нуля")
    private BigDecimal price;

    @NotNull(message = "Количество не должно быть пустым")
    @Min(value = 0, message = "Количество не должно быть отрицательным")
    private Integer quantity;

    @UpdateTimestamp
    private LocalDateTime lastQuantityUpdate;

    @CreationTimestamp
    private LocalDateTime creationDate;
}