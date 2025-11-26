/**
 * Format Indian phone number as user types
 * Converts: 9876543210 -> +91 98765 43210
 */
export const formatPhoneNumber = (value) => {
  if (!value) return value;
  
  // Remove all non-numeric characters
  const phoneNumber = value.replace(/[^\d]/g, '');
  
  // Get length of phone number
  const phoneNumberLength = phoneNumber.length;
  
  // Format based on length (Indian format: +91 XXXXX XXXXX)
  if (phoneNumberLength < 6) return phoneNumber;
  
  if (phoneNumberLength < 11) {
    return `${phoneNumber.slice(0, 5)} ${phoneNumber.slice(5)}`;
  }
  
  return `${phoneNumber.slice(0, 5)} ${phoneNumber.slice(5, 10)}`;
};

/**
 * Validate Indian phone number format
 * Indian mobile numbers are 10 digits starting with 6, 7, 8, or 9
 */
export const isValidPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return false;
  const cleaned = phoneNumber.replace(/[^\d]/g, '');
  // Check if it's 10 digits and starts with 6, 7, 8, or 9
  return cleaned.length === 10 && /^[6-9]/.test(cleaned);
};

/**
 * Validate email format
 * Ensures proper email structure with valid domain extension (at least 2 characters)
 * Also checks for common domain typos
 */
export const isValidEmail = (email) => {
  // More strict regex: requires valid characters and domain extension of at least 2 chars
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!emailRegex.test(email)) {
    return false;
  }
  
  // Check for common typos in popular email domains
  const commonTypos = [
    'gmai.com', 'gmial.com', 'gamil.com', 'gmil.com', 'gma.com', // gmail typos
    'yahooo.com', 'yaho.com', 'yhoo.com', // yahoo typos
    'outlok.com', 'outloo.com', 'hotmial.com', // outlook/hotmail typos
    'iclou.com', 'icloud.co' // icloud typos
  ];
  
  const domain = email.split('@')[1]?.toLowerCase();
  
  // Reject if it matches a common typo
  if (commonTypos.includes(domain)) {
    return false;
  }
  
  return true;
};

/**
 * Validate password strength
 */
export const validatePassword = (password) => {
  const errors = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Calculate password strength (0-100)
 */
export const getPasswordStrength = (password) => {
  let strength = 0;
  
  if (!password) return 0;
  
  // Length
  if (password.length >= 8) strength += 25;
  if (password.length >= 12) strength += 15;
  
  // Contains lowercase
  if (/[a-z]/.test(password)) strength += 15;
  
  // Contains uppercase
  if (/[A-Z]/.test(password)) strength += 15;
  
  // Contains numbers
  if (/[0-9]/.test(password)) strength += 15;
  
  // Contains special characters
  if (/[^A-Za-z0-9]/.test(password)) strength += 15;
  
  return Math.min(strength, 100);
};
