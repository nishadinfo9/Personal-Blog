import React from "react";

const ProfilePost = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {[1, 2, 3, 4].map((post) => (
        <div key={post} className="card bg-base-200 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Post Title {post}</h2>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfilePost;
