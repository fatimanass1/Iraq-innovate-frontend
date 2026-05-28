export type SettingsProfile = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  organization: string;
  displayEmail: string;
  newsLetterSubscription: boolean;
  initials: string;
};

export type SettingsFormValues = {
  fullName: string;
  email: string;
  phoneNumber: string;
  newsLetterSubscription: boolean;
};
