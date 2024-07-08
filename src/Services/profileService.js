// src/services/profileService.js

import authUtility from '../Services/authUtility';
import { fetchCurrentProfile } from '../Services/apiServiceAdmin';

export const initializeProfile = async () => {
  try {
    const profile = await fetchCurrentProfile();
    authUtility.setProfile(profile);
  } catch (error) {
    console.error('Error fetching profile data:', error);
  }
};