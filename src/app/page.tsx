'use client'

import { useState } from 'react';
import Inventory from './inventory'
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage, type AuthProvider } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import { signIn_db } from '../server/action'
import Swal from 'sweetalert2'


export default function CredentialsSignInPage() {
  const theme = useTheme();
  const [isSignIn,setSignIn] = useState(false)

  const goSignIn = (bool:boolean) => {
    setSignIn(bool);
  }

  const providers = [{ id: 'credentials', name: 'Email and Password' }];

  const signIn: (provider: AuthProvider, formData: FormData) => void = async (provider,formData) => {
    const promise = new Promise<void>(async (resolve, reject) => {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      
      try {
        const isTrue = await signIn_db(email, password);
        if (isTrue) {
          setSignIn(true);
          Swal.fire({
            icon: 'success',
            title: 'Signed in successfully',
            showConfirmButton: false,
            timer: 1800
            });
        resolve();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Invalid email or password!',
            });
            reject(new Error('Invalid credentials')); 
        }
      } catch (error) {
        reject(error); 
      }
    });
    return promise;
  };

  return ( 
    <>
      {isSignIn === true ? 
        <Inventory signIn={goSignIn}/> :
        <AppProvider theme={theme}>
          <SignInPage signIn={signIn} providers={providers} />
        </AppProvider> 
      }
    </>
  );
}
