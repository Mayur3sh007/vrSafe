// "use client"
import AuthForm from '@/components/AuthForm';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React, { useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = async () => {
  // const loggedInUser = await getLoggedInUser();
  // console.log(loggedInUser);

  // // Function to show the toast message
  // const showToast = () => {
  //   // toast.warn('Please enter your state as: NY to sign up. As Dwolla API used for creating your bank account only recognizes American states.',
  //   //   {
  //   //     position: "top-center",
  //   //     autoClose: 5000,
  //   //     hideProgressBar: false,
  //   //     closeOnClick: true,
  //   //     pauseOnHover: true,
  //   //   }
  //   // );
  // };

  // useEffect(() => {
  //   showToast(); // Call this function when the component mounts
  // }, []);

  return (
    <section className='flex-center size-full max-sm:px-6'>
      <AuthForm type="sign-up" />
      {/* <ToastContainer /> */}
    </section>
  );
}

export default SignUp;
