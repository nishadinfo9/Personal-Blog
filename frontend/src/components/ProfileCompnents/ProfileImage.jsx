import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa";

const ProfileImageForm = ({ user }) => {
  const { register, handleSubmit, watch, resetField } = useForm();

  // Watch file inputs
  const avatarFile = watch("avatar");
  const coverFile = watch("cover");

  const handleFormSubmit = async (data) => {
    if (!data) return;
    const avatarSelected = data.avatar?.[0] || "";
    const coverSelected = data.cover?.[0] || "";
    console.log(data);

    //reset inputs so same file can be uploaded again
    resetField("avatar");
    resetField("cover");
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="relative">
      {/* Cover */}
      <div className="w-full h-64 bg-gray-800 relative">
        <img
          src=""
          alt="Cover"
          className="w-full h-full object-cover opacity-80"
        />
        <label
          htmlFor="cover-upload"
          className="absolute bottom-2 right-2 btn btn-sm btn-circle btn-primary cursor-pointer"
        >
          <FaCamera />
        </label>
        <input
          {...register("cover")}
          type="file"
          id="cover-upload"
          className="hidden"
        />
      </div>

      {/* Avatar */}
      <div className="avatar absolute -bottom-16 left-8">
        <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 relative">
          <img src="" alt={user.username} />
          <label
            htmlFor="avatar-upload"
            className="absolute bottom-0 right-0 btn btn-xs btn-circle btn-primary cursor-pointer"
          >
            <FaCamera />
          </label>
          <input
            {...register("avatar")}
            type="file"
            id="avatar-upload"
            className="hidden"
          />
        </div>
      </div>

      {/* Submit button only if a file is selected */}
      {(avatarFile?.length > 0 || coverFile?.length > 0) && (
        <div className="absolute bottom-0 right-0 mt-48 mr-15">
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      )}
    </form>
  );
};

export default ProfileImageForm;
