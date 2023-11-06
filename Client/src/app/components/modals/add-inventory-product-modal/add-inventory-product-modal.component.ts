import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Product } from 'src/app/_models/product';

@Component({
  selector: 'app-add-inventory-product-modal',
  templateUrl: './add-inventory-product-modal.component.html',
  styleUrls: ['./add-inventory-product-modal.component.css']
})
export class AddInventoryProductModalComponent implements OnInit {
  productForm: FormGroup;
  categories: string[] = ['Ice Cream Cake', 'Cone Bites', 'Bread'];
  sizes: string[] = ['Regular', 'Medium', 'Large'];

  products: Product[] = [
    {
      productCode: '202301',
      productName: 'Dark Chocolate IceCream Cake',
      category: 'IceCream Cake',
      size: 'Regular',
      price: 135,
      flavor: 'Choco',
      description: 'Test'
    },
    {
      productCode: '202302',
      productName: 'Coffee IceCream Cake',
      category: 'IceCream Cake',
      size: 'Large',
      price: 325,
      flavor: 'Choco',
      description: 'Test'
    },
    {
      productCode: '202303',
      productName: 'Ube Keso IceCream Cake',
      category: 'IceCream Cake',
      size: 'Large',
      price: 325,
      flavor: 'Choco',
      description: 'Test'
    },
    {
      productCode: '202304',
      productName: 'Strawberry Choco Cone Bites',
      category: 'Cone Bites',
      size: 'Regular',
      price: 120,
      flavor: 'Choco',
      description: 'Test'
    },
    {
      productCode: '202305',
      productName: 'Red Velvet Cone Bites',
      category: 'Cone Bites',
      size: 'Regular',
      price: 120,
      flavor: 'Choco',
      description: 'Test'
    }
  ];

  filteredOptions: Observable<string[]>;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddInventoryProductModalComponent>
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      product: ['', Validators.required],
      category: ['', Validators.required],
      size: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }

  onCancel(): void {
    // Close the modal dialog without saving
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }
    
    console.log(this.productForm.value);

    // Close the modal dialog
    this.dialogRef.close();
  }

  enableAddButton(): void {
    this.productForm.markAsTouched(); // Mark the control as touched to trigger validation
  }
}
