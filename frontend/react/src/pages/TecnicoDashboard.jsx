
const TecnicoDashboard = () => {
    const username = localStorage.getItem("username");  // Recuperar el username

    return (
        <div>
            <h1>Tecnico Dashboard</h1>
            <h2>Hola, {username}</h2>  {/* Mostrar el username */}
        </div>
    );
};

export default TecnicoDashboard;