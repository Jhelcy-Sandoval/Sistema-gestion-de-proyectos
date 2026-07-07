import "../App.css";
import ProjectsFetch from "../components/projects";
import ProjectModel from "../components/projectmodel";
import { useEffect, useRef, useState } from "react";

export default function Projects() {
  const [isActive, setIsActive] = useState(false);
  const [refreshed, setRefreshed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const formRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isActive && isMobile) {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isActive, isMobile]);

  const toggleIsActive = () => {
    setIsActive(!isActive);
  };

  const handleProjectUploaded = () => {
    setRefreshed(!refreshed);
  };

  return (
    <div
      className={`flex w-full min-h-screen ${
        isMobile ? "flex-col" : "flex-row"
      }`}
    >
      <section
        className={
          isMobile
            ? "w-full"
            : isActive
            ? "w-2/3 transition-all duration-300"
            : "w-full transition-all duration-300"
        }
      >
        <ProjectsFetch
          isActive={isActive}
          onToggle={toggleIsActive}
          refreshed={refreshed}
        />
      </section>

      {isActive && (
        <section
          ref={formRef}
          className={
            isMobile
              ? "w-full border-t border-slate-700 scroll-mt-20"
              : "w-1/3 border-l border-slate-700"
          }
        >
          <ProjectModel
            isActive={isActive}
            onToggle={toggleIsActive}
            onProjectUploaded={handleProjectUploaded}
          />
        </section>
      )}
    </div>
  );
}