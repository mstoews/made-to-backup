import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'app/models/category';
import { IImageStorage } from 'app/models/maintenance';
import { Product } from 'app/models/products';
import { CategoryService } from 'app/services/category.service';
import { ProductsService } from 'app/services/products.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { imageItem } from 'app/models/imageItem';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  sTitle: any;
  rich_description: string;
  prdGroup: FormGroup;
  action: string;
  party: string;
  cPriority: string;
  cRAG: string;
  cType: string;
  currentDate: Date;
  product: Product;
  productId: string;
  current_Url: string;
  updated_category: string;
  selectedItemKeys: string;
  categories: Category[];
  imageArray: imageItem[] = [];
  inventoryImages$: Observable<IImageStorage[]>;

  allProducts$: Observable<Product>;
  category$: Observable<Category[]>;
  prd: any;
  sub: any;
  productItem$: Observable<Product>;
  IN_FEATURED = 'IN_INVENTORY';


  constructor(
    private matDialog: MatDialog,
    private activateRoute: ActivatedRoute,
    private _location: Location,
    private afs: AngularFirestore,
    private readonly categoryService: CategoryService,
    private readonly productService: ProductsService,
    private fb: FormBuilder
  ) {
    // this.prd = this.productType;
    this.createEmptyForm();
  }

  ngOnInit() {
    var counter = 0;
    this.sTitle = 'Product Inventory and Images';
    this.sub = this.activateRoute.params.subscribe((params) => {
      const prd = this.productService.findProductByUrl(params['id']);
      if (prd) {
        this.productItem$ = prd;
        this.productId = params['id'];
        this.productItem$.subscribe((prd) => {
          this.rich_description = prd.rich_description;
          this.createForm(prd);
        });
      }
    });


    this.category$ = this.categoryService.getAll();
    this.category$.subscribe((result) => {
      this.categories = result;
    });

    if (this.inventoryImages$){
    this.inventoryImages$.subscribe((image) => {
      image.forEach((img) => {
        counter++;
        const image: imageItem = {
          parentId: this.productId,
          imageSrc: img.url,
          caption: img.name,
          type: this.IN_FEATURED,
          imageAlt: 'Inventory Image',
          ranking: counter,

        };
        this.imageArray.push(image);
      });
     });
    }
  }


  createProduct(results: any) {
    const newProduct = { ...this.prdGroup.value } as Product;
    newProduct.image = results.data.url;
    // Update the data for the product
    this.productService.update(newProduct);
    this.prdGroup.setValue(newProduct);
    // update the images for the product
    this.afs
      .collection('inventory')
      .doc(newProduct.id)
      .collection('images')
      .add(results.data);
  }

  changeCategory(category: any) {
    this.updated_category = category;
  }

  createEmptyForm() {
    this.prdGroup = this.fb.group({
      id: [''],
      description: [''],
      rich_description: [''],
      image: [''],
      images: [''],
      brand: [''],
      price: [''],
      category: [''],
      rating: [''],
      is_featured: [''],
      user_updated: [''],
      date_created: [''],
      date_updated: [''],
    });
  }

  createForm(prd: Product) {
    this.sTitle = 'Inventory - ' + prd.description;

    this.prdGroup = this.fb.group({
      id: [prd.id],
      description: [prd.description],
      rich_description: [prd.rich_description],
      image: [prd.image],
      brand: [prd.brand],
      price: [prd.price],
      category: [prd.category],
      rating: [prd.rating],
      is_featured: [prd.is_featured],
      user_updated: [prd.user_updated],
      date_created: [prd.date_created],
      date_updated: [prd.date_updated],
    });
  }

  onBackToInventory() {
    this._location.back();
  }

  // onOpenButtonClicked(event: any) {
  //   var counter = 0;
  //   this.imageArray = [];
  //   this.inventoryImages$ = this.productService.getProductImage(event.id);
  //   this.current_Url = event.image;
  //   this.rich_description = event.rich_description;
  //   this.updated_category = event.category;

  //   this.inventoryImages$.subscribe((image) => {
  //     image.forEach((img) => {
  //       counter++;
  //       const Image: IImageStorage = {
  //         url: img.url,
  //         name: img.name,
  //         parentId: img.parentId,
  //         version_no: counter,
  //       };
  //       this.imageArray.push(Image);
  //     });
  //   });
  //   this.prdGroup.setValue(event);
  // }

  public productType = {
    id: '',
    description: '',
    rich_description: '',
    image: '',
    images: '',
    brand: '',
    price: '',
    category: '',
    rating: '',
    is_featured: '',
    user_updated: '',
    date_created: '',
    date_updated: '',
  };
}