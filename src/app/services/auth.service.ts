import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../model/user.model';

export interface AuthResponseData {
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  email?: string;
  localId?: string;
  registered?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Previous With Normal Subject
  // user = new Subject<User>();

  // Latest with behavious Subject
  user = new BehaviorSubject<User | null>(null);

  // Timer to auto logout user on Token Expiration
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signUp(signUpData: { email: string; password: string }) {
    return this.http
      .post<AuthResponseData>(
        environment.authRegisterApi + environment.apiKey,
        {
          ...signUpData,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            <string>resData.email,
            <string>resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  loginUser(credentials: { email: string; password: string }) {
    return this.http
      .post<AuthResponseData>(environment.authLoginApi + environment.apiKey, {
        ...credentials,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            <string>resData.email,
            <string>resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  // Auto Login Functionality
  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(<string>localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    // Using the getter function defined in the user model to check the validity of the token
    if (loadedUser.token) {
      this.user.next(loadedUser);

      // TO start Auto Logout Timer for Loaded User (We have to manually create remaining time)
      const remainingExpirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(remainingExpirationDuration)
    }
  }

  logoutUser() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    // Remove Auth State on LogOut
    localStorage.removeItem('userData');

    // Clear the timer on Manual Logout
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
    }

    this.tokenExpirationTimer = null;
  }

  // To Automatically Logout the user on Token Expiration
  autoLogout(expirationDuration : number) {
    // console.log(new Date(new Date().getTime() + expirationDuration))
    console.log(expirationDuration)
    this.tokenExpirationTimer = setTimeout(() => {
      this.logoutUser();
    } , expirationDuration)
  }

  private handleAuthentication(
    email: string,
    id: string,
    token: string,
    expiresIn: number
  ) {
    const tokenExpiration = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, id, token, tokenExpiration);
    this.user.next(user);

    // To start AutoLogout Timer for New Login
    this.autoLogout(expiresIn * 1000)
    // To PRevent Auth State on Refreshes    
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An Unexpected Error Occured';

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(() => new Error(errorMessage));
    }

    switch (errorResponse.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email Not Registered!';
        break;

      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid credentials !';
        break;

      case 'USER_DISABLED':
        errorMessage =
          'The user account has been disabled by an administrator.';
        break;

      case 'EMAIL_EXISTS':
        errorMessage = 'This Email Already Exists!';
        break;

      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project.';
        break;

      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'Too Many Attempts! Try Again Later';
        break;
    }

    return throwError(() => new Error(errorMessage));
  }
}

// For Reference

// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { environment } from 'src/environments/environment';

// export interface AuthResponseData {
//   idToken: string;
//   refreshToken: string;
//   expiresIn: string;
//   email?: string;
//   localId?: string;
//   registered?: string;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   constructor(private http: HttpClient) {}

//   signUp(signUpData: { email: string; password: string }) {
//     return this.http
//       .post<AuthResponseData>(
//         environment.authRegisterApi + environment.apiKey,
//         {
//           ...signUpData,
//           returnSecureToken: true,
//         }
//       )
//       .pipe(
//         catchError((errorRes) => {
//           let errorMessage = 'An Unexpected Error Occured';

//           if (!errorRes.error || !errorRes.error.error) {
//             return throwError(() => new Error(errorMessage));
//           }

//           switch (errorRes.error.error.message) {
//             case 'EMAIL_EXISTS':
//               errorMessage = 'This Email Already Exists!';
//               break;

//             case 'OPERATION_NOT_ALLOWED':
//               errorMessage = 'Password sign-in is disabled for this project.';
//               break;

//             case 'TOO_MANY_ATTEMPTS_TRY_LATER':
//               errorMessage = 'Too Many Attempts! Try Again Later';
//               break;
//           }

//           return throwError(() => new Error(errorMessage));
//         })
//       );
//   }

//   loginUser(credentials: { email: string; password: string }) {
//     return this.http
//       .post<AuthResponseData>(environment.authLoginApi + environment.apiKey, {
//         ...credentials,
//         returnSecureToken: true,
//       })
//       .pipe(
//         catchError((errorRes) => {
//           let errorMessage = 'An Unexpected Error Occured';

//           if (!errorRes.error || !errorRes.error.error) {
//             return throwError(() => new Error(errorMessage));
//           }

//           switch (errorRes.error.error.message) {
//             case 'EMAIL_NOT_FOUND':
//               errorMessage = 'Email Not Registered!';
//               break;

//             case 'INVALID_PASSWORD':
//               errorMessage = 'Invalid credentials !';
//               break;

//             case 'USER_DISABLED':
//               errorMessage =
//                 'The user account has been disabled by an administrator.';
//               break;
//           }

//           return throwError(() => new Error(errorMessage));
//         })
//       );
//   }

//   private handleError(errorResponse: HttpErrorResponse) {
//     let errorMessage = 'An Unexpected Error Occured';

//     if (!errorResponse.error || !errorResponse.error.error) {
//       return throwError(() => new Error(errorMessage));
//     }

//     switch (errorResponse.error.error.message) {
//       case 'EMAIL_NOT_FOUND':
//         errorMessage = 'Email Not Registered!';
//         break;

//       case 'INVALID_PASSWORD':
//         errorMessage = 'Invalid credentials !';
//         break;

//       case 'USER_DISABLED':
//         errorMessage =
//           'The user account has been disabled by an administrator.';
//         break;

//       case 'EMAIL_EXISTS':
//         errorMessage = 'This Email Already Exists!';
//         break;

//       case 'OPERATION_NOT_ALLOWED':
//         errorMessage = 'Password sign-in is disabled for this project.';
//         break;

//       case 'TOO_MANY_ATTEMPTS_TRY_LATER':
//         errorMessage = 'Too Many Attempts! Try Again Later';
//         break;
//     }

//     return throwError(() => new Error(errorMessage));
//   }
// }
