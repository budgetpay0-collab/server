import {User} from "../models/userModel.js"
export async function fetchUserDetailsByID(req  , res  ) {
    const {id} = req.params;
    if(!id){
     return res.status(500).json("ID is required")
    }
    try{
        const user = await User.findOneById(id)
        if(user){
            return res.status(404).json("No user Found")
        }
        return res.status(200).json(user)
    }
    catch(err){
        return res.status(500).json("Internal Server error")
    }
}

export async function updateUserDetailsByID(req  , res  ) {
    
}

export async function deleteUserDetaisByID(req  , res  ){

}

export async function loginUser(req,res){
    const { email , password} =req.body
 
    if(!email || !password){
        return res.status(201).json("Email or Password not found")
    }
    try{
        const user = await User.findOne({email : email , password : password})
        if(user){
            return res.status(200).json(user)
        }
        return res.status(201).json("User not found")
    }
    catch(err){
        console.log(err)
        return res.status(201).json({msg : "Internal server error"})
    }
}

export async function signUpUser(req, res) {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(201).json("Email or Password not found");
  }

  try {
   const user =  await User.create({
      email,
      password,
      lastLoginAt: new Date(),
    });
    
    return res.status(200).json(user);
  } catch (err) {
    // 👇 Duplicate key error (unique email)
    if (err.code === 11000) {
      console.error("Duplicate email error:", err);
      return res.status(201).json("Email already exists");
    }

    console.error(err);
    return res.status(500).json("Internal server error");
  }
}

export const updateUser = async (req, res) => {
  const { userId, data } = req.body;
  console.log(req.body)
  if (!userId || !data || typeof data !== "object") {
    return res.status(400).json({ message: "Invalid request body" });
  }

  /* ================= ALLOWED FIELDS ================= */
  const allowedFields = [
    "name",
    "phone",
    "avatar",
    "income",
    "monthlySpend",
    "isActive",
    "lastLoginAt",
  ];

  // Filter only allowed fields
  const updateData = {};
  for (const key of Object.keys(data)) {
    if (allowedFields.includes(key)) {
      updateData[key] = data[key];
    }
  }

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ message: "No valid fields to update" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};