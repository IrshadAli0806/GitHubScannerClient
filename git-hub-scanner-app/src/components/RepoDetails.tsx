import React,{useEffect,useState} from 'react';
import { GIT_HUB_TOKEN } from "../config"
function RepoDetails(props:any) {


    const{repoUrl}=props;
    const[repoData,setRepoData] = useState([])

    const header = {
        'githubtoken': GIT_HUB_TOKEN,
        
        // Add any other headers as needed
      }

    useEffect(()=>{
        const loadRepoData=async ()=>{
            const response = await fetch(`http://localhost:3001/repository/${repoUrl}`,{
                method: 'GET',
                headers :header
            });

            if(!response.ok){
             return;
            }

            const data = await response.json();
            setRepoData(data);

        }
        loadRepoData();
        return () => {
            // This code will run when the component is unmounted
            // Perform any cleanup or resource release here
          };
    
    },[props])
    return (
      <div>
       
         
          <p>
           <h2> Selected Repo Details </h2>
          </p>
         {
           repoData.map((repo:any)=>{
            return(<>
                <p><b>Repo Name</b>:{repo.name}  </p>
                <p><b>Size </b>: {repo.size}</p>
                <p><b>Owner </b>: {repo.owner}</p>
                <p><b>private </b>: {repo.private ? "Private" : "Public"}</p>
                <p><b>Number Of Files </b>: {repo.numFiles}</p>
                <p><b>Yaml File Content </b>: {repo.ymlFileContent}</p>
                <p><b>Active Web hooks </b>: {repo.activeWebhooks}</p>
                </>)
           })
         }
          
    
      </div>
    );
  }
  
  export default RepoDetails;


