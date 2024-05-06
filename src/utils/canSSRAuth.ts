import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { AuthTokenError } from "../services/errors/authTokenError";

export function canSSRAuth<P extends { [key: string]: any }>(
  fn: GetServerSideProps<P>
) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const authToken = localStorage.getItem('Authorization');
    const authTokenRA = localStorage.getItem('AuthorizationRA');

    if (!authToken || !authTokenRA) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    try {
      const result = await fn(ctx);
      return result;
    } catch (err) {
      if (err instanceof AuthTokenError) {
        localStorage.removeItem("Authorization");
        localStorage.removeItem("AuthorizationRA");
      }

      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  };
}
