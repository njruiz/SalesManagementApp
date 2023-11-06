import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/_models/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';

@Component({
  selector: 'app-add-order-modal',
  templateUrl: './add-order-modal.component.html',
  styleUrls: ['./add-order-modal.component.css'],
})
export class AddOrderModalComponent implements OnInit {
  orderForm: FormGroup;
  customerForm: FormGroup;

  productForm: FormGroup;
  categories: string[] = ['Ice Cream Cake', 'Cone Bites', 'Bread'];
  sizes: string[] = ['Regular', 'Medium', 'Large'];
  paymentModes: string[] = ['Cash', 'GCash', 'Maya', 'Bank Transfer'];
  status: string[] = ['Pending', 'For Delivery', 'Completed', 'Cancelled'];

  customerName: string;
  deliveryDate: Date;
  paymentMode: number;
  quantity: number = 0;

  products: Product[] = [
    {
      productCode: '202301',
      productName: 'Dark Chocolate',
      category: 'Ice Cream Cake',
      size: 'Regular',
      price: 135,
      flavor: 'Choco',
      description: 'Test',
    },
    {
      productCode: '202302',
      productName: 'Coffee',
      category: 'Ice Cream Cake',
      size: 'Large',
      price: 325,
      flavor: 'Choco',
      description: 'Test',
    },
    {
      productCode: '202303',
      productName: 'Ube Keso',
      category: 'Ice Cream Cake',
      size: 'Large',
      price: 325,
      flavor: 'Choco',
      description: 'Test',
    },
    {
      productCode: '202303',
      productName: 'Chocolate Matcha',
      category: 'Ice Cream Cake',
      size: 'Large',
      price: 135,
      flavor: 'Choco',
      description: 'Test',
    },
    {
      productCode: '202303',
      productName: 'Strawberry',
      category: 'Ice Cream Cake',
      size: 'Large',
      price: 325,
      flavor: 'Choco',
      description: 'Test',
    },
    // {
    //   id: '202303',
    //   name: 'Cookies & Cream',
    //   category: 'Ice Cream Cake',
    //   size: 'Large',
    //   price: 325,
    // }
  ];

  filteredOptions: Observable<string[]>;
  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddOrderModalComponent>,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      orderDetails: ['', Validators.required],
    });

    this.customerForm = this.formBuilder.group({
      customerName: ['', Validators.required],
      contactNumber: ['', Validators.required],
      deliveryAddress: ['', Validators.required],
      deliveryDate: ['', Validators.required],
      paymentMode: ['', Validators.required],
      status: ['', Validators.required],
      notes: [''],
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

    console.log('Form submitted! ' + this.orderForm.value);

    // Close the modal dialog
    this.dialogRef.close();
  }

  enableAddButton(): void {
    this.productForm.markAsTouched(); // Mark the control as touched to trigger validation
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }
}
