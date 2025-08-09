import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000/",
});

const useAxioxSecure = () => {
    return axiosSecure;
}

export default useAxioxSecure;
