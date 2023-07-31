import HomeLayout from '@/layout/HomeLayout';
import { useRouter } from 'next/router';
import FileUpload from '../components/FileUpload';
import TabLayout from './TabLayout';

function HomeHistory() {

  const route = useRouter().pathname;
  const showTitle = false;

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className='mt-[8rem] h-[100%] rounded-[1rem] bg-[#F9F9F9] mx-5'>
      <HomeLayout>
        <h1 className='pl-10 pt-5 font-bold text-2xl '>Add Content</h1>
        <FileUpload />
      </HomeLayout>

      <TabLayout/>
    </div>
  );
}

export default HomeHistory;
