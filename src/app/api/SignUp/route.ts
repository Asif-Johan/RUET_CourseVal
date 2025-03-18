import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const {username, email, password}= await request.json();

        //check if user already exist and verified

       const existingUserVerifiedByUsername = await UserModel.findOne(
            { username, 
              isVerified: true
            })
        
        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "Username is already taken",
            }, {
                status: 400
            });
        }

        const existingUserByEmail = await UserModel.findOne({email});

        // Set expiry date
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 1);

        //Create Verification code
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "Email is already taken",
                }, {
                    status: 400
                });
            } else {
               const hashedPassword = await bcrypt.hash(password, 10);
               existingUserByEmail.password = hashedPassword;

               existingUserByEmail.verificationCode = verifyCode;

               existingUserByEmail.verificationCodeExpiry = new Date(Date.now() + 24* 60 * 60 * 1000);
            //    existingUserByEmail.username = username;

               await existingUserByEmail.save();
            }
        }else{

            //hash password
            const hashedPassword = await bcrypt.hash(password, 10);
           
            //create new user 
            const newUser = new UserModel({
                  username,
                  password: hashedPassword,
                  email,
                  verificationCode: verifyCode,
                  verificationCodeExpiry: expiryDate,
                  isVerified: false,
                  isAcceptingMessage: true,
                  messages: [],
            })

            await newUser.save();
 
        }

        //Now, that creation is done,


         //send verification email
         const emailResponse = await sendVerificationEmail(email, username, verifyCode);

         if (!emailResponse.success) {
          return Response.json({
              success: false,
              message: `Error sending verification email: ${emailResponse.message}`,
          }, {
              status: 500
          });
         } else {

         // else return success response
          return Response.json({
              success: true,
              message: "User registered successfully. Please check your email for verification code",
          }, {
              status: 200
          });
        }




    } catch (error) {
        console.error("Error registering user: ",error); //shown in terminal
        
        
        return Response.json({
            success: false,
            message: "Error registering user",
        }, {
            status: 500
        }); // sent to frontend
    }

}

