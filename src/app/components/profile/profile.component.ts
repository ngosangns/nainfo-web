import {IonicModule, LoadingController} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {Component} from '@angular/core';
import {ProfileService} from '../../services/profile.service';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
  ],
})
export class ProfileComponent {
  profile: any = {};
  loading: HTMLIonLoadingElement | null = null;
  errorMessage: string | null = null;

  constructor(
    private profileService: ProfileService,
    private loadingController: LoadingController
  ) {
  }

  async ionViewWillEnter() {
    await this.fetchProfile();
  }

  async fetchProfile() {
    await this.presentLoading();
    try {
      this.profile = await firstValueFrom(this.profileService.getProfile());
    } catch (error) {
      this.errorMessage = 'Error fetching profile.';
      console.error('Profile fetch error:', error);
    } finally {
      this.loading?.dismiss();
      this.loading = null;
    }
  }

  // Helper functions for loading indicator and alerts
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 5000, // Optional timeout
    });
    await this.loading.present();
  }
}
