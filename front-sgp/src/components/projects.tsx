import { useState } from "react";
import ProjectsCards from "./projectsCards";
import ProjectGet from "./projectGet";

interface ProjectsFetchProps {
  isActive: boolean;
  onToggle: () => void;
  refreshed: boolean;
}

  export default function ProjectsFetche({ isActive, onToggle, refreshed }: ProjectsFetchProps ) {
    const [selectedProject, setSelectedProject] = useState<string | null>(null); 
  
    const handleSelectProject = (projectId: string) => {
      setSelectedProject(projectId);
      console.log(projectId); 
    }

    return (
      <>
        {selectedProject === null ? ( 
          <section>
            <ProjectsCards 
              isActive={isActive}
              onToggle={onToggle}
              refreshed={refreshed}
              onSelectProject={handleSelectProject}
            />
          </section>
        ) : ( 
          <section>
            <div>
              <ProjectGet selectedProject={selectedProject}  setSelectedProject={setSelectedProject}/>
            </div>
          </section>
        )}
      </>
    );
  }
  