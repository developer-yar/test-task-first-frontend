import { FC } from "react";
import router, { useRouter } from "next/router";
import { useAuth } from "./hooks/useAuth";

export const PrivateRouteHOC =
  (Component: FC<JSX.Element>) =>
  (props: any): any => {
    const { isAuth, isAuthInProgress } = useAuth();
    const { pathname }: { pathname: string } = useRouter();

    const isSignInOrSignUpPage = pathname.startsWith("/sign");

    if (isAuthInProgress)
      return (
        <div className="fixed inset-0 w-screen h-screen flex justify-center items-center">
          <p>Проверка авторизации...</p>
        </div>
      );
    else {
      if (!isAuth) {
        if (isSignInOrSignUpPage) return <Component {...props} />;
        else router.replace("/sign-in");
      } else {
        if (isSignInOrSignUpPage) router.replace("/");
        else return <Component {...props} />;
      }
    }
  };
