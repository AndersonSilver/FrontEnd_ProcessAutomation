// 'use client';
// import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
// import { AuthTokenError } from "../services/errors/authTokenError";
// import { access } from "fs";

// export function canSSRAuth<P extends { [key: string]: any }>(
//   fn: GetServerSideProps<P>
// ) {
//   return async (
//     ctx: GetServerSidePropsContext
//   ): Promise<GetServerSidePropsResult<P>> => {

//     const authToken = localStorage.getItem('Authorization');
//     console.log("TESTE");
//     if (!authToken) {
//       console.log("TESTE");
//       // return {
//       //   redirect: {
//       //     destination: "/login",
//       //     permanent: false,
//       //   },
//       // };
//     }

//     try {
//       const result = await fn(ctx);
//       return result;
//     } catch (err) {
//       if (err instanceof AuthTokenError) {
//         localStorage.removeItem("Authorization");
//       }

//       return {
//         redirect: {
//           destination: "/",
//           permanent: false,
//         },
//       };
//     }
//   };
// }
