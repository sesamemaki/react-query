import { useState } from "react";
import "./App.css";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const [clicked, setClicked] = useState(false);
  const [clickedPost, setClickedPost] = useState();

  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json().then((res.json = data))
      ),
  });

  const handleClick = (e) => {
    console.log("clicked");
    console.log(e.target.innerText);
    setClicked(true);
    setClickedPost(e.target.innerText);
  };

  const handleBack = () => {
    setClicked(false);
  };

  // console.log(data);
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log(clicked);

  return (
    <div>
      {!clicked
        ? Array.isArray(data) &&
          data.map((post, i) => {
            return (
              <div key={i} style={{ border: "1px solid red" }}>
                <h1 onClick={handleClick}>{post.title}</h1>
                <p>{post.body}</p>
                <strong>👀 Id: {post.id}</strong>{" "}
                <strong>✨User Id: {post.userId}</strong>{" "}
              </div>
            );
          })
        : data
            .filter((post) => post.title === clickedPost)
            .map((element) => {
              return (
                <div key={element.id}>
                  <h1>{element.title}</h1>
                  <p>{element.body}</p>
                  <strong>👀 Id: {element.id}</strong>{" "}
                  <strong>✨User Id: {element.userId}</strong>{" "}
                  <button onClick={handleBack}>Back to Posts</button>
                </div>
              );
            })}
    </div>
  );
}