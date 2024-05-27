import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
  ],
})
export class RegisterComponent {
  credentials = {
    username: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async register() {
    try {
      const response = await firstValueFrom(
        this.authService.register(this.credentials)
      );

      // Successful registration - usually 204 No Content
      // Optionally, display a success message
      const alert = await this.alertController.create({
        header: 'Success',
        message: 'Registration successful! You can now log in.',
        buttons: ['OK'],
      });
      await alert.present();

      this.router.navigate(['/login']); // Navigate to login after registration
    } catch (error) {
      this.showAlert(
        'Error',
        'Registration failed. Please check your information.'
      );
      console.error('Registration error:', error);
    }
  }

  // Helper function to display alerts
  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
