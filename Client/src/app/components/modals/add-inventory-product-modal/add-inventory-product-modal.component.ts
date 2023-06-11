import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
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
      id: '202301',
      name: 'Dark Chocolate IceCream Cake',
      category: 'IceCream Cake',
      size: 'Regular',
      price: 135,
    },
    {
      id: '202302',
      name: 'Coffee IceCream Cake',
      category: 'IceCream Cake',
      size: 'Large',
      price: 325,
    },
    {
      id: '202303',
      name: 'Ube Keso IceCream Cake',
      category: 'IceCream Cake',
      size: 'Large',
      price: 325,
    },
    {
      id: '202304',
      name: 'Strawberry Choco Cone Bites',
      category: 'Cone Bites',
      size: 'Regular',
      price: 120,
    },
    {
      id: '202305',
      name: 'Red Velvet Cone Bites',
      category: 'Cone Bites',
      size: 'Regular',
      price: 120,
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
