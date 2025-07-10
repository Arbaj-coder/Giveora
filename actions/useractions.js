"use server"

import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDb from "@/db/connectDb"
import User from "@/models/User"


export const getCompletedUsers = async () => {
  await connectDb();

  const users = await User.find({
    name: { $ne: null },
    profilepic: { $ne: null },
    coverpic: { $ne: null },
    razorpayid: { $ne: null },
    razorpaysecret: { $ne: null }
  }).lean();

  return JSON.parse(JSON.stringify(users));
};


export const initiate = async (amount, to_username, paymentform) => {
    await connectDb()
    // fetch the secret of the user who is getting the payment 
    let user = await User.findOne({username: to_username})
    const secret = user.razorpaysecret

    var instance = new Razorpay({ key_id: user.razorpayid, key_secret: secret })



    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }

    let x = await instance.orders.create(options)

    // create a payment object which shows a pending payment in the database
    await Payment.create({ oid: x.id, amount: amount/100, to_user: to_username, name: paymentform.name, message: paymentform.message })

    return x

}


// ✅ useractions.js

export const fetchuser = async (username) => {
  await connectDb();
  const user = await User.findOne({ username }).lean(); // make plain object
  if (!user) return null;

  // ✅ full serialization: converts ObjectId and Dates to strings
  return JSON.parse(JSON.stringify(user));
};

export const fetchpayments = async (username) => {
  await connectDb();
  const payments = await Payment.find({ to_user: username, done: true })
    .sort({ amount: -1 })
    .limit(10)
    .lean();

  return JSON.parse(JSON.stringify(payments));
};



export const updateProfile = async (data, oldusername) => {
    await connectDb()
    let ndata = Object.fromEntries(data)

    // If the username is being updated, check if username is available
    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "Username already exists" }
        }   
        await User.updateOne({email: ndata.email}, ndata)
        // Now update all the usernames in the Payments table 
        await Payment.updateMany({to_user: oldusername}, {to_user: ndata.username})
        
    }
    else{

        
        await User.updateOne({email: ndata.email}, ndata)
    }


}

