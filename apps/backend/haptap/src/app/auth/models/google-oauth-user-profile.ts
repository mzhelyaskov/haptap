export interface GoogleOAuthUserProfile {
  emails?: { value?: string }[];
  name?: { givenName?: string, familyName?: string };
  photos?: { value?: string }[];
}
