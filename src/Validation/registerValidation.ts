export const validateRequired = (value: string, fieldName: string): boolean => {
    if (!value.trim()) {
      alert(`${fieldName} is required`);
      return false;
    }
    return true;
  };
  
  export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email format");
      return false;
    }
    return true;
  };
  
  export const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      alert("Phone must be 10 digits");
      return false;
    }
    return true;
  };
  