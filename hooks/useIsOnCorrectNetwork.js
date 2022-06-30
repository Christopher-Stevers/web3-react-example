import { useState, useEffect } from 'react';
import chainIdDeployEnvMap from '../components/chainIdDeployEnvMap';
import {useWeb3React} from "@web3-react/core";

const useIsOnCorrectNetwork = () => {
	const { chainId, error, account } = useWeb3React();
	const [isOnCorrectNetwork, setIsOnCorrectNetwork] = useState(true);

	useEffect(() => {
		async()=>{
		if(error?.message?.includes('Unsupported chain id') || (chainIdDeployEnvMap[process.env.NEXT_PUBLIC_DEPLOY_ENV]['chainId'] !== chainId && account)){
			setIsOnCorrectNetwork(false);
		}
		else{setIsOnCorrectNetwork(true);
		}}
	}, [chainId, error?.message, account]);

	return [isOnCorrectNetwork, setIsOnCorrectNetwork];
};

export default useIsOnCorrectNetwork;