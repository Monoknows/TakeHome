import { useNavigate } from "react-router-dom";

export default function AdminSignUp({ darkMode }) {
  const navigate = useNavigate();
  const gotoAdminLogin = () => {
    navigate("/admin/login");
  };
  return <div className="">Admin Sign Up Page</div>;
}
