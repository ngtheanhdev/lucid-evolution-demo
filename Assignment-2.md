# Assignment 2

## 1. Lock asset:
### Chạy files lock asset với câu lệnh:
```
npm run start demo-lock.ts
```
### Log:
```
Address: addr_test1qpuexzns2ze8g5csu30mnnk6gf2vx3kpwz2vcgvjsv7q3dr4mvw6eahqha5vj295mm0ugphljpesxaszfcff5hq9w63qrh0623
Public key hash: 79930a7050b2745310e45fb9ceda4254c346c17094cc2192833c08b4
Smart contract address:  addr_test1wqfswsdusyh8twtt6c8g2kqm05sqdescvrpauf3wqxf249q4tnf5f
Transaction created: 282640b568f99bbb782e9593ede55ecb5ffc011489c08d93e0487f10b5bb40bc
```
#### TxHash của giao dịch lock: `282640b568f99bbb782e9593ede55ecb5ffc011489c08d93e0487f10b5bb40bc`

## 2. Unlock asset:
### Chạy files unlock asset với câu lệnh:
```
npm run start demo-unlock.ts
```
### Log:
```
Address: addr_test1qpuexzns2ze8g5csu30mnnk6gf2vx3kpwz2vcgvjsv7q3dr4mvw6eahqha5vj295mm0ugphljpesxaszfcff5hq9w63qrh0623
Public key hash: 79930a7050b2745310e45fb9ceda4254c346c17094cc2192833c08b4
Smart contract address:  addr_test1wqfswsdusyh8twtt6c8g2kqm05sqdescvrpauf3wqxf249q4tnf5f
UTxOs to unlock:  [
  {
    txHash: '282640b568f99bbb782e9593ede55ecb5ffc011489c08d93e0487f10b5bb40bc',
    outputIndex: 0,
    assets: { lovelace: 2000003n },
    address: 'addr_test1wqfswsdusyh8twtt6c8g2kqm05sqdescvrpauf3wqxf249q4tnf5f',
    datumHash: undefined,
    datum: 'd8799f581c79930a7050b2745310e45fb9ceda4254c346c17094cc2192833c08b4ff',
    scriptRef: undefined
  }
]
Transaction created: c0329c57cc4f5c16dad849450c7c91b4cfe958a535a1c8cf9140556b1a7fef12
```
#### Txhash của giao dịch unlock: `c0329c57cc4f5c16dad849450c7c91b4cfe958a535a1c8cf9140556b1a7fef12`