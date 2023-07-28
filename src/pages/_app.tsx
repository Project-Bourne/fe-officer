import React from 'react'
import {AppLayout} from '@/layout/index';
import '@/styles/globals.css'
import {DevSupport} from "@react-buddy/ide-toolbox-next";
import {ComponentPreviews, useInitial} from "@/components/dev";

function App({Component, pageProps, ...appProps}) {

    const isLayoutNeeded = appProps.router.pathname.includes("/auth");

    const LayoutWrapper = !isLayoutNeeded ? AppLayout : React.Fragment;

    return (
        <LayoutWrapper>
            <DevSupport ComponentPreviews={ComponentPreviews}
                        useInitialHook={useInitial}
            >
                <Component {...pageProps} />
            </DevSupport>
        </LayoutWrapper>
    )
}

export default App