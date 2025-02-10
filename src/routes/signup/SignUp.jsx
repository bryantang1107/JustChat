import "./signup.css";
import { SignUp as SignUpClerk } from "@clerk/clerk-react";

const SignUp = () => {
  return (
    <div className="signUp">
      <SignUpClerk path="/sign-up" afterSignOutUrl="/"></SignUpClerk>
    </div>
  );
};

export default SignUp;
