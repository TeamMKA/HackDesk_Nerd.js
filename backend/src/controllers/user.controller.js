import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js"

const generateAccessandRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(
            500,
            "Error while Generating Access and Refresh Token"
        )
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, role } = req.body
    if (
        [username, email, password].some(
            (field) => field?.trim === ""
        )
    ) {
        throw new ApiError(400, "All values are Required")
    }

    const existedUser = await User.findOne({ $or: [{ username }, { email }] })
    if (existedUser) {
        throw new ApiError(409, "User with email or username already Exists")
    }
    // const profilePicLocalPath = req.file?.path
    // if (!profilePicLocalPath) {
    //     throw new ApiError(400, "ProfilePic is Required local")
    // }
    // const profilepic = await uploadOnCloudinary(profilePicLocalPath)

    // if (!profilepic) {
    //     throw new ApiError(400, "ProfilePic is Required")
    // }

    const user = await User.create({
        // profilepic: profilepic.url,
        email,
        password,
        role,
        username: username.toLowerCase(),
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(
            500,
            "Something went wrong while registering the user "
        )
    }

    return res
        .status(201)
        .json(new ApiResponse(200, createdUser, "User Registered Successfully"))
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    
    if (!email|| !password) {
        throw new ApiError(400, "Username or Password Not Entered")
    }
    const user = await User.findOne({ email: email })
    if (!user) {
        throw new ApiError(404, "User Doesnt Exist")
    }
    const isPasswordValid = user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid User Credentials")
    }

    const { accessToken, refreshToken } = await generateAccessandRefreshToken(
        user._id
    )
    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    const options = { httponly: true, secure: true }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User logged in Successfully"
            )
        )
})

const logoutUser = asyncHandler(async (req, res) => {
    req.user._id
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined,
            },
        },
        {
            new: true,
        }
    )
    const options = { httponly: true, secure: true }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User Logged Out Successfully"))
})

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find()
        return res
            .status(200)
            .json(new ApiResponse(200, users, "List of users"))
    } catch (error) {
        throw new ApiError(500, "Server Error")
    }
})

export { registerUser, loginUser, logoutUser, getAllUsers }
