// Third party
import React, { useState, useEffect, useRef, } from 'react';
import jazzicon from '@metamask/jazzicon';
// Custom
import { useWeb3React } from '@web3-react/core';
import useConnectOnLoad from '../hooks/useConnectOnLoad';
import chainIdDeployEnvMap from './chainIdDeployEnvMap';
import ConnectModal from './ConnectModal';
import useIsOnCorrectNetwork from '../hooks/useIsOnCorrectNetwork';
// import axios from 'axios';

const ConnectButton = () => {

	// Context
	const { chainId, error, account } = useWeb3React();
	const [walletConnectModal, setWalletConnectModal]= useState()

	// State
	const [isConnecting] = useState(false);
	const [isOnCorrectNetwork,] = useIsOnCorrectNetwork({ chainId: chainId, error: error, account: account });
	const [showModal, setShowModal] = useState();
	const iconWrapper = useRef();
	const modalRef = useRef();
	const buttonRef = useRef();

	// Hooks
	useConnectOnLoad()(); // See [useEagerConnect](../../hooks/useEagerConnect.js)

	useEffect(()=>{
		async () => {
		if (account && iconWrapper.current) {
			iconWrapper.current.innerHTML = '';
			iconWrapper.current.appendChild(jazzicon(24, parseInt(account.slice(2, 10), 16)));
		}
	}
}, [account, isOnCorrectNetwork]);

	useEffect(() => {
		let handler = (event) => {
			if (!modalRef.current?.contains(event.target) && !buttonRef.current?.contains(event.target)) {
				setShowModal(false);
			}
		};
		window.addEventListener('mousedown', handler);

		return () => {
			window.removeEventListener('mousedown', handler);
		};
	});

	// Methods
	const openConnectModal = async () => {
		setWalletConnectModal(true);
	};


	const closeModal = ()=>{
		setWalletConnectModal(false);
	};



	const addOrSwitchNetwork = () => {
		window.ethereum
			.request({
				method: 'wallet_addEthereumChain',
				params:
					chainIdDeployEnvMap[process.env.NEXT_PUBLIC_DEPLOY_ENV]['params'],
			})
			.catch((error) => console.log('Error', error.message));
	};



	// Render
	return (<div>
		{account && isOnCorrectNetwork ?
			<div>
				<button
					disabled={isConnecting}
					ref={buttonRef}
					onClick={() => { setShowModal(!showModal); }}
					className="group flex items-center gap-x-3 h-12 font-mont whitespace-nowrap rounded-lg border border-inactive-accent bg-inactive-accent-inside py-2 px-6  font-semibold cursor-pointer hover:border-active-accent"
				>
					<span className="border-2 border-inactive-accent rounded-full h-7 py-px bg-inactive-accent group-hover:bg-active-accent group-hover:border-active-accent" ref={iconWrapper}></span>
				</button>

				
			</div> :
			isOnCorrectNetwork ?
				<div>
					<button
						onClick={openConnectModal}
						className="flex items-center font-mont whitespace-nowrap h-12 rounded-lg border border-inactive-accent bg-inactive-accent-inside py-2 px-6 text-white font-semibold cursor-pointer hover:border-active-accent"
						disabled={isConnecting}
					>
						{'Connect Wallet'}
					</button>
				</div> :
				<button onClick={addOrSwitchNetwork}
					className="flex items-center font-mont whitespace-nowrap h-12 rounded-lg border border-inactive-accent bg-inactive-accent-inside py-2.5 px-6 text-white font-semibold"
				>
					Use{' '}
					{
						chainIdDeployEnvMap[process.env.NEXT_PUBLIC_DEPLOY_ENV][
							'networkName'
						]
					}{' '}
					Network
				</button>
		}
		{
			walletConnectModal && <ConnectModal closeModal={closeModal} />
		}
	</div>
	);
};


export default ConnectButton;
