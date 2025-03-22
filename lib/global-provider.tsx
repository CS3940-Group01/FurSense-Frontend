// filepath: c:\UNI\FurSense\FurSense-Frontend\lib\global-provider.tsx
import { createContext, useState, ReactNode } from "react";

interface User {
    username: string;
    password: string;
}

interface GlobalContextType {
    isLoggedIn: boolean;
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
        const [isLoggedIn, setIsLoggedIn] = useState(false);
        const [user, setUser] = useState<User | null>(null);
    
        const login = (user: User) => {
            // console.log("Logging in user:", user);
            setUser(user);
            setIsLoggedIn(true);
        };
    
        const logout = () => {
            console.log("Logging out user");
            setUser(null);
            setIsLoggedIn(false);
        };
    
        // console.log("GlobalProvider initialized. isLoggedIn:", isLoggedIn);
    
        return (
            <GlobalContext.Provider value={{ isLoggedIn, user, login, logout }}>
                {children}
            </GlobalContext.Provider>
        );
    };
