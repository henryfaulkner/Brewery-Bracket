import { createContext, Context } from "react";
import {User} from 'firebase/auth'

export const UserContext: Context<{
    user: User,
    username: any
}> = createContext({user:null, username:null});