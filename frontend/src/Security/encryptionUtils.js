import CryptoJS from 'crypto-js';

// Use environment variable with REACT_APP_ prefix
const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY;

if (!ENCRYPTION_KEY) {
  throw new Error('ENCRYPTION_KEY is not set in the environment variables. Please set REACT_APP_ENCRYPTION_KEY in your .env file.');
}

export const encryptId = (id) => {
  if (!id) {
    throw new Error('ID is required for encryption');
  }
  try {
    const encrypted = CryptoJS.AES.encrypt(id.toString(), ENCRYPTION_KEY).toString();
    return encodeURIComponent(encrypted);
  } catch (error) {
    console.error('Encryption failed:', error);
    throw new Error('Failed to encrypt ID');
  }
};

export const decryptId = (encryptedId) => {
  if (!encryptedId) {
    throw new Error('Encrypted ID is required for decryption');
  }
  try {
    const decoded = decodeURIComponent(encryptedId);
    const bytes = CryptoJS.AES.decrypt(decoded, ENCRYPTION_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    if (!decrypted) {
      throw new Error('Decryption resulted in an empty string');
    }
    return decrypted;
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
};