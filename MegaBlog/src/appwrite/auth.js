import{ Client , Account , ID} from "appwrite"
import conf from "../conf/conf"

export class AuthServices {
        client = new Client()
        account;
        constructor(){
                this.client
                .setEndpoint(conf.appwriteURL)
                .setProject(conf.appwriteProjectId)
                this.account = new Account(this.client)
        }

        //sign up
        async creatAccount({email , password , name }) {
                try {
                    const userAccount = await this.account.create( ID.unique() , email , password , name) 
                    if(userAccount) {
                        return this.login({email , password})
                    } else {
                        return userAccount
                    } 

                } catch (error) {
                   throw error;                        
                }
        }

        //log in
        async login ({email,password}){
                try {
                     return await this.account.createEmailPasswordSession(email , password);         
                } catch (error) {
                     throw error;   
                }
        }

        //get user
        async getCurrentUser (){
                try {
                        return await this.account.get()                      
                } catch (error) {
                      throw error;  
                }

                return null
        }

        //log out
        async logout (){
                try {
                        await this.account.deleteSessions()   
                } catch (error) {
                        throw error;
                }
        }
}

const authServices = new AuthServices()

export default authServices