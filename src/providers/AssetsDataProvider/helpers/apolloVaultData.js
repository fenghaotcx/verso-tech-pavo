import { convertToFloatValue } from '../../../utils/convertFloat';

export const getApolloVaultData = (apolloData) => {
  const vaults = JSON.parse(JSON.stringify(apolloData.vaults))
  const apolloVaults = vaults.sort(
    (a, b) => parseFloat(b.stakedLpUstValue) - parseFloat(a.stakedLpUstValue),
  );

  const largePool = apolloVaults.filter((a) => parseFloat(a.stakedLpUstValue) >= 1);

  const data = apolloVaults.map((assets) => {
    const staked =
      assets?.stakedLp !== '0'
        ? {
            lpData: {
              lp: convertToFloatValue(assets?.stakedLp) + ' LP',
              token1: convertToFloatValue(assets?.token2Staked) + ' ' + assets?.symbol2,
              token2: convertToFloatValue(assets?.token1Staked) + ' ' + assets.symbol1,
            },
          }
        : { value: '-' };

    return [{ name: assets.lpName }, staked, { value: '$' + convertToFloatValue(assets?.stakedLpUstValue) }];
  });

  const largeData = largePool.map((assets) => {
    const staked =
      assets?.stakedLp !== '0'
        ? {
            lpData: {
              lp: convertToFloatValue(assets?.stakedLp) + ' LP',
              token1: convertToFloatValue(assets?.token2Staked) + ' ' + assets?.symbol2,
              token2: convertToFloatValue(assets?.token1Staked) + ' ' + assets.symbol1,
            },
          }
        : { value: '-' };

    return [{ name: assets.lpName }, staked, { value: '$' + convertToFloatValue(assets?.stakedLpUstValue) }];
  });

  return {
    titles: ['Name', 'Staked', 'Value'],
    data: data,
    largeData: largeData,
    total: '$' + convertToFloatValue(apolloData?.total),
    totalValue: parseFloat(apolloData?.total),
  };
};
