import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { APiRespons } from "../utils/ApiRespons.js";
import { AsyncHandler } from "../utils/Asynchandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const accessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    console.log("token", accessToken, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const registerUser = AsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if ([username, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "all field are Invalid");
  }
  const existUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existUser) {
    throw new ApiError(409, "user already exist");
  }

  let avatarUrl = "";
  let coverImageUrl = "";

  // upload avatar
  if (req?.files?.avatar?.length > 0) {
    const avatarFile = await uploadOnCloudinary(req.files.avatar[0].path);
    avatarUrl = avatarFile.url;
  }

  //upload coverIamge
  if (req?.files?.coverImage?.length > 0) {
    const coverFile = await uploadOnCloudinary(req.files.coverImage[0].path);
    coverImageUrl = coverFile.url;
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
    avatar: avatarUrl,
    coverImage: coverImageUrl,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(401, "Something went wrong while registering the user");
  }

  return res
    .status(200)
    .json(new APiRespons(200, createdUser, "user registered successfully"));
});

const loggedInUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "email, password Invalid");
  }

  const isUser = await User.findOne({
    $or: [{ email }],
  });

  if (!isUser) {
    throw new ApiError(400, "user not found");
  }

  const isPasswordValid = await isUser.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await accessAndRefreshToken(isUser._id);

  const loginUser = await User.findById(isUser._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new APiRespons(
        200,
        { user: loginUser, accessToken, refreshToken },
        "user login successfully"
      )
    );
});

const loggedOutUser = AsyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "User not authenticated" });
  }
  await User.findByIdAndUpdate(
    req._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: false, // ❌ false for localhost
    sameSite: "lax",
    path: "/",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new APiRespons(200, {}, "user logout successfully"));
});

const getCurrentUser = AsyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new APiRespons(200, req.user, "user got successfully"));
});

// const refreshAccessToken = AsyncHandler(async (req, res) => {
//   const incomingRefreshToken =
//     req.cookies.refreshToken || req.body.refreshToken;

//   if (!incomingRefreshToken) {
//     throw new ApiError(401, "unauthorized request");
//   }

//   try {
//     const decodedToken = jwt.verify(
//       incomingRefreshToken,
//       process.env.REFRESH_TOKEN_SECRET
//     );

//     const user = await User.findById(decodedToken?._id);

//     if (!user) {
//       throw new ApiError(401, "Invalid refresh token");
//     }

//     if (incomingRefreshToken !== user?.refreshToken) {
//       throw new ApiError(401, "Refresh token is expired or used");
//     }

//     const options = {
//       httpOnly: true,
//       secure: true,
//     };

//     const { accessToken, newRefreshToken } =
//       await generateAccessAndRefereshTokens(user._id);

//     return res
//       .status(200)
//       .cookie("accessToken", accessToken, options)
//       .cookie("refreshToken", newRefreshToken, options)
//       .json(
//         new APiRespons(
//           200,
//           { accessToken, refreshToken: newRefreshToken },
//           "Access token refreshed"
//         )
//       );
//   } catch (error) {
//     throw new ApiError(401, error?.message || "Invalid refresh token");
//   }
// });

const updateAvatar = AsyncHandler(async (req, res) => {
  const localFile = req?.file?.path;

  if (!file) {
    throw new ApiError(401, "avatar does not exist");
  }

  const avatar = await uploadOnCloudinary(localFile);

  if (!avatar) {
    throw new ApiError(401, "avatar upload faild");
  }

  const uploaded = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new APiRespons(200, uploaded, "avatar uploaded successfully"));
});

const uploadCoverImage = AsyncHandler(async (req, res) => {
  const localFile = req?.file?.path;
  if (!localFile) {
    throw new ApiError(401, "coverImage does not exist");
  }

  const coverImage = await uploadOnCloudinary(localFile);

  if (!coverImage) {
    throw new ApiError(401, "coverImage uploaded faild");
  }

  const uploaded = await User.findByIdAndUpdate(
    req?.user?._id,
    {
      $set: {
        coverImage: coverImage,
        url,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new APiRespons(200, uploaded, "coverImage uploaded successfully"));
});

export {
  registerUser,
  loggedInUser,
  loggedOutUser,
  getCurrentUser,
  updateAvatar,
  uploadCoverImage,
};
