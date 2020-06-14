import React,{ useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [ repos, setRepos ] = useState([]);

  useEffect(()=> {
    api.get('repositories').then(response =>{
      setRepos(response.data);
    })
  },[]);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      title: `New project ${Date.now()}`,
      url: "http://github.com/jhsonmac/postifolio",
      techs: ['node', 'react', 'reactNative']
    })
    const repo = response.data;
    setRepos([...repos, repo]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);
    
    const newRepositories = repos.filter(
      repo => repo.id !== id
    )  
    setRepos(newRepositories);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(repo => 
        <li key={repo.id}>
          {repo.title}

          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
