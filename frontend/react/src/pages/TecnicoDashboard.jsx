import { logout } from "../services/auth"
import Navbar from "../components/Navbar";

const TecnicoDashboard = () => {
    const username = localStorage.getItem("username");  // Recuperar el username

    return (
        <div>
            <Navbar />
            <h1>Tecnico Dashboard</h1>
            <h2>Hola, {username}</h2>  {/* Mostrar el username */}
            <button onClick={logout}>Login</button>
        </div>
    );
};

export default TecnicoDashboard;