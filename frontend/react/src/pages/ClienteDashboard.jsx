
const ClienteDashboard = () => {
    const username = localStorage.getItem("username");  // Recuperar el username

    return (
        <div>
            <h1>Cliente Dashboard</h1>
            <h2>Hola, {username}</h2>  {/* Mostrar el username */}
        </div>
    );
};

export default ClienteDashboard;