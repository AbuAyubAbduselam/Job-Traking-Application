import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  HomeLayout,
  Register,
  Login,
  DashboardLayout,
  Error,
  Landing,
  AddStudent,
  Stats,
  AllStudents,
  Profile,
  Admin,
  EditStudent,
  StudentAttendance,
  TeacherAttendance,
  About,
  Contact,
} from "./pages";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { loader as allStudentsLoader } from "./pages/AllStudents";
import { loader as editStudentLoader } from "./pages/EditStudent";
import { action as editStudentAction } from "./pages/EditStudent";
import { action as deleteStudentAction } from "./pages/DeleteStudent";
import { loader as adminLoader } from "./pages/Admin";
import { action as profileAction } from "./pages/Profile";
import { loader as statsLoader } from "./pages/Stats";
const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },

      {
        path: "admin-login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "teacher-login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddStudent />,
          },
          {
            path: "stats",
            element: <Stats />,
            loader: statsLoader,
          },
          {
            path: "all-students",
            element: <AllStudents />,
            loader: allStudentsLoader,
          },
          {
            path: "student-attendance",
            element: <StudentAttendance />,
            loader: allStudentsLoader,
          },
          {
            path: "teacher-attendance",
            element: <TeacherAttendance />,
            loader: allStudentsLoader,
          },

          {
            path: "profile",
            element: <Profile />,
            action: profileAction,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: "edit-student/:id",
            element: <EditStudent />,
            loader: editStudentLoader,
            action: editStudentAction,
          },
          {
            path: "delete-student/:id",
            action: deleteStudentAction,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
export default App;
