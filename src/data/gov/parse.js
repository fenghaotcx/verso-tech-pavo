import { selector, useRecoilValue } from "recoil"
import { div, isInteger } from "../../utils/math"
import { percent } from "../../utils/num"
import { formatAsset } from "../../lib/parse"
import { fromBase64 } from "../../lib/formHelpers"
import { protocolQuery } from "../contract/protocol"
import { PollType } from "../../pages/Poll/CreatePoll"

const parsePollQuery = selector({
  key: "parsePoll",
  get: ({ get }) => {
    const { getSymbol, parseAssetInfo } = get(protocolQuery)

    const parseParams = (decoded, id) => {
      const type =
        "whitelist" in decoded
          ? PollType.WHITELIST
          : "revoke_collateral_asset" in decoded
          ? PollType.DELIST_COLLATERAL
          : "revoke_asset" in decoded
          ? PollType.DELIST_ASSET
          : "pass_command" in decoded
          ? PollType.MINT_UPDATE
          : "update_weight" in decoded
          ? PollType.INFLATION
          : "update_config" in decoded
          ? PollType.GOV_UPDATE
          : "update_collateral_multiplier" in decoded
          ? PollType.COLLATERAL
          : "spend" in decoded
          ? PollType.COMMUNITY_SPEND
          : PollType.TEXT

      const parsed =
        "whitelist" in decoded
          ? parseWhitelist(decoded.whitelist)
          : "revoke_collateral_asset" in decoded
          ? parseRevokeCollateral(decoded.revoke_collateral_asset)
          : "revoke_asset" in decoded
          ? parseRevokeAsset(decoded.revoke_asset)
          : "pass_command" in decoded
          ? parsePassCommand(decoded.pass_command)
          : "update_weight" in decoded
          ? parseUpdateWeight(decoded.update_weight)
          : "update_config" in decoded
          ? parseUpdateConfig(decoded.update_config)
          : "update_collateral_multiplier" in decoded
          ? parseUpdateCollateralMultiplier(
              decoded.update_collateral_multiplier
            )
          : "spend" in decoded
          ? parseSpend(decoded.spend)
          : {}

      return { type, ...parsed }
    }

    const parseWhitelist = ({ params, ...whitelist }) => {
      const { mint_period, pre_ipo_price, ...rest } = params

      return {
        contents: [
          ...parseContents(whitelist),
          ...parseContents(rest, { format: percent }),
          ...parseContents({ mint_period }, { unit: "Seconds" }),
          ...parseContents(
            { pre_ipo_price },
            { unit: `UST per ${whitelist.symbol}` }
          ),
        ],
      }
    }

    const parseRevokeCollateral = ({ asset }) => {
      const { symbol } = parseAssetInfo(asset)
      return { contents: parseContents({ asset: symbol }) }
    }

    const parseRevokeAsset = ({ asset_token, end_price }) => {
      const symbol = getSymbol(asset_token)
      return { contents: parseContents({ asset: symbol }) }
    }

    const parsePassCommand = ({ msg }) => {
      const decodedPassCommand = fromBase64(msg)
      return parseUpdateAsset(decodedPassCommand.update_asset)
    }

    const parseUpdateAsset = ({ asset_token, ...params }) => ({
      contents: [
        ...parseContents({ asset: getSymbol(asset_token) }),
        ...parseContents(params, { format: percent }),
      ],
    })

    const parseUpdateWeight = ({ asset_token, weight }) => ({
      contents: parseContents({
        asset: getSymbol(asset_token),
        weight: div(weight, 100),
      }),
    })

    const parseUpdateConfig = (config) => {
      const { voting_period, effective_delay } = config
      const { quorum, threshold } = config
      const { proposal_deposit, voter_weight, owner } = config

      return {
        contents: [
          ...parseContents({
            owner,
            voting_period: getBlocks(voting_period),
            effective_delay: getBlocks(effective_delay),
            proposal_deposit: proposal_deposit
              ? formatAsset(proposal_deposit, "MIR")
              : undefined,
            voter_weight,
          }),
          ...parseContents({ quorum, threshold }, { format: percent }),
        ],
      }
    }

    const parseUpdateCollateralMultiplier = ({
      asset,
      multiplier,
    }) => {
      const { symbol } = parseAssetInfo(asset)
      return {
        contents: parseContents({ symbol, multiplier: String(multiplier) }),
      }
    }

    const getBlocks = (n) => (isInteger(n) ? `${n} Blocks` : undefined)

    const parseSpend = ({ recipient, amount }) => ({
      contents: parseContents({
        recipient,
        amount: formatAsset(amount, "MIR"),
      }),
    })

    return (poll) => {
      try {
        if (poll.execute_data) {
          const decoded = fromBase64(poll.execute_data.msg)
          const parsed = parseParams(decoded, poll.id)
          return { ...poll, ...parsed }
        } else {
          return { ...poll, type: PollType.TEXT }
        }
      } catch (error) {
        return poll
      }
    }
  },
})

export const useParsePoll = () => {
  return useRecoilValue(parsePollQuery)
}

/* helpers */
const parseContents = (
  object,
  config
) =>
  !object
    ? []
    : Object.entries(object).reduce((acc, [title, content]) => {
        const formatted = config?.format?.(content) || content
        const next = {
          title: getTitle(title),
          content: [formatted, config?.unit || ""].join(" "),
        }

        return content ? [...acc, next] : acc
      }, [])

export const getTitle = (title) => title.replace(/_/g, " ")
