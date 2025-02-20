import { logout } from "../services/auth"

const TecnicoDashboard = () => {
    const username = localStorage.getItem("username");  // Recuperar el username

    return (
        <div>
            <h1>Tecnico Dashboard</h1>
            <h2>Hola, {username}</h2>  {/* Mostrar el username */}
            <button onClick={logout}>Login</button>
        </div>
    );
};

export default TecnicoDashboard;