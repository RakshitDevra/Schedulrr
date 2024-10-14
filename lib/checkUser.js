import { clerkClient, currentUser } from "@clerk/nextjs/server"
import { db } from "./prisma";
export const checkUser=async()=>{
              const user=await currentUser();

              if(!user){
                return null;
              }

              try {
                const loggedInUser=await db?.user.findUnique({
                    where:{
                        clerkUserId:user.id, //Id se id 10/8/24 11:55pm
                    },
                });
                    if(loggedInUser){
                      console.log("user was logged in ")
                        return loggedInUser;
                    }

                    const name=`${user.firstName} ${user.lastName}`;

                           await clerkClient().users.updateUser(user.id,{
                           username:name.split(" ").join("-")+user.id.slice(-4), //Id->id on 10/9/24
                           });
                           
                           const newUser=await db.user.create({
                             data:{
                             clerkUserId:user.id,
                             name,
                             imageUrl:user.imageUrl,
                             email:user.emailAddresses[0].emailAddress,
                             username:name.split(" ").join("-")+user.id.slice(-4),

                             },
                           })
                           console.log(name," user created in neon db")
                           return newUser;

              } catch (error) {
                  console.log(error);
              }
}