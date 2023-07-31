// home page
import HomeLayout from '@/layout/HomeLayout'
import { HomeSubData } from '@/utils/constants';
import HomeHistory from './history'
import SettingsLayout from '@/layout/SettingsLayout'
import { useRouter } from 'next/router';
import FileUpload from './components/FileUpload';
import { TabComp } from '../settings/components';
import { useEffect } from 'react';


function Home() {
  const showTitle = false;
  const router = useRouter()
  console.log(router, 'i am router');

  useEffect(() => {
    router.push(
      {
        pathname: `/home/history`,
      },
      undefined,
      { shallow: true }
    )
  }, []);
  
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <></>

  )
}

export default Home;