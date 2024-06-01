import { AuthBindings, AuthProvider } from "@refinedev/core";


import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";
// Replace with your actual Firebase project configuration


initializeApp(firebaseConfig);

const auth = getAuth();

export const authProvider: AuthProvider = {
  // Login function
  login: async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true,
              redirectTo:'/'
       };
    } catch (error) {
      return { success:false,
        error: error};
    }
  },

  // Register function
  register: async ({ email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return { success: true, redirectTo: "/login" };
    } catch (error) {
      return {success:false,
        error: error}
    }
  },

  // Check function (assuming checks if user is logged in)
  check: async () => {
    const user = auth.currentUser;
    if (user){
      return {
        authenticated: true, // Return true in success property if user exists
        redirectTo: '/'
      }
    }
    else{
      return {
        authenticated: false, // Return true in success property if user exists
        redirectTo:'/login',
        logout:true
      };
    }
    
 
  },

  // Logout function
  logout: async () => {
    await signOut(auth);
    return { success: true };
  },
  forgotPassword: async ({ email }) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      return{success:false,
            error:error
      }
    }
  },
  

  // Get user information function
  getIdentity: async () => {
    try{
    const user = auth.currentUser;
    if (user) {
      return { success: true, name:  user.email  }; // Return basic user info
    }
   } catch(error){
      return { success: false, error:error };
    }
  },

  // Error handling function
  onError: (error) => {
    const errorCode = error.code;
    let errorMessage;

    switch (errorCode) {
      case "auth/email-already-in-use":
        errorMessage = "User already exists";
        break;
      case "auth/weak-password":
        errorMessage = "Password is too weak";
        break;
      case "auth/invalid-email":
        errorMessage = "Invalid email address";
        break;
      case "auth/wrong-password":
        errorMessage = "Incorrect email or password";
        break;
      default:
        errorMessage = "An error occurred. Please try again.";
    }

    return { success: false, error: { name: "Authentication Error", message: errorMessage } };
  },
};


export default authProvider