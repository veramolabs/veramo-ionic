import { Injectable } from '@angular/core';
import { TAgent, createAgent, IResolver, IMessageHandler } from '@veramo/core'
import { DIDResolverPlugin } from '@veramo/did-resolver'
import { MessageHandler, Message } from '@veramo/message-handler'
import { JwtMessageHandler } from '@veramo/did-jwt'
import { W3cMessageHandler } from '@veramo/credential-w3c'

import { Resolver } from 'did-resolver'
import { getResolver as ethrDidResolver } from 'ethr-did-resolver'
import { getResolver as webDidResolver } from 'web-did-resolver'

type AgentType = TAgent<IResolver & IMessageHandler>

@Injectable({
  providedIn: 'root'
})
export class VeramoService {

  private _agent: AgentType

  constructor() { 
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

    this._agent = agent
  }

  getAgent() {
    return this._agent
  }
}

export { AgentType }
