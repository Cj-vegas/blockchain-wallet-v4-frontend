import { add, lift, pathOr, reduce } from 'ramda'
import { createDeepEqualSelector } from 'services/ReselectHelper'
import { Remote } from 'blockchain-wallet-v4/src'
import { selectors } from 'data'

export const getBtcWatchOnlyBalance = createDeepEqualSelector(
  [
    selectors.core.wallet.getUnspendableContext,
    selectors.core.data.btc.getAddresses
  ],
  (context, addressesR) => {
    const contextToBalances = (context, balances) =>
      context.map(a => pathOr(0, [a, 'final_balance'], balances))
    const balancesR = lift(contextToBalances)(Remote.of(context), addressesR)
    return balancesR.map(reduce(add, 0))
  }
)

export const getBchWatchOnlyBalance = createDeepEqualSelector(
  [
    selectors.core.kvStore.bch.getUnspendableContext,
    selectors.core.data.bch.getAddresses
  ],
  (context, addressesR) => {
    const contextToBalances = (context, balances) =>
      context.map(a => pathOr(0, [a, 'final_balance'], balances))
    const balancesR = lift(contextToBalances)(Remote.of(context), addressesR)
    return balancesR.map(reduce(add, 0))
  }
)
