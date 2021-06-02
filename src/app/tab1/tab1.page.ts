import { Component } from '@angular/core';
import { createAgent, IResolver, IMessageHandler } from '@veramo/core'
import { DIDResolverPlugin } from '@veramo/did-resolver'
import { MessageHandler } from '@veramo/message-handler'
import { JwtMessageHandler } from '@veramo/did-jwt'
import { W3cMessageHandler } from '@veramo/credential-w3c'

import { Resolver } from 'did-resolver'
import { getResolver as ethrDidResolver } from 'ethr-did-resolver'
import { getResolver as webDidResolver } from 'web-did-resolver'

const ethrdid = 'did:ethr:rinkeby:0x6acf3bb1ef0ee84559de2bc2bd9d91532062a730'
const raw = 'eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJjcmVkZW50aWFsU3ViamVjdCI6eyJmcmFtZXdvcmsiOiJWZXJhbW8ifSwiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiXSwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdfSwic3ViIjoiZGlkOmV0aHI6MHgwM2RjODhjOGUzYzA1MzY0YjFmNjRiNWNmMTZjYTJkOTNkYmRlYzE0ZWI2NGMwNGUzMjAwZWM2YTA2MzU4ZTRmYjEiLCJuYmYiOjE2MjI2MzUwNTcsImlzcyI6ImRpZDpldGhyOjB4MDNkYzg4YzhlM2MwNTM2NGIxZjY0YjVjZjE2Y2EyZDkzZGJkZWMxNGViNjRjMDRlMzIwMGVjNmEwNjM1OGU0ZmIxIn0.gB2a0J4Ic16wxJipFViNSUfH-kbuQwdJk3K2iVJyB15nRLOlEdE2A3FtvRsp-5AcrwZx7fgUSqImArYKD-4jjg'

const agent = createAgent<IResolver & IMessageHandler>({
  plugins: [
    new DIDResolverPlugin({
      resolver: new Resolver({
        ...ethrDidResolver({ infuraProjectId: '5ffc47f65c4042ce847ef66a3fa70d4c' }),
        ...webDidResolver(),
      }),
    }),
    new MessageHandler({
      messageHandlers: [
        new JwtMessageHandler(),
        new W3cMessageHandler(),
      ],
    }),
  ],
})
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  constructor() {
    this.resolveDID(ethrdid)
    this.handleMessage(raw)
  }

  async handleMessage(raw: string) {
    const message = await agent.handleMessage({raw, save: false})
    console.log(message)
  }

  async resolveDID(did: string) {
    const doc = await agent.resolveDid({
      didUrl: did
    })
    console.log(doc)
  }

}
