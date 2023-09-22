import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CategoryService } from 'app/4.services/category.service';
import { Category } from 'app/5.models/category';
import { Observable } from 'rxjs';


@Component({
  selector: 'shop',
  templateUrl: './shop-landing.component.html',
  styleUrls: ['./shop-landing.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopLandingComponent  {

  constructor(
    private route: Router,
    private categoryService: CategoryService
  ){
    this.categoryService.updateIsUsedCategoryList()
  }

  Category$ = this.categoryService.getCategoryList();

  sTitle = 'Made To Shopping By Categories';

  backToHome() {
    this.route.navigate(['home']);
  }

}
