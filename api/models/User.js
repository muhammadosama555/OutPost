
const crypto= require('crypto')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['admin', 'visitor'],
    default: 'visitor'
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    picture: {
      type: String
    },
    bio: {
      type: String
    },
    contact: {
      type: String
    }
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  notifications: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Notification'
    }
  ],
  
}, { timestamps: true });

 //Encrypt password using bcrypt
 userSchema.pre('save', async function(next){
  if(!this.isModified('password')){
      next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password= await bcrypt.hash(this.password,salt)
})

 //Sign JWT and return

 userSchema.methods.getSignedJwtToken = function (){
  return jwt.sign({id:this._id},process.env.JWT_SECRET,
      {expiresIn:process.env.JWT_EXPIRE})
}


//Match user entered password to hashed paswsord in database
userSchema.methods.matchPassword=async function(enteredPassword){


  return await bcrypt.compare(enteredPassword,this.password)
}

//Generate and hash password token
userSchema.methods.getResetPasswordToken=function(){
  //Generate token 
  const resetToken = crypto.randomBytes(20).toString('hex')

  //Hash token and set to resetPasswordToken field
  this.resetPasswordToken= crypto
  .createHash('sha256')
  .update(resetToken)
  .digest('hex')


  //Set expire
  this.resetPasswordExpire=Date.now()+10*60*1000

  return resetToken
}
  // Update the getResetPasswordToken method
  userSchema.methods.getResetPasswordToken = function() {
    // Generate the 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
    // Set the OTP and its expiration time
    this.resetPasswordToken = otp;
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
  
    // Return the generated OTP
    return otp;
  };

const User = mongoose.model('User', userSchema);

module.exports = User;