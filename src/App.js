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
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json().then((res.json = data))
      ),
  });

  console.log(data);
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      {Array.isArray(data) &&
        data.map((post, i) => {
          return (
            <div>
              <h1 key={i}>{post.title}</h1>
              <p key={i}>{post.body}</p>;<strong>👀 Id: {post.id}</strong>{" "}
              <strong>✨User Id: {post.userId}</strong>{" "}
            </div>
          );
        })}
    </div>
  );
}
