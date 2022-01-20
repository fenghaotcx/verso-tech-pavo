import { times } from '../../utils/math';
import { MsgExecuteContract } from '@terra-money/terra.js';
import { useTxOptions } from './useTxOptions';

const BATCH_LIMIT = 15;
const UNIT = 1000000;

const generateTxOptions = (airdrops, address) => {
  const airdropBatches = [];
  for (let i = 0; i < airdrops.length; i += BATCH_LIMIT) {
    airdropBatches.push(airdrops.slice(i, i + BATCH_LIMIT));
  }
  const txOptionBatches = airdropBatches.map((airdropBatch) => {
    const claimMessages = airdropBatch.map((airdrop) => {
      const msg = new MsgExecuteContract(
        address,
        airdrop.contract,
        {
          claim: {
            amount: times(airdrop.quantity, UNIT),
            stage: airdrop.round,
            proof: airdrop.proof,
          },
        },
        [],
      );
      return msg;
    });
    const txOptions = useTxOptions(claimMessages);
    return txOptions;
  });
  return txOptionBatches;
};

const executeAirdropClaim = async (txOptionBatches, post) => {
  try {
    const executedResults = [];
    for (let i = 0; i < txOptionBatches.length; i++) {
      const result = await post(txOptionBatches[i]);
      executedResults.push(result);
    }
    return executedResults;
  } catch (err) {
    throw new Error('Error claiming all airdrops');
  }
};

export const claimAirdrops = async (airdrops, address, post) => {
  try {
    const txOptionBatches = generateTxOptions(airdrops, address);
    await executeAirdropClaim(txOptionBatches, post);
    return true;
  } catch (err) {
    return false;
  }
};
