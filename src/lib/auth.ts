import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth';

export const registerUser = async (
  email: string,
  password: string,
  displayName: string
): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update user profile with display name
    await updateProfile(user, { displayName });
    
    return user;
  } catch (error: any) {
    console.error('Error registering user:', error.message);
    throw new Error(error.message || 'An error occurred while registering the user.');
  }
};

export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.error('Error logging in:', error.message);
    throw new Error(error.message || 'An error occurred while logging in.');
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error('Error logging out:', error.message);
    throw new Error(error.message || 'An error occurred while logging out.');
  }
};

// To check user status
export const checkUserStatus = (): User | null => {
  return auth.currentUser;
};
