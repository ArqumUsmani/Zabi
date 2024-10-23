import { Component } from '@angular/core';
import { fallbackImageUrl, localStorageKeys } from 'src/app/common/constants/constants';
import { Utils } from 'src/app/common/Helper/utility';
import { defaultUser, User } from 'src/app/common/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user: User = Utils.applyDefaults<User>(JSON.parse(localStorage.getItem(localStorageKeys.user) ?? '') , defaultUser);

  onProfileImageError(user: User | undefined) {
    if(user)
      user.profilePictureWebUrl = fallbackImageUrl; // Change to the fallback image if the main image fails to load
  }
}
