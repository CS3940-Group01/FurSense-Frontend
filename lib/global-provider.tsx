// filepath: c:\UNI\FurSense\FurSense-Frontend\lib\global-provider.tsx
import { createContext, useState, ReactNode } from "react";


interface GlobalContextType {
    isLoggedIn: boolean;
    username: string | null;
    token: string | null;
    login: (username: string, token: string) => void;
    logout: () => void;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
        const [isLoggedIn, setIsLoggedIn] = useState(false);
        const [username, setUsername] = useState<string | null>(null);
        const [token, setToken] = useState<string | null>(null);
    
        const login = (username: string, token:string) => {
            // console.log("Logging in user:", user);
            setUsername(username);
            setToken(token);
            setIsLoggedIn(true);
        };
    
        const logout = () => {
            console.log("Logging out user");
            setUsername(null);
            setToken(null);
            setIsLoggedIn(false);
        };
    
        // console.log("GlobalProvider initialized. isLoggedIn:", isLoggedIn);
    
        return (
            <GlobalContext.Provider value={{ isLoggedIn, username,token, login, logout }}>
                {children}
            </GlobalContext.Provider>
        );
    };
