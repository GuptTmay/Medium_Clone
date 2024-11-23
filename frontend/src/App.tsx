import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blogs } from "./pages/Blogs";
import { Blog } from "./pages/Blog";

import {NextUIProvider} from "@nextui-org/react";
import Test from "./pages/Test";

const App = () => {
  return (
    <NextUIProvider>
      <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/*" element={<Test />} />
          </Routes>
      </BrowserRouter>
    </NextUIProvider>
  );
};

export default App;
