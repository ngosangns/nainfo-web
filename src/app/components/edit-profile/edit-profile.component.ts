import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular'; // For user feedback
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
  ],
})
export class EditProfileComponent implements OnInit {
  profile: any = {}; // Store fetched profile data
  loading: HTMLIonLoadingElement | null = null; // For loading indicator

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private alertController: AlertController, // Inject AlertController
    private loadingController: LoadingController // Inject LoadingController
  ) {}

  ngOnInit() {
    this.fetchProfile();
  }

  fetchProfile() {
    this.presentLoading(); // Show loading indicator

    this.profileService.getProfile().subscribe(
      (response) => {
        this.profile = response;
        this.loading?.dismiss(); // Hide loading indicator after fetching
      },
      (error) => {
        this.showErrorAlert('Error', 'Failed to load profile.');
        this.loading?.dismiss();
        console.error('Profile fetch error:', error);
      }
    );
  }

  updateProfile() {
    this.presentLoading();

    this.profileService.updateProfile(this.profile).subscribe(
      () => {
        this.loading?.dismiss();
        this.router.navigate(['/profile']); // Navigate back to profile
      },
      (error) => {
        this.showErrorAlert('Error', 'Failed to update profile.');
        this.loading?.dismiss();
        console.error('Profile update error:', error);
      }
    );
  }

  // Helper functions for loading indicator and alerts
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 5000, // Optional timeout
    });
    await this.loading.present();
  }

  async showSuccessAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async showErrorAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
