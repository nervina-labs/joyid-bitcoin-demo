import { Component, Match, Switch } from 'solid-js'
import { Navigate, useSearchParams } from '@solidjs/router'
import {
  signMessageCallback,
  signPsbtCallback,
  connectCallback,
} from '@joyid/bitcoin'
import { RedirectAction } from '../utils'

export const Redirect: Component = () => {
  const [search] = useSearchParams<Record<'action', RedirectAction>>()
  const redirectHome = () => {
    let state
    try {
      state = connectCallback()
    } catch (error) {
      //
    }
    return <Navigate href="/home" state={state} />
  }
  const redirectSend = () => {
    let state
    try {
      state = signPsbtCallback()
    } catch (error) {
      //
    }
    return <Navigate href="/send" state={state} />
  }
  const redirectSignMessage = () => {
    let state
    try {
      state = signMessageCallback()
    } catch (error: any) {
      // get redirect state from error
      if (error.state) {
        state = {
          state: error.state,
        }
      }
      //
    }
    return <Navigate href="/sign-message" state={state} />
  }

  search
  return (
    <Switch fallback={<Navigate href="/" />}>
      <Match when={search.action === 'connect'}>{redirectHome()}</Match>
      <Match when={search.action === 'send'}>{redirectSend()}</Match>
      <Match when={search.action === 'sign-message'}>
        {redirectSignMessage()}
      </Match>
    </Switch>
  )
}
