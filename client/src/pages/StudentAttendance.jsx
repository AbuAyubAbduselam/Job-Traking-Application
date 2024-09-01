import { toast } from "react-toastify";
import { StudentAttendanceContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import SearchContainer2 from "../components/SearchContainer2";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const { data } = await customFetch.get("/students", {
      params,
    });

    return { data, selectedParams: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllStudentsAttendanceContext = createContext();

const StudentAttendance = () => {
  const { data, selectedParams } = useLoaderData();

  return (
    <AllStudentsAttendanceContext.Provider value={{ data, selectedParams }}>
      <SearchContainer2 />
      <StudentAttendanceContainer />
    </AllStudentsAttendanceContext.Provider>
  );
};

export const UseAllStudentsAttendanceContext = () =>
  useContext(AllStudentsAttendanceContext);

export default StudentAttendance;
