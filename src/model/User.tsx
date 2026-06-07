import mongoose ,{Schema,Document, mongo} from "mongoose";

export interface Message extends Document{
    content: string;
    createdAt:Date
}
const MessageSchema: Schema<Message>=new Schema({

    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }

})

export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifyCode:string,
    verifyCodeExpiry:Date;
    isVerified:boolean;
    isAcceptingMessage:boolean;
    messages:Message[]
}

const UserSchema: Schema<User>=new Schema({

    username:{
        type:String,
        required:[true, "Username is reqired"],
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        matvch:[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,'please use a valid email address']
    },
    password:{
        type:String,
        required:[true,"password is required"],

    },
    verifyCode:{
        type:String,
        required:[true,"Verify code is expired"],
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"verufy coode Expiry is required"],
    },
    isVerified:{
        type:Boolean,
     default:false,
    },
    isAcceptingMessage:{
        type:Boolean,
     default:true,
    },
    messages:[MessageSchema]


})
const UserModel =(mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema)

export default  UserModel