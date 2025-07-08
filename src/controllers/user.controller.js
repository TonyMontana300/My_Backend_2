import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registorUser = asyncHandler( async (req, res) => {
    
    // get user detaila from frontend
    const {fullName, email, username ,password} = req.body;
    console.log("email", email);
    
    // validation checks empty or not
    if (
        [fullName, email, username, password].some( (field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All field is required");
    }
    
    // check if user already exists: username or email
    const existedUser = User.findOne({
        $or: [
            { username }, { email }
        ], 
    })
    if (existedUser) {
        throw new ApiError(409, "Username or email already exists");
    }
    
    // check for images and avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const covorImageLocalPath = req.files?.images[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file are required");
    }
    
    // upload images to cloudinary, avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(covorImageLocalPath);
    if (!avatar) {
        throw new ApiError(500, "Avatar upload failed");
    }
    
    // create user object - create entry in db
    const user = await User.create({
        fullName,
        email: email.toLowerCase(),
        username: username.toLowerCase(),
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    })
    
    // remove password and resoponse token field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    // check for user creation
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while regisetering user");
    }

    // return response
    return res.status(201).json(
        new ApiResponse.status(200, createdUser, "User registered successfully")
    );
})

export { registorUser }