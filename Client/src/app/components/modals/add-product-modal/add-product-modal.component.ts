import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.css'],
})
export class AddProductModalComponent implements OnInit {
  productForm: FormGroup;
  options: string[] = ['Option 1', 'Option 2', 'Option 3'];
  sizes: string[] = ['Regular', 'Medium', 'Large'];

  filteredOptions: Observable<string[]>;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddProductModalComponent>,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      category: ['', Validators.required],
      flavor: ['', Validators.required],
      size: ['', Validators.required],
      price: ['', Validators.required],
      description: [''],
    });

    this.filteredOptions = this.productForm.get('category').valueChanges.pipe(
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
    
    this.addProduct();
  }

  addProduct() {
    this.productService.addProduct(this.productForm.value).subscribe({
      next: (response) => this.dialogRef.close(response),
      error: (error) => console.log(error),
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  enableAddButton(): void {
    this.productForm.markAsTouched(); // Mark the control as touched to trigger validation
  }
}
