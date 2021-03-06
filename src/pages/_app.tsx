import { Provider } from 'next-auth/client';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate } from 'react-query/hydration';
import AppBar from '../components/AppBar';
import Navigation from '../components/Nav';

import '../styles/global.css';






function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const [queryClient] = useState(() => new QueryClient())


  return (


    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>

        <Provider session={pageProps.session}>
          <div className="container">

            <Navigation />


            <div className="content_container">
              <Component {...pageProps} />

            </div>
            <footer>This is a footer</footer>
          </div>


        </Provider>

      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>

  )
}
export default MyApp
