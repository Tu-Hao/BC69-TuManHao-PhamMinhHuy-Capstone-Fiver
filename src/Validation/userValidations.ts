// validations/userValidations.ts

interface ValidationErrors {
    [key: string]: string;
  }
  export interface User {
    name: string;
    email: string;
    phone: string;
    birthday: string;
    gender: boolean;
    role: string;
  }
  
  export const validateUserForm = (user: User): ValidationErrors => {
    const errors: ValidationErrors = {};
  
    // Regular expressions for email and phone validation
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    const phoneRegex = /^[0-9]{10,15}$/;
  
    // Name validation
    if (!user.name) {
      errors.name = "Name is required.";
    }
  
    // Email validation
    if (!user.email) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(user.email)) {
      errors.email = "Invalid email format.";
    }
  
    // Phone validation
    if (!user.phone) {
      errors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(user.phone)) {
      errors.phone = "Invalid phone number format.";
    }
  
    // Birthday validation
    if (!user.birthday) {
      errors.birthday = "Birthday is required.";
    }
  
    return errors;
  };
  