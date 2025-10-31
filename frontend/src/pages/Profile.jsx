import React from "react";
import { useSelector } from "react-redux";
import ProfileImage from "../components/ProfileCompnents/ProfileImage";
import ProfilePost from "../components/ProfileCompnents/ProfilePost";

const Profile = () => {
  const user = useSelector((state) => state.auth.userData);

  return (
    <div className="bg-base-100 dark min-h-screen">
      {/* Profile Image */}
      <ProfileImage user={user} />

      {/* User Info Card */}
      <div className="mt-20 px-8">
        <div className="card bg-base-200 shadow-lg rounded-lg p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              <h1 className="text-3xl font-bold">{user.username}</h1>
              {user.bio && (
                <p className="text-gray-400 mt-2">{user.bio || "hi"}</p>
              )}
            </div>

            <div className="flex space-x-4 mt-4 sm:mt-0">
              <button className="btn btn-primary">Follow</button>
              <button className="btn btn-outline">Message</button>
            </div>
          </div>

          {/* Stats */}
          <div className="stats stats-vertical sm:stats-horizontal shadow mt-6 bg-base-100 rounded-lg">
            <div className="stat">
              <div className="stat-title">Posts</div>
              <div className="stat-value">{user.posts || 0}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Followers</div>
              <div className="stat-value">{user.followers || 0}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Following</div>
              <div className="stat-value">{user.following || 0}</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs tabs-boxed mt-6">
            <a className="tab tab-active">Posts</a>
            <a className="tab">Media</a>
            <a className="tab">About</a>
          </div>

          {/* Posts Grid */}
          <ProfilePost />
        </div>
      </div>
    </div>
  );
};

export default Profile;
