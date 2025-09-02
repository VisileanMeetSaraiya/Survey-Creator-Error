import { createContext} from "react";

export const UserContext = createContext<{
    user: string;
    setUser: React.Dispatch<React.SetStateAction<string>>;
    role:string;
    setRole :React.Dispatch<React.SetStateAction<string>>;
} | null>(null);


