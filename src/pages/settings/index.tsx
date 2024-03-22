import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

function Settings() {
  const router = useRouter();

  useEffect(() => {
    router.replace(
      {
        pathname: `/settings/profile`
      },
      undefined,
      { shallow: true }
    );
  }, []);

  return <></>;
}

export default Settings;
