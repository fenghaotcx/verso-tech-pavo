import { convertToFloatValue } from '../../../utils/convertFloat';

export const getPoolData = (
  anchor,
  mirror,
  pylon,
  terraSwap,
  loterra,
  terraworld,
  altered,
  tfloki,
  nexus,
  valkyrie,
) => {
  const lotaPool = loterra?.lotaPool ? [loterra.lotaPool] : [];
  const terraworldPool = terraworld?.twdPool ? [terraworld?.twdPool] : [];
  const altePool = altered.altePool ? [altered?.altePool] : [];
  const flokiPool = tfloki?.flokiPool ? [tfloki.flokiPool] : [];
  const vkrPool = valkyrie?.vkrPool ? [valkyrie.vkrPool] : [];

  const getPoolTotal = () => {
    const pylonPoolTotal = pylon?.pylonSum?.pylonPoolSum;
    const lotaPoolTotal = loterra?.lotaPool?.totalLpUstValue || '0';
    const terraworldTotal = terraworld?.twdPool?.totalLpUstValue || '0';
    const alteredTotal = altered?.altePool?.totalLpUstValue || '0';
    const tflokiTotal = tfloki?.flokiPool?.totalLpUstValue || '0';
    const nexusTotal = nexus?.total?.nexusPoolSum || '0';
    const vkrTotal = valkyrie?.vkrPool?.totalLpUstValue || '0';

    const total =
      parseFloat(terraworldTotal) +
      parseFloat(pylonPoolTotal) +
      parseFloat(mirror?.total?.mirrorPoolSum) +
      parseFloat(anchor?.total?.anchorPoolSum) +
      parseFloat(terraSwap.total) +
      parseFloat(lotaPoolTotal) +
      parseFloat(alteredTotal) +
      parseFloat(tflokiTotal) +
      parseFloat(nexusTotal) +
      parseFloat(vkrTotal);

    return total.toString() || '0';
  };

  const pool = [
    ...pylon?.pylonPool,
    ...mirror?.mirrorStaking,
    ...anchor.pool,
    ...terraSwap.list,
    ...lotaPool,
    ...terraworldPool,
    ...altePool,
    ...flokiPool,
    ...nexus?.nexusPools,
    ...vkrPool,
  ].sort(
    (a, b) =>
      parseFloat(b.stakeableLpUstValue) +
      parseFloat(b.stakedLpUstValue) -
      (parseFloat(a.stakeableLpUstValue) + parseFloat(a.stakedLpUstValue)),
  );

  const largePool = pool.filter((a) => parseFloat(a.stakeableLpUstValue) + parseFloat(a.stakedLpUstValue) >= 1);

  const data = pool.map((assets) => {
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

    const liquid =
      assets?.stakeableLp !== '0'
        ? {
            lpData: {
              lp: convertToFloatValue(assets?.stakeableLp) + ' LP',
              token1: convertToFloatValue(assets?.token2UnStaked) + ' ' + assets?.symbol2,
              token2: convertToFloatValue(assets?.token1UnStaked) + ' ' + assets.symbol1,
            },
          }
        : { value: '-' };

    return [{ name: assets.lpName }, staked, liquid, { value: '$' + convertToFloatValue(assets?.totalLpUstValue) }];
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

    const liquid =
      assets?.stakeableLp !== '0'
        ? {
            lpData: {
              lp: convertToFloatValue(assets?.stakeableLp) + ' LP',
              token1: convertToFloatValue(assets?.token2UnStaked) + ' ' + assets?.symbol2,
              token2: convertToFloatValue(assets?.token1UnStaked) + ' ' + assets.symbol1,
            },
          }
        : { value: '-' };

    return [{ name: assets.lpName }, staked, liquid, { value: '$' + convertToFloatValue(assets?.totalLpUstValue) }];
  });

  return {
    titles: ['Name', 'Staked', 'Liquid', 'Value'],
    data: data,
    largeData: largeData,
    total: '$' + convertToFloatValue(getPoolTotal()),
    totalValue: parseFloat(getPoolTotal()),
  };
};
