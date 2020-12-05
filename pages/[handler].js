import axios from "axios";

export default function Handler({ githubData, projects }) {
  return (
    <main>
      {githubData && (
        <section>
          <div className="img">
            <img src={githubData.avatar_url} />
          </div>
          <div className="info">
            <h2>{githubData.name}</h2>
            <h3>{githubData.bio}</h3>
          </div>
        </section>
      )}

      {projects && projects.length > 0 && (
        <section>
          {projects.map((project, key) => {
            return (
              <div key={key}>
                <h4>{project.name}</h4>
                <h5>{project.desc}</h5>
              </div>
            );
          })}
        </section>
      )}
    </main>
  );
}

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps({ params }) {
  const { handler } = params;
  const github = await axios.get(`https://api.github.com/users/${handler}`);

  const projectsData = await axios.get(
    "https://api.jsonbin.io/b/5fc817b19abe4f6e7caec5c5/4"
  );

  const userProjects = projectsData.data.find((user) => user.name == handler);
  return {
    props: {
      githubData: github.data,
      projects: userProjects ? userProjects.projects : [],
    },
    revalidate: 3600 * 24,
  };
}
