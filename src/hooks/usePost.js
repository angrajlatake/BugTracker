import { useState, useEffect } from "react";
import axios from "axios";
const usePost = (url, postData) => {
  const [response, setResponse] = useState([]);
  const [postLoading, setPostLoading] = useState(false);
  const [postError, setPostError] = useState(false);

  useEffect(() => {
    const postData = async () => {
      setPostLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/${url}`,
          postData,
          {
            withCredentials: true,
            credentials: "include",
          }
        );
        setResponse(res.data);
      } catch (err) {
        setPostError(err);
      }
      setPostLoading(false);
    };
    postData();
  }, [url]);
  const rePost = async () => {
    setPostLoading(true);
    try {
      const res = await axios.get(url);
      setResponse(res.data);
    } catch (err) {
      setPostError(err);
    }
    setPostLoading(false);
  };
  return { response, postLoading, postError, rePost };
};

export default usePost;
