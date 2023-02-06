import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';
import { CartService } from 'app/services/cart.service';
import { CheckoutService } from 'app/services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  cartId: string;
  purchaseStarted: boolean = false;

  profileGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private route: Router,
    private activateRoute: ActivatedRoute,
    private checkoutService: CheckoutService,
    private cartService: CartService,
    private snack: MatSnackBar,
    private fb: FormBuilder,
  ){}

  onSubmit() {
    
  }

  onCheckOut() {
  
      if (this.cartId !== undefined) {
        this.purchaseStarted = true;
        this.checkoutService
          .startProductCheckoutSession(this.cartId)
          .subscribe((checkoutSession) => {
            this.checkoutService.redirectToCheckout(checkoutSession);
          });
        this.purchaseStarted = false;
      } else {
        alert('Try again in one moment or refresh the screen');
        this.purchaseStarted = false;
      }

  }



}
