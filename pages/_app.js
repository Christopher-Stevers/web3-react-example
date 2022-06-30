import '../styles/globals.css'
import {ethers} from 'ethers'
import { Web3ReactProvider } from '@web3-react/core';
function MyApp({ Component, pageProps }) {


	function getLibrary(provider) {
		const library = new ethers.providers.Web3Provider(provider);
		library.pollingInterval = 12000;
		return library;
	}


  return(
    
    
    <Web3ReactProvider getLibrary={getLibrary}>
    <Component {...pageProps} />
    
    
    </Web3ReactProvider>
    )
}

export default MyApp
