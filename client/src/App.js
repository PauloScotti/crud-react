import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from "axios";
import Card from './components/card/card';

function App() {
  const [values, setValues] = useState();
  const [listCard, setListCard] = useState([]);

  const handleChangeValues = value => {
    setValues(prevValue => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleCLickButton = () => {
    Axios.post("http://localhost:3001/register", {
      name: values.name,
      cost: values.cost,
      category: values.category,
    }).then(() => {
      alert("Cadastrado com sucesso");
      Axios.post("http://localhost:3001/search", {
        id: values.idgames,
        name: values.name,
        cost: values.cost,
        category: values.category,
      }).then((response) => {
        setListCard([
          ...listCard,
          {
            idgames: response.data[0].idgames,
            name: values.name,
            cost: values.cost,
            category: values.category,
          },
        ]);
      });
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setListCard(response.data);
    });
  }, []);

  return (
    <div className='Container'>
      <div className="app--container">
        <div className='register--container'>
          <h1 className='register--title'>Scrim Shop</h1>
          <input
            type="text"
            name="name"
            placeholder="Nome"
            className="register--input"
            onChange={handleChangeValues}
          />
          <input
            type="text"
            name="cost"
            placeholder="Preço"
            className="register--input"
            onChange={handleChangeValues}
          />
          <input
            type="text"
            name="category"
            placeholder="Categoria"
            className="register--input"
            onChange={handleChangeValues}
          />
          <button className='register--button' onClick={() => handleCLickButton()}>Cadastrar</button>
        </div>

        {listCard.map((value) => {
          return (
            <Card
              listCard={listCard}
              setListCard={setListCard}
              key={value.id}
              id={value.idgames}
              name={value.name}
              cost={value.cost}
              category={value.category}
            ></Card>
          );
        })}
      </div>
    </div>
  );
}

export default App;
