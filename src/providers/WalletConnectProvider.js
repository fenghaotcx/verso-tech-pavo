import dynamic from 'react-dynamic';
// import { WalletProvider} from '@terra-money/wallet-provider';
import networks from '../utils/networks';

const DynamicWalletProvider  = dynamic(
  () =>
    import('@terra-money/wallet-provider').then((module) => {
      return module.WalletProvider;
  }),
);


const walletConnectChainIds = {
  0: networks.testnet,
  1: networks.mainnet,
};

const WalletConnectProvider = ({ children }) => {
  
  return (
    <DynamicWalletProvider
      defaultNetwork={networks.testnet}
      walletConnectChainIds={walletConnectChainIds}
      connectorOpts={{ bridge: 'https://walletconnect.terra.dev/' }}
    >
      {children}
    </DynamicWalletProvider>
  );
};

export default WalletConnectProvider;
