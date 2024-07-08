// src/utils/authUtility.js

class AuthUtility {
    constructor() {
      this.currentLoggedInProfile = null; //STORES THE DTO RETURNED FOR USER PROFILE
    }
  
    setProfile(profile) {
      this.currentLoggedInProfile = profile;
    }
  
    getProfile() {
      return this.currentLoggedInProfile;
    }
  
    isStudent() {
      return this.currentLoggedInProfile && this.currentLoggedInProfile.studentMis !== undefined;
    }
  
    isClient() {
      return this.currentLoggedInProfile && this.currentLoggedInProfile.clientEmail !== undefined;
    }
  }
  
  const authUtility = new AuthUtility();
  export default authUtility;
  