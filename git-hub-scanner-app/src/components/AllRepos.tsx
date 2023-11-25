import React,{useEffect,useState} from 'react';
import RepoDetails from './RepoDetails';
import { GIT_HUB_TOKEN } from "../config"
function AllRepos() {

    const[allRepoData,setAllRepo] = useState([])
    const [repoUrl,setRepoUrl]=useState();
    const header = {
        'githubtoken': GIT_HUB_TOKEN,
        
        // Add any other headers as needed
      }

    const handleRepoClick = async (repoUrl:any)=>{
      
      setRepoUrl(repoUrl);

    }

    useEffect(()=>{
        const loadAllRepoData=async ()=>{
            const response = await fetch("http://localhost:3001/repositories",{
                method: 'GET',
                headers :header
            });

            if(!response.ok){
             return;
            }

            const data = await response.json();
            setAllRepo(data);

        }
        loadAllRepoData();
        return () => {
            // This code will run when the component is unmounted
            // Perform any cleanup or resource release here
          };
    
    },[repoUrl])
    return (
        <>
      <div style={{height:"200px",overflowY:"scroll"}}>
       
         
          <p>
           <h2> All Repo</h2>
          </p>
         {
           allRepoData.map((repo:any)=>{
            return(<>
                <p>
                 <b>Repo Name</b>: <span style={{cursor:"pointer",color:"blue"}}  onClick={()=>handleRepoClick(`${repo.owner}/${repo.name}`)}>{repo.name}</span>,<b>Size </b>: {repo.size},<b>owner </b>: {repo.owner}
                </p>
                <br/>
                </>)
           })
         }
          
      
      </div>
      <RepoDetails repoUrl={repoUrl}/>
      </>
    );
  }
  
  export default AllRepos;


