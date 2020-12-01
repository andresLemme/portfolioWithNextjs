import Head from "next/head";
import Input from "../components/Input";
import Button from "../components/Button";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import axios from 'axios'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

 function handleChange(e){
    setSearchTerm(e.target.value)
  }

 async function handleClick(){
   const data = await axios.get(`https://api.github.com/search/users?q=${searchTerm}`)
   

  }
  return (
    <div>
      <h1>Busca tu perfil</h1>
      <Input
        placeholder="Buscar usuario"
        name="searchInput"
        onChance={handleChange}
        value={setSearchTerm}
      />
      <Button value="Buscar" name="searchAction" onClick={handleClick} />
    </div>
  );
}
