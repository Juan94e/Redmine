import { logout } from "../services/auth"
import Navbar from "../components/Navbar";

const TecnicoDashboard = () => {
    const username = localStorage.getItem("username");  // Recuperar el username

    return (
        <div>
            <div className="bg-blue-500 text-white p-4">
                Si esto es azul, Tailwind está funcionando
            </div>
            <div className="test-custom">
                ¿Se pone rojo?
            </div>

            <Navbar />
            <h1>Tecnico Dashboard</h1>
            <h2>Hola, {username}</h2>  {/* Mostrar el username desde la DB*/}
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default TecnicoDashboard;