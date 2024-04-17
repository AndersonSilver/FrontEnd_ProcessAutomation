import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies, destroyCookie } from "nookies";
import { AuthTokenError } from "../services/errors/authTokenError";

export function canSSRAuth<P extends { [key: string]: any }>(
  fn: GetServerSideProps<P>
) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const authToken = cookies["@nextAuth.Authorization"];
    const authTokenRA = cookies["@nextAuth.AuthorizationRA"];

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
        destroyCookie(ctx, "@nextAuth.Authorization");
        destroyCookie(ctx, "@nextAuth.AuthorizationRA");
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
