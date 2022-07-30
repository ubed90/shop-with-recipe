import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit , OnDestroy {
  collapsed = true;

  isAuthenticated: boolean = false;
  private userSub!: Subscription;

  constructor(private backendService: BackendService , private authService: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    })
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onSaveData() {
    this.backendService.storeRecipes();
  }

  onfetchData() {
    this.backendService.fetchRecipes().subscribe(data => {
      console.log(data)
    })
  }

  onLogOut() {
    this.authService.logoutUser();
  }
}
