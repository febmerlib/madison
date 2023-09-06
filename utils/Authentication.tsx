import { useCallback } from "react";
import { signInWithPopup, UserCredential, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, getAuth } from 'firebase/auth';
import { useRouter } from "next/router";
import Cookies from 'js-cookie';

import { fetchApi, queries } from "./Fetching";
import { useToast } from "../hooks/useToast";
import { LoadingContextProvider } from "../context/LoadingContext";
import { AuthContextProvider } from "../context/AuthContext";
import { AppContextProvider } from "../context/AppContext";

export const useAuthentication = () => {
  const { setLoading } = LoadingContextProvider();
  const { setUser } = AuthContextProvider();
  const { setItemSchema } = AppContextProvider()
  const toast = useToast();
  const router = useRouter();

  const getSessionCookie = useCallback(async (tokenID: any): Promise<string | undefined> => {
    if (tokenID) {
      const authResult: any = await fetchApi({
        query: queries.auth,
        variables: { idToken: tokenID },
        development: "madison"
      });
      if (authResult?.sessionCookie) {
        const { sessionCookie } = authResult;
        // Setear en localStorage token JWT
        Cookies.set("sessionCookie", sessionCookie, { domain: process.env.NEXT_PUBLIC_DIRECTORY ?? "" });
        return sessionCookie
      } else {
        console.warn("No se pudo cargar la cookie de sesión por que hubo un problema")
        throw new Error("No se pudo cargar la cookie de sesión por que hubo un problema")
      }
    } else {
      console.warn("No hay tokenID para pedir la cookie de sesion")
      throw new Error("No hay tokenID para pedir la cookie de sesion")
    }

  }, [])

  const signIn = useCallback(
    async (type: keyof typeof types, payload: any) => {
      //### Login por primera vez
      //1.- Verificar tipo de login y tomar del diccionario el metodo
      //2.- Obtener el tokenID del usuario
      //3.- Enviar tokenID a API para recibir la sessionCookie
      //4.- Almacenar en una cookie el token de la sessionCookie
      //5.- Mutar el contexto User de React con los datos de Firebase + MoreInfo (API BODAS)


      const types = {
        provider: async () => {
          try {
            const asdf = await signInWithPopup(getAuth(), payload)

            return asdf
          } catch (error: any) {
            //setLoading(false);
            const er = error.toString().split(".")[0].split(": Error ")[1]
            if (er == "(auth/account-exists-with-different-credential)") {
              toast("error", "El correo asociado a su provedor ya se encuentra registrado en bodasdehoy.com");
            }
          }
        },
        credentials: async () => await signInWithEmailAndPassword(getAuth(), payload.identifier, payload.password)
      };

      // Autenticar con firebase
      try {
        const res: UserCredential | void = await types[type]();
        if (res) {

          // Solicitar datos adicionales del usuario
          const asd = await fetchApi({
            query: queries.getUser,
            variables: { args: { uid: res.user.uid } },
            development: "madison"
          })
          const moreInfo = asd.results[0]
          console.log(moreInfo)
          if (moreInfo?.status && res?.user?.email) {
            const token = (await res?.user?.getIdTokenResult())?.token;
            console.log(41001, token)
            const sessionCookie = await getSessionCookie(token)
            console.log(41002, sessionCookie)
            if (sessionCookie) { }
            // Actualizar estado con los dos datos
            setUser({ ...res.user, ...moreInfo });

            /////// REDIRECIONES ///////
            //setLoading(true)
            router.push(`${"/"}`)
            setItemSchema({ slug: "/" })
            ///////////////////////////

          } else {
            toast("error", "aun no está registrado");
            //verificar que firebase me devuelva un correo del usuario
            if (res?.user?.email) {
              //seteo usuario temporal pasar nombre y apellido de firebase a formulario de registro
              //setUserTemp({ ...res.user });
              toast("success", "Seleccione quien eres y luego completa el formulario");
            } else {
              toast("error", "usted debe tener asociado un correo a su cuenta de proveedor");
            }
          }
        }
      } catch (error: any) {
        const errorCode: string = error?.code ? error.code : error?.message
        switch (errorCode) {
          case "auth/too-many-requests":
            toast("error", "usuario o contraseña inválida");
            break;
          case "user does not exist into events bd":
            toast("error", "debes estar invitado a un evento para poder ingresar");
            break;
          case "user does not exist into events bd":
            toast("error", "debes estar invitado a un evento para poder ingresar");
            break;
          default:
            break;
        }

        console.log("error", error)
        console.log("errorCode", error?.code ? error.code : error?.message)
      }
      //setLoading(false);
    },
    [getSessionCookie, router, setLoading, setUser, toast]
  );

  const _signOut = useCallback(async () => {
    Cookies.remove("sessionCookie", { domain: process.env.NEXT_PUBLIC_DIRECTORY ?? "" });
    Cookies.remove("idToken", { domain: process.env.NEXT_PUBLIC_DIRECTORY ?? "" });
    await signOut(getAuth());
    router.push("/")
  }, [router])



  return { signIn, _signOut, getSessionCookie };

};

