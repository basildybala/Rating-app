const User=require('../models/User')
const EmailVerificationToken=require('../models/EmailVerificationToken')
const { generateOTP, generateMailTransporter } = require('../utils/mail')
const nodemailer=require('nodemailer');
const { isValidObjectId } = require('mongoose');
const { sendError } = require('../utils/helper');



exports.createUser= async (req,res)=>{
    try {
        const {name,email,password}=req.body
        const oldUser=await User.findOne({email})
        if(oldUser) return res.status(401).json({error:"This Email is already use !!"})
        const newUser=new User({name,email,password})
        await newUser.save()

        // generate 6 digit otp
        let OTP = generateOTP();
          // store otp inside our db
        const newEmailVerificationToken = new EmailVerificationToken({
            owner: newUser._id,
            token: OTP,
        });
        await newEmailVerificationToken.save()
        var transport =generateMailTransporter();

        transport.sendMail({
            from: "verification@reviewapp.com",
            to: newUser.email,
            subject: "Email Verification",
            html: `
              <p>Your verification OTP</p>
              <h1>${OTP}</h1>
        
            `,
        });

        res.status(201).json({message:"Please verify your email. OTP has been sent to your email accont!",});   
    } catch (error) {
        res.send(error)
    }
}

exports.verifyEmail = async (req, res) => {
    const { userId, OTP } = req.body;
  
    if (!isValidObjectId(userId)) return res.json({ error: "Invalid user!" });
  
    const user = await User.findById(userId);
    if (!user) return sendError(res, "user not found!", 404);
  
    if (user.isVerified) return sendError(res, "user is already verified!");
  
    const token = await EmailVerificationToken.findOne({ owner: userId });
    if (!token) return sendError(res, "token not found!");
  
    const isMatched = await token.compaireToken(OTP);
    if (!isMatched) return sendError(res, "Please submit a valid OTP!");
  
    user.isVerified = true;
    await user.save();
  
    await EmailVerificationToken.findByIdAndDelete(token._id);
  
    var transport = generateMailTransporter();
  
    transport.sendMail({
      from: "verification@reviewapp.com",
      to: user.email,
      subject: "Welcome Email",
      html: "<h1>Welcome to our app and thanks for choosing us.</h1>",
    });
    res.json({ message: "Your email is verified." });
  };