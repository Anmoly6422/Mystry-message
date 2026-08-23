import dbconnect from "@/lib/dbconnect";
import UserModel from "@/model/User";


export async function POST(request:Request){
    await dbconnect()

    try {

     const {username,code}=  await request.json()

     const decodedUsername = decodeURIComponent(username)
     const user = await UserModel.findOne({
  username: {
    $regex: new RegExp(`^${decodedUsername}$`, "i"),
  },
});
     if(!user){
       
        return Response.json({
            success:false,
            message:"User not found" 
        },{
            status:404
        }
    )
     }
     const isCodeValid= user.verifyCode === code
     const isCodeNotExpiry=new Date(user.verifyCodeExpiry)>new Date()
     if(isCodeValid && isCodeNotExpiry){
        user.isVerified=true
        await user.save()
       
        return Response.json({
            success:true,
            message:"Account verified successfully"
        },{
            status:200
        }
    )
     }
     else if(!isCodeNotExpiry){
        
        return Response.json({
            success:false,
            message:"Verification code has expired,please signup to get a new code"
        },{
            status:400
        }
    )
     }
     else{
        return Response.json({
            success:false,
            message:"Incorrect Verification Code"
        },{
            status:400
        }
    )
     }
        
    } catch (error) {
         console.error("Error verifying user",error)
        return Response.json({
            success:false,
            message:"Error verifying user"
        },{
            status:500
        }
    )
        
    }
}