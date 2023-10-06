export type LoginType = {
  email: string;
  password: string;
};

export type RegisterType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  street: string;
  city: string;
  complement?: string;
  zipCode: string;
  country: string;
};
