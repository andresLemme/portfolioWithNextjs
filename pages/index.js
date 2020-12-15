import Head from "next/head";
import Input from "../components/Input";
import Button from "../components/Button";
import styles from "../pages/Home.module.scss";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState({});

  function handleChange(e) {
    setSearchTerm(e.target.value);
  }
  function handleKeyPress(e) {
    if (e.key == "Enter") {
      // e.preventDefault();
      handleClick();
    }
  }

  async function handleClick() {
    const github = await axios.get(
      `https://api.github.com/users/${searchTerm}`
    );

    const projectsData = await axios.get(
      "https://api.jsonbin.io/b/5fc817b19abe4f6e7caec5c5/5"
    );

    const userProjects = projectsData.data.find(
      (user) => user.name == searchTerm
    );

    setData({
      githubData: github.data,
      projects: userProjects ? userProjects.projects : [],
    });
    setSearchTerm(" ");
  }

  return (
    <main className={styles.wrapper_all}>
      <div className={styles.boxInput}>
        <h1 className={styles.title}>Busca tu perfil</h1>
        <div className={styles.inputContent}>
          <Input
            className={styles.searchbox}
            placeholder="Buscar usuario"
            name="searchInput"
            onChange={handleChange}
            value={searchTerm}
            onKeyPress={handleKeyPress}
          />
          <Button
            className={styles.btn}
            value="Buscar"
            name="searchAction"
            onClick={handleClick}
          />
        </div>
      </div>
      <section className={styles.githubData_Box}>
        {data.githubData && (
          <div className={styles.info_Github}>
            <div className={styles.img_Box}>
              <img src={data.githubData.avatar_url} />
            </div>
            <div className={styles.infoBio}>
              <h2 className={styles.title}>{data.githubData.name}</h2>
              <h3 className={styles.biodesc}>{data.githubData.bio}</h3>
            </div>
          </div>
        )}
        {data.projects && (
          <div className={styles.projectsBox}>
            {data.projects.map((project, key) => {
              return (
                <div className={styles.projectBox} key={key}>
                <i className={styles.borderLeft } style={{background: project.color}}> </i>
                  <h4>{project.name}</h4>
                  <h5>{project.desc}</h5>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
