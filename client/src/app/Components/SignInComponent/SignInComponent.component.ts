import { Component } from '@angular/core';
import { LoginService } from "../../LoginService";
import { Router } from "@angular/router";
import { SignUpService } from "../../Services/SignUpService";

@Component({
  selector: 'app-SignInComponent',
  templateUrl: './SignInComponent.component.html',
  styleUrls: ['./SignInComponent.component.css']
})
export class SignInComponentComponent {
  email: string = '';
  password: string = '';
  picture64: string = '';
  isSignUpPerfectly: boolean = false;
  isErrorOnSignUp: boolean = false;

  constructor(
      private loginService: LoginService,
      private signUpService: SignUpService,
      private router: Router
  ) {}

  // Function to handle file selection
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.processImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  // Function to process the image
  processImage(imageData: string) {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const size = Math.min(img.width, img.height);
      canvas.width = size;
      canvas.height = size;

      ctx?.drawImage(
          img,
          (img.width - size) / 2,
          (img.height - size) / 2,
          size,
          size,
          0,
          0,
          size,
          size
      );

      const roundedImage = canvas.toDataURL('image/png');
      this.picture64 = roundedImage;
      // Here you can assign this.picture64 to your variable or send it to your service
    };
    img.src = imageData;
  }
  clickOnSignUpButton() {
    // Access form inputs using ngModel
    if (this.email && this.password) {
      this.signUpService.signUp(this.email, this.password, "goats", this.picture64).subscribe(
        (response: any) => {
          if (response && response.message) {
            console.log("Connexion réussie: " + response.message);
            this.isSignUpPerfectly = true;
            this.isErrorOnSignUp = false;
          }
        },
        (error) => {
          console.error("Erreur lors de la connexion : ", error);
          if (error.status === 500) {
            this.isErrorOnSignUp = true;
            this.isSignUpPerfectly = false;
          }
        }
      );
    }
  }
}
