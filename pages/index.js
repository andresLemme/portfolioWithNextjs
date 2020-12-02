import Head from "next/head";
import Input from "../components/Input";
import Button from "../components/Button";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState({})

  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  async function handleClick() {
    const github = await axios.get(
      `https://api.github.com/users/${searchTerm}`
    );

    const projectsData = await axios.get('https://api.jsonbin.io/b/5fc817b19abe4f6e7caec5c5/1')

    const userProjects = projectsData.data.find((user) => user.name === searchTerm)

    setData({
      githubData: github.data
    })
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
