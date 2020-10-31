import React from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = React.useState([]);

  const listarRepositorios = React.useCallback(() => {
    api.get("/repositories").then((data) => setRepositories(data.data));
  }, []);

  React.useEffect(() => {
    listarRepositorios();
  }, [listarRepositorios]);

  async function handleAddRepository() {
    const { data: repository } = await api.post("/repositories", {
      title: `Repositorio ${Date.now()}`,
    });
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories([... repositories.filter(repository => repository.id !== id)]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
