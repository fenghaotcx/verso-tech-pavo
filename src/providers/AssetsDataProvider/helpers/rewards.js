import { convertToFloatValue } from '../../../utils/convertFloat';
// import { math } from '@contco/terra-utilities';

const formatApr = (apr = '0') => {
  // const aprPercentage = math.times(apr, 100);
  return parseFloat(apr).toFixed(2);
};

export const getRewardData = (
  anchor,
  mirror,
  pylon,
  spectrum,
  loterra,
  starterra,
  terraworld,
  altered,
  tfloki,
  nexus,
  valkyrie,
) => {
  const borrowRewards = anchor?.debt?.reward;
  const totalReward = anchor?.totalReward;
  const lotaPool = loterra?.lotaPool ? [loterra.lotaPool] : [];
  const terraworldPool = terraworld?.twdPool ? [terraworld.twdPool] : [];
  const altePool = altered?.altePool ? [altered.altePool] : [];
  const flokiPool = tfloki?.flokiPool ? [tfloki.flokiPool] : [];
  const vkrPool = valkyrie?.vkrPool ? [valkyrie.vkrPool] : [];

  const getRewardsTotal = () => {
    const ancTotal = totalReward;
    const mirrorTotal = mirror?.total?.mirrorPoolRewardsSum;
    const pylonPoolTotal = pylon?.pylonSum?.pylonPoolRewardsSum;
    const loterraRewards = loterra?.lotaGov?.rewardsValue || '0';
    const loterraPoolRewards = loterra?.lotaPool?.rewardsValue || '0';
    const starterraRewards = starterra?.govRewardsTotal;
    // const terraworldRewards = math.plus(
    //   terraworld?.twdPool?.rewardsValue || '0',
    //   terraworld?.twdGov?.rewardsValue || '0',
    // );
    const terraworldRewards =  +terraworld?.twdPool?.rewardsValue + +terraworld?.twdGov?.rewardsValue
    const alteredRewards = altered?.altePool?.rewardsValue || '0';
    const flokiRewards = tfloki?.flokiPool?.rewardsValue || '0';
    // const nexusRewards = math.plus(nexus?.total?.nexusPoolRewardsSum || '0', nexus?.nexusGov?.rewardsValue || '0');
    const nexusRewards = +nexus?.total?.nexusPoolRewardsSum  + +nexus?.nexusGov?.rewardsValue
    const vkrRewards = valkyrie?.vkrPool?.rewardsValue || '0';

    const total =
      parseFloat(mirrorTotal) +
      parseFloat(ancTotal) +
      parseFloat(pylonPoolTotal) +
      parseFloat(loterraRewards) +
      parseFloat(starterraRewards) +
      parseFloat(loterraPoolRewards) +
      parseFloat(terraworldRewards) +
      parseFloat(alteredRewards) +
      parseFloat(flokiRewards) +
      parseFloat(nexusRewards) +
      parseFloat(vkrRewards);

    return total.toString() || '0';
  };

  const getGovStaked = () => {
    const ancGov = parseFloat(anchor?.gov?.value || '0');
    const mirrorGov = parseFloat(mirror?.gov?.value || '0');
    const pylonGov = parseFloat(pylon?.gov?.value || '0');
    const specGov = parseFloat(spectrum?.specGov?.value || '0');
    const lotaGov = parseFloat(loterra?.lotaGov?.value || '0');
    const sttGov = parseFloat(starterra?.govStakedTotal);
    const twdGov = parseFloat(terraworld?.twdGov?.value || '0');
    const vkrGov = parseFloat(valkyrie?.vkrGov?.value || '0');
    const nexusGov = parseFloat(nexus?.nexusGov?.value || '0');
    const govStaked = mirrorGov + ancGov + pylonGov + specGov + lotaGov + sttGov + twdGov + vkrGov + nexusGov;
    return govStaked;
  };

  const pool = [
    ...pylon?.pylonPool,
    ...mirror?.mirrorStaking,
    ...anchor.pool,
    ...lotaPool,
    ...terraworldPool,
    ...altePool,
    ...flokiPool,
    ...nexus?.nexusPools,
    ...vkrPool,
  ].sort((a, b) => b.rewardsValue - a.rewardsValue);

  const starTerraGov = starterra.starTerraGov ? starterra.starTerraGov : [];
  const terraworldGov = terraworld?.twdGov ? [terraworld?.twdGov] : [];
  const vkrGov = valkyrie?.vkrGov ? [valkyrie.vkrGov] : [];
  const nexusGov = nexus?.nexusGov ? [nexus.nexusGov] : [];
  const gov = [
    pylon?.gov,
    spectrum?.specGov,
    mirror?.gov,
    anchor?.gov,
    loterra?.lotaGov,
    ...starTerraGov,
    ...terraworldGov,
    ...vkrGov,
    ...nexusGov,
  ]
    .filter((item) => item != null)
    .sort((a, b) => parseFloat(b.value) - parseFloat(a.value));

  const rewardEstimates = () => {
    let dailyTotal = 0;
    let monthlyTotal = 0;
    let yearlyTotal = 0;

    pool?.map((item) => {
      const value = parseFloat(item?.totalLpUstValue);
      const apr = parseFloat(item?.apr || item?.apy);
      if (value && apr) {
        const daily = (apr / 365) * value;
        const monthly = daily * 30;
        const yearly = apr * value;

        dailyTotal += daily;
        monthlyTotal += monthly;
        yearlyTotal += yearly;
      }
    });

    gov?.map((item) => {
      const value = parseFloat(item?.value);
      const apr = parseFloat(item?.apr || item?.apy);
      if (value && apr) {
        const daily = (apr / 36500) * value;
        const monthly = daily * 30;
        const yearly = (apr / 100) * value;

        dailyTotal += daily;
        monthlyTotal += monthly;
        yearlyTotal += yearly;
      }
    });

    const anchorBorrowValue = parseFloat(anchor?.debt?.value);
    const anchorBorrowApr = parseFloat(borrowRewards?.apy);

    if (anchorBorrowValue && anchorBorrowApr) {
      const daily = (anchorBorrowApr / 36500) * anchorBorrowValue;
      const monthly = daily * 30;
      const yearly = (anchorBorrowApr / 100) * anchorBorrowValue;

      dailyTotal += daily;
      monthlyTotal += monthly;
      yearlyTotal += yearly;
    }

    return {
      Claimable: getRewardsTotal(),
      Daily: dailyTotal.toFixed(2),
      Monthly: monthlyTotal.toFixed(2),
      Yearly: yearlyTotal.toFixed(2),
    };
  };

  const poolData =
    pool && pool.length > 0
      ? pool.map((assets) => {
          const ap = assets?.apy
            ? { apy: formatApr(assets.apy) + '%' }
            : { apr: assets?.apr === '0' ? 'N/A' : formatApr(assets.apr) + '%' };
          return [
            { name: assets?.lpName },
            {
              lpData: {
                lp: convertToFloatValue(assets?.stakedLp) + ' LP',
                token1: convertToFloatValue(assets?.token2Staked) + ' ' + assets?.symbol2,
                token2: convertToFloatValue(assets?.token1Staked) + ' ' + assets?.symbol1,
              },
            },
            ap,
            {
              reward: {
                token: convertToFloatValue(assets?.rewards) + ' ' + assets?.rewardsSymbol,
                tokenValue: '$' + convertToFloatValue(assets?.rewardsValue),
              },
            },
          ];
        })
      : [];

  const borrowData = [
    [
      {
        name: borrowRewards?.name,
      },
      {
        value: 'N/A',
      },
      {
        apr: borrowRewards?.apy + '%',
      },
      {
        reward: {
          token: borrowRewards?.reward + ' ANC',
          tokenValue:
            borrowRewards?.reward === '<0.001'
              ? '$' + 0
              : '$' + (parseFloat(borrowRewards?.reward) * parseFloat(anchor?.debt?.ancprice)).toFixed(3),
        },
      },
    ],
  ];

  const govData = gov?.map((govItem) => {
    const govReward =
      govItem?.rewardsValue && govItem?.rewardsValue !== '0'
        ? {
            reward: {
              token: `${parseFloat(govItem.rewards).toFixed(2)} ${govItem.symbol}`,
              tokenValue: '$' + parseFloat(govItem?.rewardsValue).toFixed(2),
            },
          }
        : {
            value: 'Automatically re-staked',
          };
    const ap = govItem?.apy
      ? { apy: convertToFloatValue(govItem.apy) + '%' }
      : { apr: govItem?.apr === '0' ? 'N/A' : convertToFloatValue(govItem?.apr) + '%' };
    return [
      {
        name: govItem.name,
        info: govItem?.faction,
      },
      {
        balance: {
          token: convertToFloatValue(govItem.staked) + ' ' + govItem.symbol,
          tokenValue: '$' + convertToFloatValue(govItem.value),
        },
      },
      ap,
      govReward,
    ];
  });

  const estimate = rewardEstimates();
  const headerData = Object.keys(estimate).map((key) => {
    return {
      name: key,
      value: '$' + convertToFloatValue(estimate[key]),
    };
  });

  return {
    titles: ['Name', 'Staked', 'APR', 'Reward'],
    data: [...poolData, ...borrowData, ...govData],
    total: headerData,
    totalReward: parseFloat(getRewardsTotal()),
    totalGov: getGovStaked(),
  };
};
