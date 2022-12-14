import { useEffect, useState } from "react";
import { useQuery } from "react-query";


import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

async function fetchPosts() {
  
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0"
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  const {data, isError, error,  isLoading, isFetching } = useQuery('posts', fetchPosts, {
    cacheTime: 1000
  })


  // isFetching - the async query function is in pending status
  // isLaoding - means there are no cached data + isFetching(it is part of isFetching)

  if(isError) {
    return <h3>oops , something went wrong... {error.toString()}</h3>
  }

  if(isLoading) {
    return <h3>Laoding...</h3>
  }



  return (
    <>
      <ul>
        {data?.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
