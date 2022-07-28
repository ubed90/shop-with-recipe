import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'shop-with-recipe';
  featureToShow: string = 'recipe';

  onNavigate(feature: string): void {
    this.featureToShow = feature;
  }
}


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCKItT7OxQTlIJGxfwxbkYkBl-a-IpyCAU",
//   authDomain: "recipe-app-59b93.firebaseapp.com",
//   projectId: "recipe-app-59b93",
//   storageBucket: "recipe-app-59b93.appspot.com",
//   messagingSenderId: "952600847628",
//   appId: "1:952600847628:web:8dcbb2e40206650f9dd529"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);