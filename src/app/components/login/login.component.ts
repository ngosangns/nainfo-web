import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    IonicModule,
  ],
})
export class LoginComponent {
  credentials = {
    username: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async login() {
    try {
      const response = await firstValueFrom(
        this.authService.login(this.credentials)
      );

      if (response && response.token) {
        // Assuming the API returns a token on successful login
        this.authService.setToken(response.token); // Store the token
        this.router.navigate(['/profile']); // Navigate to protected page
      } else {
        // Handle unexpected API response
        this.showAlert('Error', 'Invalid username or password.');
      }
    } catch (error) {
      this.showAlert('Error', 'Login failed. Please try again.');
      console.error('Login error:', error);
    }
  }

  // Helper function for alerts
  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
