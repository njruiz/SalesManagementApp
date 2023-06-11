import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { InventoryItem } from 'src/app/_models/inventoryItem';

@Component({
  selector: 'app-add-inventory-resource-modal',
  templateUrl: './add-inventory-resource-modal.component.html',
  styleUrls: ['./add-inventory-resource-modal.component.css']
})
export class AddInventoryResourceModalComponent implements OnInit {
  productForm: FormGroup;
  categories: string[] = ['Ice Cream Cake', 'Cone Bites', 'Bread'];
  sizes: string[] = ['Regular', 'Medium', 'Large'];

  resources: InventoryItem[] = [
    {
      name: 'Tin Can',
      brand: 'Ava\'s Baking Supplies',
      status: 'Available',
      size: 'Large',
      quantity: 120,
      price: 54,
      id: 'R-20230601',
    },
    {
      name: 'Tin Can',
      brand: 'Shopee',
      status: 'Available',
      size: 'Regular',
      quantity: 95,
      price: 45,
      id: 'R-20230602',
    },
    {
      name: 'Condensed Milk',
      brand: 'Angel\'s',
      status: 'Available',
      size: '325 mL',
      quantity: 12,
      price: 45,
      id: 'R-20230603',
    },
    {
      name: 'All Pupose Cream',
      brand: 'Nestle',
      status: 'Available',
      size: '1 L',
      quantity: 4,
      price: 298,
      id: 'R-20230604',
    },
    {
      name: 'Chocolate Bar',
      brand: 'Goya',
      status: 'Available',
      size: '1 Kg',
      quantity: 9,
      price: 275,
      id: 'R-20230605',
    }
  ];

  filteredOptions: Observable<string[]>;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddInventoryResourceModalComponent>
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      itemName: ['', Validators.required],
      brandName: ['', Validators.required],
      size: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
    });

    this.filteredOptions = this.productForm.get('size').valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.sizes.filter((size) =>
      size.toLowerCase().includes(filterValue)
    );
  }
}
