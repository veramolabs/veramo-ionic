import { TestBed } from '@angular/core/testing';

import { VeramoService, AgentType } from './veramo.service';

describe('VeramoService', () => {
  let service: VeramoService;
  let agent: AgentType

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VeramoService);
    agent = service.getAgent()
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should resolve a DID', async () => {
    const id = 'did:ethr:rinkeby:0x6acf3bb1ef0ee84559de2bc2bd9d91532062a730';
    const document = await agent.resolveDid({didUrl: id});

    expect(document).toBeTruthy();
    expect(document.didDocument.id).toEqual(id)
  });

  it('should parse a Jwt Message', async () => {
    const raw = 'eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJjcmVkZW50aWFsU3ViamVjdCI6eyJmcmFtZXdvcmsiOiJWZXJhbW8ifSwiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiXSwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdfSwic3ViIjoiZGlkOmV0aHI6MHgwM2RjODhjOGUzYzA1MzY0YjFmNjRiNWNmMTZjYTJkOTNkYmRlYzE0ZWI2NGMwNGUzMjAwZWM2YTA2MzU4ZTRmYjEiLCJuYmYiOjE2MjI2MzUwNTcsImlzcyI6ImRpZDpldGhyOjB4MDNkYzg4YzhlM2MwNTM2NGIxZjY0YjVjZjE2Y2EyZDkzZGJkZWMxNGViNjRjMDRlMzIwMGVjNmEwNjM1OGU0ZmIxIn0.gB2a0J4Ic16wxJipFViNSUfH-kbuQwdJk3K2iVJyB15nRLOlEdE2A3FtvRsp-5AcrwZx7fgUSqImArYKD-4jjg'
    const message = await agent.handleMessage({raw})

    expect(message).toBeTruthy();
    expect(message.raw).toEqual(raw)
  });
});
