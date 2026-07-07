import FilesFetch from "../components/files";
import FilesModel from "../components/filemodel";
import { useEffect, useRef, useState } from "react";

export default function Files() {
  const [isActive, setIsActive] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  const toggleIsActive = () => {
    setIsActive(!isActive);
  };

  const handleFileUploaded = () => {
    setRefreshed(!refreshed);
  };

  useEffect(() => {
    if (isActive && window.innerWidth < 768) {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isActive]);

  return (
    <>
      <div className="flex flex-row flex-wrap">
        <section className="flex-1 w-full">
          <FilesFetch
            isActive={isActive}
            onToggle={toggleIsActive}
            refreshed={refreshed}
          />
        </section>
        <section ref={formRef} className={`w-full ${isActive ? "md:w-1/3" : "flex-none"}`}>
          {isActive && (
            <FilesModel
              isActive={isActive}
              onToggle={toggleIsActive}
              onFileUploaded={handleFileUploaded}
              refreshed={refreshed}
            />
          )}
        </section>
      </div>
    </>
  );
}
