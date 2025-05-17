import { useContext, useEffect, useRef } from "react";
import axios, { AxiosInstance } from "axios";
import { GlobalContext } from "@/lib/global-provider";

export function useAxiosSecure(): AxiosInstance {
  const globalContext = useContext(GlobalContext);
  const axiosInstance = useRef<AxiosInstance>();

  if (!axiosInstance.current) {
    axiosInstance.current = axios.create({
      baseURL: "http://10.0.2.2:8080",
    });
  }

  useEffect(() => {
    if (globalContext?.token) {
        console.log("token",globalContext.token);
        
      axiosInstance.current!.defaults.headers.common["Authorization"] = `Bearer ${globalContext.token}`;
    } else {
      delete axiosInstance.current!.defaults.headers.common["Authorization"];
    }
  }, [globalContext?.token]);

  return axiosInstance.current;
}
