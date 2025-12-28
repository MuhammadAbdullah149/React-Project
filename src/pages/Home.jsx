import React, { useState, useEffect } from "react";
import { Container, Postcard } from "../components";
import AppwriteServices from "../appwrite-services/config";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    AppwriteServices.getAllPosts().then((posts) => {
      if (posts) {
        setPosts(posts.rows);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-25 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2  w-full md:w-1/2 lg:w-1/4">
              <Postcard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
