export const AUTH_FIELD_NAME = {
  name: 'name' as const,
  email: 'email' as const,
  password: 'password' as const
};

export interface IFormData {
  [AUTH_FIELD_NAME.name]?: string;
  [AUTH_FIELD_NAME.email]: string;
  [AUTH_FIELD_NAME.password]: string;
}
