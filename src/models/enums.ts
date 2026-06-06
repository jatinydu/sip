export enum UserTypes {
  BUSINESS = "business",
  CUSTOMER = "customer",
  BRANCH_OWNER = "branch_owner",
}

export enum OtpPurpose {
  SIGNUP = "signup",
  RESET_PASSWORD = "reset_password",
  CHANGE_EMAIL = "change_email",
  CHANGE_PHONE = "change_phone",
}

export enum OtpChannel {
  EMAIL = "email",
  PHONE = "phone",
}

export enum BusinessOnboardingStatus {
  PENDING = "pending",
  COMPLETED = "completed",
}

export enum StaffRoles {
  BRANCH_ADMIN = "branch_admin",
  STAFF = "staff",
}
