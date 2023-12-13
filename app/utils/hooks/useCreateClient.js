// hooks/useCreateClient.js
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import axios from "axios"; // Import axios
import { addClient } from "../redux/clientSlice";

const createClient = async (userData, token) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}clients`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

const useCreateClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [generalMessage, setGeneralMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleCreateClient = async (userData, token, setOpen) => {
    try {
      setIsLoading(true);

      if (!userData.email || !userData.phone || !userData.fullName) {
        setGeneralMessage("All inputs are required to add a client");
        setSuccessMessage("");
        setIsLoading(false);
        return false;
      }

      const response = await createClient(userData, token);

      console.log("All respondse", response);

      //   if (response.message === "Client profile already exists") {
      //     setGeneralMessage("Client profile already exists");
      //     setIsLoading(false);
      //   }
      //   if (response.status == 201) {
      //     setTimeout(() => {
      //       setOpen(false);
      //     }, 2000);
      //   }

      handleGetAllClients();
      setSuccessMessage("Client added successfully");
      console.log("success message", successMessage);
      dispatch(addClient(response));
      setGeneralMessage("generaal");
      setIsLoading(false);
      setOpen(false);
      console.log("success message 2", successMessage);

      // Update state and dispatch actions

      // Close modal after 2 seconds
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        setGeneralMessage("Unauthorized! User not logged in");
        localStorage.clear();
        router.push("/auth/login");
      } else {
        setSuccessMessage("");
      }

      setIsLoading(false);
    }
  };

  return {
    isLoading,
    generalMessage,
    successMessage,
    handleCreateClient,
    // handleGetAllClients,
  };
};

export default useCreateClient;
