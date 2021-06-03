import { Component } from '@angular/core';
import { VeramoService, AgentType } from '../veramo.service'

const ethrdid = 'did:ethr:rinkeby:0x6acf3bb1ef0ee84559de2bc2bd9d91532062a730'
const raw = 'eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJjcmVkZW50aWFsU3ViamVjdCI6eyJmcmFtZXdvcmsiOiJWZXJhbW8ifSwiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiXSwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdfSwic3ViIjoiZGlkOmV0aHI6MHgwM2RjODhjOGUzYzA1MzY0YjFmNjRiNWNmMTZjYTJkOTNkYmRlYzE0ZWI2NGMwNGUzMjAwZWM2YTA2MzU4ZTRmYjEiLCJuYmYiOjE2MjI2MzUwNTcsImlzcyI6ImRpZDpldGhyOjB4MDNkYzg4YzhlM2MwNTM2NGIxZjY0YjVjZjE2Y2EyZDkzZGJkZWMxNGViNjRjMDRlMzIwMGVjNmEwNjM1OGU0ZmIxIn0.gB2a0J4Ic16wxJipFViNSUfH-kbuQwdJk3K2iVJyB15nRLOlEdE2A3FtvRsp-5AcrwZx7fgUSqImArYKD-4jjg'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  agent: AgentType

  constructor(private veramoService: VeramoService) {}

  ngOnInit() {
    this.agent = this.veramoService.getAgent()
    
    this.resolveDID(ethrdid)
    this.handleMessage(raw)
  }

  async handleMessage(raw: string) {
    const message = await this.agent.handleMessage({raw, save: false})
    console.log(message)
  }

  async resolveDID(did: string) {
    const doc = await this.agent.resolveDid({
      didUrl: did
    })
    console.log(doc)
  }
}
