import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/_models/product';
import { UploadService } from 'src/app/_services/upload.service';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.css'],
})
export class EditProductModalComponent implements OnInit {
  productForm: FormGroup;
  products: Partial<Product[]>;
  categories: string[];
  sizes: string[] = ['Regular', 'Medium', 'Large'];

  categoryOptions: Observable<string[]>;
  baseUrl = environment.apiUrl;

  file: File = null;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditProductModalComponent>,
    private productService: ProductService,
    private uploadService: UploadService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.categories = this.getCategories(this.products);

    this.productForm = this.formBuilder.group({
      category: ['', Validators.required],
      flavor: ['', Validators.required],
      size: ['', Validators.required],
      price: ['', Validators.required],
      description: [''],
    });

    this.categoryOptions = this.productForm.get('category').valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );

    this.productForm.patchValue(this.data.product);
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }
    this.editProduct();
  }

  checkHasUploadedImage(): boolean {
    let flag = true;
    if (!(<HTMLInputElement>document.getElementById('formFile')).value) {
      flag = false;
    }
    return flag;
  }

  editProduct() {
    this.productService
      .editProduct(this.productForm.value, this.data.product.productCode)
      .subscribe({
        next: (newProducts) => {
          const product: Product = newProducts.find(
            (p) => p.id === this.data.product.id
          );

          if (this.checkHasUploadedImage()) {
            if (product.photoUrl.length > 0) {
              this.uploadService
                .updateProductPhoto(this.file, product.productCode)
                .subscribe({
                  next: (productPhoto) => {
                    product.photoUrl = productPhoto.url;
                  },
                  error: (error) => console.log(error),
                });
            } else {
              this.uploadService
                .uploadProductPhoto(this.file, product.productCode)
                .subscribe({
                  next: (productPhoto) => {
                    product.photoUrl = productPhoto.url;
                  },
                  error: (error) => console.log(error),
                });
            }
          }
          console.log(newProducts);
          this.dialogRef.close(newProducts);
        },
        error: (error) => console.log(error),
      });
  }

  enableAddButton(): void {
    this.productForm.markAsTouched(); // Mark the control as touched to trigger validation
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  getCategories(products: Product[]) {
    const allCategories: string[] = products
      .map((product) => product.category) // Extract categories array for each product
      .reduce((acc, categories) => acc.concat(categories), []) // Flatten the array
      .filter((category, index, array) => array.indexOf(category) === index); // Remove duplicates

    return allCategories;
  }

  // File Upload
  onFilechange(event: any) {
    this.file = event.target.files[0];
  }

  onCancel(): void {
    // Close the modal dialog without saving
    this.dialogRef.close();
  }

  populateForm() {
    this.productForm = this.formBuilder.group({
      category: this.data.product.category,
      flavor: this.data.product.flavor,
      size: this.data.product.size,
      price: this.data.product.price,
      description: this.data.product.description,
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.categories.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
