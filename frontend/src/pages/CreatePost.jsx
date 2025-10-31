import React, { useEffect, useState } from "react";
import Input from "../utils/Input";
import Button from "../utils/Button";
import { useForm } from "react-hook-form";
import Textarea from "../utils/Textarea";

const CreatePost = () => {
  const [preview, setPreview] = useState(null);
  console.log(preview);
  const { register, handleSubmit, reset, watch } = useForm();

  const fileField = watch("file")?.[0];

  useEffect(() => {
    if (!fileField) return;
    const url = URL.createObjectURL(fileField);
    setPreview(url);

    return () => URL.revokeObjectURL(fileField);
  }, [fileField]);

  const submited = async (data) => {
    if (!data) return;
    console.log(data);
    // data.content
    // data.title
    // data.file[0]
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-start py-10">
      <div className="w-full max-w-3xl p-6 bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">Create New Post</h2>
        <form
          onSubmit={handleSubmit(submited)}
          className="flex flex-col space-y-4"
        >
          {/* Title */}
          <Input
            size="w-full"
            type="text"
            placeholder="Post Title"
            {...register("title", { required: true })}
          />

          {/* Content */}
          <Textarea
            placeholder="Write your post..."
            {...register("content", { required: true })}
          />
          {/* Image Upload */}
          <div className="flex items-center space-x-4">
            <label className="btn btn-outline text-white btn-primary cursor-pointer">
              Upload Image
              <input
                type="file"
                className="hidden"
                {...register("file", { required: true })}
              />
            </label>

            {fileField && (
              <span className="text-gray-300">{fileField.name}</span>
            )}
          </div>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-40 h-40 rounded-lg object-cover mt-2"
            />
          )}
          {/* Submit Button */}
          <Button className="btn-primary" type={"submit"}>
            Create Post
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
