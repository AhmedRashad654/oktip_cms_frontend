import React, {  useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Dashboard from "./pages/Dashboard";
import AboutUs from "./pages/AboutUs/AboutUs";
import APiPage from "./pages/ApiPage/APIPage";
import TermsOfUse1 from "./pages/TermsofUse1";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Footer from "./pages/Footer";
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [ language, setLanguage ] = useState("en");
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      ...(darkMode && {
        background: {
          default: "#00040F",
          paper: "#00040F",
        },
      }),
      primary: { main: "#1d4ed8" },
      secondary: { main: "#9333ea" },
    },
    typography: { fontFamily: "Arial, sans-serif" },
  });
  let queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route
              element={
                <Layout
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  language={language}
                  setLanguage={setLanguage}
                />
              }
            >
              <Route
                path="/"
                element={<Home darkMode={darkMode} language={language} />}
              />

              <Route path="/about" element={<About />} />
              <Route
                path="/APiPage"
                element={ <APiPage darkMode={ darkMode } language={ language} />}
              />
              <Route
                path="/about-us"
                element={<AboutUs theme={darkMode ? "dark" : "light"}  language={language}/>}
              />
              <Route
                path="/privacy-policy"
                element={<PrivacyPolicy theme={darkMode ? "dark" : "light"} language={language}/>}
              />
              <Route
                path="/terms-ofuse"
                element={<TermsOfUse1 theme={darkMode ? "dark" : "light"} />}
              />
            </Route>

            {/* صفحة `Dashboard` بدون `Navbar` */}
            <Route
              path="/dashboard"
              element={
             
                <Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />
             
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

// **مكون `Layout` لإخفاء الـ Navbar في صفحات معينة**
function Layout({ darkMode, setDarkMode, language, setLanguage }) {
  const location = useLocation();

  return (
    <>
      {/* **إظهار Navbar فقط إذا لم يكن في صفحة `dashboard`** */}
      {location.pathname !== "/dashboard" && (
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          language={language}
          setLanguage={setLanguage}
        />
      )}
      <Outlet />
          {location.pathname !== "/dashboard" && (
        <Footer
          language={language}   
        />
      )}
    </>
  );
}

export default App;
