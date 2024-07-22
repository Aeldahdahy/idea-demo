import React from 'react';

function SignIn() {
  return (
    <form action='/signIn'>
        <label htmlFor='SignInEmail'>E-mail</label>
        <input type='email' name='SignInEmail' id='SignInEmail' placeholder='E-mail' />
        <label htmlFor='SignInPassword'>Password</label>
        <input type='password' name='SignInPassword' id='SignInPassword' placeholder='Password' />
        <inpu type='submit' value='Submit' />
    </form>
  );
}

export default SignIn;
