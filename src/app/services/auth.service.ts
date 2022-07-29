import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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
  constructor(private http: HttpClient) {}

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
        catchError(this.handleError)
      );
  }

  loginUser(credentials: { email: string; password: string }) {
    return this.http
      .post<AuthResponseData>(environment.authLoginApi + environment.apiKey, {
        ...credentials,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError)
      );
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
