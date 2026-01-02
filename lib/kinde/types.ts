export interface KindeToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope?: string;
}

export interface KindeUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  is_suspended?: boolean;
  is_password_reset_requested?: boolean;
}

export interface CreateKindeUserPayload {
  profile: {
    given_name: string;
    family_name: string;
  };
  identities: Array<{
    type: "email";
    details: {
      email: string;
    };
  }>;
}
