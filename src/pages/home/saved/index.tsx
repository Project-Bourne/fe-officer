import HomeLayout from '@/layout/HomeLayout';
import SettingsLayout from '@/layout/SettingsLayout';
import { HomeSubData } from '@/utils/constants';
import Image from 'next/image';
import { useRouter } from 'next/router';
import FileUpload from '../components/FileUpload';

function HomeSaved() {

  const route = useRouter().pathname;
  const showTitle = false;

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className='mt-[8rem] h-[100%] rounded-[1rem] bg-[#F9F9F9] mx-5'>
      <HomeLayout>
        <h1 className='text-2xl pl-10 pt-5 font-bold'>Add Content</h1>
        <FileUpload />
      </HomeLayout>

      <SettingsLayout showTitle={showTitle} data={HomeSubData}>
        <div className="m-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="row-span-2 p-4 rounded-[20px] border-2 border-[#E5E7EB] bg-[#F3F5F6]">
            <div className="flex align-middle justify-end">
              <Image
                className="flex align-middle justify-center"
                src={require(`src/assets/icons/star.svg`)}
                alt="upload image"
                width={18}
                height={18}
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-light my-3">Title</span>
              <span className="font-normal mb-3">
                Redesigned Naira: CBN launches Cash Swap Programme for rural and
                Corn Ewa ati garri
              </span>
              <span className="font-light my-3">Keywords</span>
              <div className="flex flex-wrap align-middle gap-4">
                <span className="lang rounded-lg bg-[#E8F8FD] border-2 border-[#A2E2F6] flex align-middle px-3 py-1">
                  UI Design
                </span>
                <span className="lang rounded-lg bg-[#E8F8FD] border-2 border-[#A2E2F6] flex align-middle px-3 py-1">
                  UI Design
                </span>
                <span className="lang rounded-lg bg-[#E8F8FD] border-2 border-[#A2E2F6] flex align-middle px-3 py-1">
                  UI Design
                </span>
              </div>
            </div>
          </div>
          <div className="row-span-2 p-4 rounded-[20px] border-2 border-[#E5E7EB] bg-[#F3F5F6]">
            <div className="flex align-middle justify-end">
              <Image
                className="flex align-middle justify-center"
                src={require(`src/assets/icons/star.svg`)}
                alt="upload image"
                width={18}
                height={18}
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-light my-3">Title</span>
              <span className="font-normal mb-3">
                Redesigned Naira: CBN launches Cash Swap Programme for rural and
                Corn Ewa ati garri
              </span>
              <span className="font-light my-3">Keywords</span>
              <div className="flex flex-wrap align-middle gap-4">
                <span className="lang rounded-lg bg-[#E8F8FD] border-2 border-[#A2E2F6] flex align-middle px-3 py-1">
                  UI Design
                </span>
                <span className="lang rounded-lg bg-[#E8F8FD] border-2 border-[#A2E2F6] flex align-middle px-3 py-1">
                  UI Design
                </span>
                <span className="lang rounded-lg bg-[#E8F8FD] border-2 border-[#A2E2F6] flex align-middle px-3 py-1">
                  UI Design
                </span>
              </div>
            </div>
          </div>
          <div className="row-span-2 p-4 rounded-[20px] border-2 border-[#E5E7EB] bg-[#F3F5F6]">
            <div className="flex align-middle justify-end">
              <Image
                className="flex align-middle justify-center"
                src={require(`../../../assets/icons/star.svg`)}
                alt="upload image"
                width={18}
                height={18}
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-light my-3">Title</span>
              <span className="font-normal mb-3">
                Redesigned Naira: CBN launches Cash Swap Programme for rural and
                Corn Ewa ati garri
              </span>
              <span className="font-light my-3">Keywords</span>
              <div className="flex flex-wrap align-middle gap-4">
                <span className="lang rounded-lg bg-[#E8F8FD] border-2 border-[#A2E2F6] flex align-middle px-3 py-1">
                  UI Design
                </span>
                <span className="lang rounded-lg bg-[#E8F8FD] border-2 border-[#A2E2F6] flex align-middle px-3 py-1">
                  UI Design
                </span>
                <span className="lang rounded-lg bg-[#E8F8FD] border-2 border-[#A2E2F6] flex align-middle px-3 py-1">
                  UI Design
                </span>
              </div>
            </div>
          </div>
          <div className="border flex items-center gap-2 cursor-pointer  bg-[#F3F5F6] justify-center py-2 border-gray-500 mt-5 w-[100%]  h-[100%] rounded-[1rem]">
            <h2>Show all</h2>
            <Image
              src={require('../../../assets//icons/leftArro.svg')}
              alt="documents"
              className="cursor-pointer w-[2rem] h-[2rem] mt-2"
              width={10}
            />
          </div>
        </div>
      </SettingsLayout>
    </div>
  );
}

export default HomeSaved;
