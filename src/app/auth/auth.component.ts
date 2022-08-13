import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from '../services/auth.service';
import { AlertComponent } from '../shared/components/alert/alert.component';
import { PlaceholderDirective } from '../shared/directives/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnDestroy {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string | null = null;


  // Alert Dynamic Creation - Maxiiii Style
  // @ViewChild(appPlaceholder, { static: false })
  // alertHost!: PlaceholderDirective;

  // Alert Dynamic Creation - Ubed Style
  @ViewChild("alertComponent", { read: ViewContainerRef , static: false })
  alertHost!: ViewContainerRef;

  // Subscription for Alert Component
  private alertCloseEvent: Subscription | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    let authObs$: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs$ = this.authService.loginUser(form.value);
    } else {
      authObs$ = this.authService.signUp(form.value);
    }

    authObs$.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        // console.log(errorMessage);
        this.error = errorMessage;
        this.showAlertComponent(errorMessage);
        this.isLoading = false;
      }
    );

    form.reset();
  }

  handleClose() {
    this.error = null;
  }

  private showAlertComponent(message: string) {
    // Maxiii Style===================================================================

    // const alertCompFactory =
    //   this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    // const hostViewContainerRef = this.alertHost.viewContainerRef;
    // hostViewContainerRef.clear();

    // const componentRef = hostViewContainerRef.createComponent(alertCompFactory);

    // componentRef.instance.message = message;
    // this.alertCloseEvent = componentRef.instance.closeEvent.subscribe(
    //   (event) => {
    //     (this.alertCloseEvent as Subscription).unsubscribe();
    //     hostViewContainerRef.clear();
    //   }
    // );


    // Ubed Style ========================================================================
    this.alertHost.clear();
    const componentRef = this.alertHost.createComponent(AlertComponent)

    componentRef.instance.message = message;
    this.alertCloseEvent = componentRef.instance.closeEvent.subscribe(
      (event) => {
        (this.alertCloseEvent as Subscription).unsubscribe();
        this.alertHost.clear();
      }
    );
  }

  ngOnDestroy(): void {
    if (this.alertCloseEvent) {
      this.alertCloseEvent.unsubscribe();
    }
  }
}
