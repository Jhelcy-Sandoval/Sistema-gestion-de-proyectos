import DefaultLayout from '../layout/DefaultLayout'; 
import FilesFetch from '../components/files';
import FilesModel from '../components/filemodel';
import { useState } from 'react';

export default function Files() {
  const [isActive, setIsActive] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  const toggleIsActive = () => {
    setIsActive(!isActive);
  };

  const handleFileUploaded = () => {
    setRefreshed(!refreshed); 
  };

  return (
    <>
      <DefaultLayout>
        <div className='flex flex-row'>
          <section className='flex-1 w-full'>
            <FilesFetch isActive={isActive} onToggle={toggleIsActive} refreshed={refreshed}/>
          </section>
          <section className={`${isActive ? 'w-1/3' : 'flex-none'}`}>
            {isActive && <FilesModel isActive={isActive} onToggle={toggleIsActive} onFileUploaded={handleFileUploaded} refreshed={refreshed}/>}
          </section>
        </div>
      </DefaultLayout>
    </>
  );
}
