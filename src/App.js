import React, { useState, useEffect } from 'react';

import './styles.css';

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((res) => {
      setRepositories(res.data);
    });
  }, []);

  async function handleAddRepository() {
    const res = await api.post('repositories', {
      title: `Repository ${Date.now()}`,
      url: `http://github.com/${Date.now()}`,
      techs: ['React', 'React-Native', 'Node', 'Typescript'],
    });

    const repository = res.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const newRepositories = repositories.filter((repository) => {
      return repository.id !== id;
    });

    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.map((repository) => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
