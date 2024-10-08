import pngegg from "../Asset/pngegg.png";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function PokeLogin() {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required to fill"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (values: { email: string; password: string }) => {
    const { email, password } = values; // Destructure values for easier access

    // Check if the password is "admin"
    if (password !== "admin") {
      alert("Login failed: Incorrect password");
      return;
    }

    try {
      const response = await fetch(
        "https://library-crud-sample.vercel.app/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const result = await response.json();
      console.log('response success', result);
      alert('Login success');
      localStorage.setItem('token', result.token);
      navigate('/Dashboard');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Formik
        initialValues={initialValues}
        onSubmit={handleLogin}
        validationSchema={validationSchema}>
        <div className="w-96 border-1 rounded-b-lg bg-white shadow-2xl">
          <div className="bg-red-500 p-1 rounded-t-lg">
            <img src={pngegg} alt="Pokemon Logo" />
          </div>
          <h1 className="mt-10 text-3xl font-mono">Login</h1>
          <Form className="flex flex-col mt-3 p-5">
            <Field
              name="email"
              type="email"
              placeholder="Input Your Email..."
              className="border border-gray-300 p-2 mb-4 rounded-md"
            />
            <ErrorMessage name="email" component="div" />
            <Field
              name="password"
              type="password"
              placeholder="Input Your Password..."
              className="border border-gray-300 p-2 mb-4 rounded-md"
            />
            <ErrorMessage name="password" component="div" />
            <button
              type="submit"
              className="bg-orange-500 text-white font-semibold py-2 rounded-md hover:bg-orange-600 transition-colors duration-300">
              Login
            </button>
          </Form>
        </div>
      </Formik>
    </div>
  );
}
