import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  imageUrl: string = 'YOUR_IMAGE_URL_HERE'; // Replace 'YOUR_IMAGE_URL_HERE' with the actual image URL
  username: string = '';
  password: string = '';
  msg: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit(): void {
    if (!this.username || !this.password) {
      this.msg = "Please enter both username and password.";
      return;
    }

    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        if (response.success) {
          localStorage.setItem("username", this.username);
          if (response.isAdmin) {
            // Navigate to admin page if the user is an admin
            this.router.navigate(['/admin']);
          } else {
            // Navigate to user page if the user is not an admin
            this.router.navigate(['/product']);
          }
        } else {
          this.msg = response.message || "Login failed.";
        }
      },
      (error) => {
        console.error("An error occurred:", error);
        this.msg = "An error occurred while logging in.";
      }
    );
  }
}
