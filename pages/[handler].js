
export default function Handler({githubData, projects}){
  return(
   <main>

   </main>
  )
}

export async function getStaticPath(){
  return{
    paths:[],
    fallback: true,
  }
}

export async function getStaticProps({handler}){
  
  const github = await axios.get(
    `https://api.github.com/users/${handler}`
  );

  const projectsData = await axios.get(
    "https://api.jsonbin.io/b/5fc817b19abe4f6e7caec5c5/4"
  );

  const userProjects = projectsData.data.find(
    (user) => user.name == handler
  );
  return{
    props:{
      githubData: github.data,
      projects: userProjects ? userProjects.projects : [],
    }
  }
}