import React, { useState, useEffect } from "react";
import AppwriteServices from "../appwrite-services/config";
import { Postcard, Container } from "../components";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {}, []);
  AppwriteServices.getAllPosts([]).then((posts) => {
    if (posts) {
      setPosts(posts.rows);
    }
  });
  

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {/* {console.log(posts)} */}
          {
          posts.map((post) => (
            <div key={post.$id} className="p-2 w-full md:w-1/2 lg:w-1/4 bg-[#0065F8] rounded-2xl ">
              <Postcard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
