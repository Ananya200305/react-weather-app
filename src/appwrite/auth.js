import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
            // .setCookieFallback(true);
        this.account = new Account(this.client);
    }

    async createAccount ({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                return this.loginAccount({email,password})
            }else{
                return userAccount;
            }
        } catch (error) {
            throw error
        }
    }
 
    async loginAccount ({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error",error)
        }

        return null;
    }

    async logoutAccount(){
        try {
            return await this.account.deleteSessions('current');
        } catch (error) {
            console.log("Appwrite service :: logout :: error",error)
        }
    }
}

const authservice = new AuthService()

export default authservice