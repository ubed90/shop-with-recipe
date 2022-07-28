import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  collapsed = true;

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {}

  onSaveData() {
    this.backendService.storeRecipes();
  }

  onfetchData() {
    this.backendService.fetchRecipes().subscribe(data => {
      console.log(data)
    })
  }
}
