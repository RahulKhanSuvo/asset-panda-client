import React from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useUserInfo = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { data: userInfo = [], isLoading } = useQuery({
    queryKey: ["employeeInfo", user?.email],
    queryFn: async () => {
      const { data } = await axiosPublic(`/users/${user?.email}`);
      return data;
    },
  });
  return { userInfo, isLoading };
};

export default useUserInfo;
