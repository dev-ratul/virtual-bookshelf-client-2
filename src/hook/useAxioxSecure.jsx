import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://virtual-bookshelf-server-three.vercel.app/",
});

const useAxioxSecure = () => {
    return axiosSecure;
}

export default useAxioxSecure;
