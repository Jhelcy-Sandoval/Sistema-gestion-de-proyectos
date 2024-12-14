import DefaultLayout from "../layout/DefaultLayout";
import '../App.css'
import ProjectsFetch from "../components/projects";
import ProjectModel from '../components/projectmodel';
import { useState } from "react";

export default function Projects () {
  const [isActive, setIsActive] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  const toggleIsActive = () => {
    setIsActive(!isActive);
  };

  const handleProjectUploaded = () => {
    setRefreshed(!refreshed); 
  };

  return (
    <>
      <DefaultLayout>
        <div className='flex flex-row'>
          <section className='flex-1 w-full' >
            <ProjectsFetch isActive={isActive} onToggle={toggleIsActive} refreshed={refreshed}/>
          </section>
          <section className={`${isActive ? 'w-1/3' : 'flex-none'}`}>
            {isActive && <ProjectModel isActive={isActive} onToggle={toggleIsActive} onProjectUploaded={handleProjectUploaded}/>}
          </section>
        </div>
      </DefaultLayout>
    </>
  )
}