import "./signin.css";
import { SignIn as SignInClerk } from "@clerk/clerk-react";

const SignIn = () => {
  return (
    <div className="signIn">
      <SignInClerk
        path="/sign-in"
        signUpUrl="/sign-up"
        forceRedirectUrl="/dashboard"
      ></SignInClerk>
    </div>
  );
};

export default SignIn;
