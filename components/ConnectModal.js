import React, {  useEffect } from 'react';
import { injected, walletconnect } from './connectors';
import Image from 'next/image';
import {useWeb3React} from "@web3-react/core";


const ConnectModal = ({closeModal})=>{

	const {activate, account} = useWeb3React();

	const handleMetaMask = async()=>{
		await activate(injected);
		closeModal();
	};

	const handleWalletConnect = async()=>{
		await activate( walletconnect);
		closeModal();
	};
	useEffect(()=>{
		if(account){
			closeModal();
		}
	})
	,[account];
	return(
		<div>
			<div id="connect-modal" >
				<div >
					<h2 >Connect Wallet</h2>
					<p >Connect your wallet to continue with OpenQ. By connecting your wallet you agree with OpenQ{'\''}s terms of service.</p>
					<button onClick={handleMetaMask} >
						<Image src={'/metamask.png'} height={40} width={40} alt={'metamask logo'}/>
						<div >
							Metamask
						</div>
					</button>
					<button onClick={handleWalletConnect} >
						<Image src={'/wallet-connect.jpg'} className="rounded-full" height={40} width={40} alt={'wallet connect logo'}/>
						<div >
							WalletConnect
						</div>
					</button>
					<button onClick={closeModal} >
							Close
					</button>
				</div>
			</div>
			<div onClick={closeModal} ></div>
		</div>

	);
};
export default ConnectModal;