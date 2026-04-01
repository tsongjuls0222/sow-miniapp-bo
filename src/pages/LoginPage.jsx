import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import LoginCard from "@/components/LoginCard";
import Footer from "@/components/Footer";
import { loginUser } from "@/services/authService";
import { useAuth } from "@/global/AuthContext";
import bgImage from "@/assets/bg.jpg";

function LoginPage() {
  const navigate = useNavigate();
  const { setAccessToken, setUser } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async () => {
    if (loading) return;

    try {
      setLoading(true);
      setErrorMessage("");

      const response = await loginUser(form);

      const isSuccess =
        response?.status === 200 && response?.data?.code === 1;

      if (!isSuccess) {
        setErrorMessage(response?.data?.message || "Login failed.");
        return;
      }

      const accessToken =
        response?.data?.data?.accessToken ?? response?.data?.data?.token;

      const user = response?.data?.data?.user ?? null;

      if (!accessToken) {
        setErrorMessage("Access token not found.");
        return;
      }

      setAccessToken(accessToken);
      setUser(user);

      navigate("/pricelist");
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="page"
      style={{
        backgroundImage: `url(${bgImage})`
      }}
    >
      <Header />

      <main className="main-content">
        <LoginCard
          form={form}
          onChange={handleChange}
          onSubmit={handleLogin}
          loading={loading}
          errorMessage={errorMessage}
        />
      </main>

      <Footer />
    </div>
  );
}

export default LoginPage;