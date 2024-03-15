import { BtcAssetsApi, DataSource } from '@rgbpp-sdk/btc'
import { BTC_SERVICE_URL, BTC_SERVER_TOKEN } from '../env'
export { sendBtc } from '@rgbpp-sdk/btc'

export const btcService = BTC_SERVER_TOKEN
  ? BtcAssetsApi.fromToken(BTC_SERVICE_URL, BTC_SERVER_TOKEN)
  : new BtcAssetsApi({
      url: BTC_SERVICE_URL,
      app: 'joyid-bitcoin-demo',
      domain: location.hostname,
    })

export const btcDataSource = new DataSource(btcService, 1)
