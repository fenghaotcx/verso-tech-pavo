import { TEFI_API } from '../constants';


const networks = {
  mainnet: {
    name: 'mainnet',
    chainID: 'columbus-5',
    lcd: 'https://lcd.contco.dev',
    contract: TEFI_API + 'https://whitelist.mirror.finance/columbus.json',
    mantle: TEFI_API + 'https://mantle.terra.dev/',
    stats: TEFI_API + 'https://graph.mirror.finance/graphql',
    shuttle: {
      ethereum: 'terra13yxhrk08qvdf5zdc9ss5mwsg5sf7zva9xrgwgc',
      bsc: 'terra1g6llg3zed35nd3mh9zx6n64tfw3z67w2c48tn2',
    },
    fee: { gasPrice: 0.456, amount: 300000 }, // 0.3 UST
  },
  testnet: {
    name: 'testnet',
    chainID: 'bombay-12',
    lcd: TEFI_API + 'https://bombay-lcd.terra.dev',
    contract: 'https://whitelist.mirror.finance/bombay.json',
    mantle: 'https://bombay-mantle.terra.dev/',
    stats: 'https://bombay-graph.mirror.finance/graphql',
    shuttle: {
      ethereum: 'terra10a29fyas9768pw8mewdrar3kzr07jz8f3n73t3',
      bsc: 'terra1paav7jul3dzwzv78j0k59glmevttnkfgmgzv2r',
    },
    fee: { gasPrice: 0.15, amount: 150000 }, // 0.15 UST
  },
  moonshine: {
    name: 'moonshine',
    chainID: 'localterra',
    lcd: 'https://moonshine-lcd.terra.dev',
    contract: 'https://whitelist.mirror.finance/moonshine.json',
    mantle: 'https://moonshine-mantle.terra.dev',
    stats: 'https://moonshine-mirror-graph.terra.dev/graphql',
    shuttle: {
      ethereum: '',
      bsc: '',
    },
    fee: { gasPrice: 0.15, amount: 150000 }, // 0.15 UST
  },
};

export default networks;
