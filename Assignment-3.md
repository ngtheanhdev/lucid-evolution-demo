# Assignment 3

## 1. Mint và send token:
### Chạy files mint và send token với câu lệnh:
```
npm run start demo-mint.ts
```
### Log:
```
Address: addr_test1qpmmnat803ask8j875ep9d7pg5tks8m8374ttr8z0h94lj3av070x7r8ul6wym7wehdxapfkstvwrd96qtr6kry7uzyspmd2yd
Public key hash: 77b9f5677c7b0b1e47f53212b7c14517681f678faab58ce27dcb5fca
Policy ID: ea18e6a0ee4e64bdffbd23fee4e763feba370ebefda55c78c73f9453
Asset ID: ea18e6a0ee4e64bdffbd23fee4e763feba370ebefda55c78c73f945341737369676e6d656e7420332e31202d205468e1babf20416e68
Mint + Send transaction submitted: 928ecdcd1e29d84a37355528a71874609368556eced05ea8634ea16fda8f467c
Sent 500 Assignment 3.1 - Thế Anh tokens to: addr_test1qpuexzns2ze8g5csu30mnnk6gf2vx3kpwz2vcgvjsv7q3dr4mvw6eahqha5vj295mm0ugphljpesxaszfcff5hq9w63qrh0623
```
#### TxHash của giao dịch mint và send token: `928ecdcd1e29d84a37355528a71874609368556eced05ea8634ea16fda8f467c`

## 2. Mint NFT và update metadata:
### 2.1 - Chạy files mint và send NFT với câu lệnh:
```
npm run start demo-mint-nft-cip-68.ts
```
### Log:
```
Address: addr_test1qpmmnat803ask8j875ep9d7pg5tks8m8374ttr8z0h94lj3av070x7r8ul6wym7wehdxapfkstvwrd96qtr6kry7uzyspmd2yd
Public key hash: 77b9f5677c7b0b1e47f53212b7c14517681f678faab58ce27dcb5fca
Policy ID: ea18e6a0ee4e64bdffbd23fee4e763feba370ebefda55c78c73f9453
NFT Name: C2VN-Thế Anh
NFT Quantity: 100n
Reference NFT Unit: ea18e6a0ee4e64bdffbd23fee4e763feba370ebefda55c78c73f9453000643b04332564e2d5468e1babf20416e68
User NFT Unit: ea18e6a0ee4e64bdffbd23fee4e763feba370ebefda55c78c73f9453000de1404332564e2d5468e1babf20416e68
Mint NFT and send transaction submitted: a489a8e1c56f6dba7caed882fe8f159ee9738d3de51239a9ddad5b38686f1f49
Sent 1 C2VN-Thế Anh NFT to: addr_test1qpuexzns2ze8g5csu30mnnk6gf2vx3kpwz2vcgvjsv7q3dr4mvw6eahqha5vj295mm0ugphljpesxaszfcff5hq9w63qrh0623
```
#### Txhash của giao dịch mint và send NFT: `a489a8e1c56f6dba7caed882fe8f159ee9738d3de51239a9ddad5b38686f1f49`

### 2.2 - Chạy files update metadata câu lệnh:
```
npm run start demo-update-metadata.ts
```
### Log:
```
Address: addr_test1qpmmnat803ask8j875ep9d7pg5tks8m8374ttr8z0h94lj3av070x7r8ul6wym7wehdxapfkstvwrd96qtr6kry7uzyspmd2yd
Public key hash: 77b9f5677c7b0b1e47f53212b7c14517681f678faab58ce27dcb5fca
Found reference UTxO: {
  txHash: 'a489a8e1c56f6dba7caed882fe8f159ee9738d3de51239a9ddad5b38686f1f49',
  outputIndex: 0,
  assets: {
    lovelace: 2000000n,
    ea18e6a0ee4e64bdffbd23fee4e763feba370ebefda55c78c73f9453000643b04332564e2d5468e1babf20416e68: 1n
  },
  address: 'addr_test1qpmmnat803ask8j875ep9d7pg5tks8m8374ttr8z0h94lj3av070x7r8ul6wym7wehdxapfkstvwrd96qtr6kry7uzyspmd2yd',
  datumHash: undefined,
  datum: 'd8799fbf4b6465736372697074696f6e581b41737369676e6d656e7420332e32202d204349502d3638204e465445696d6167655835697066733a2f2f516d6273553362545155396138795a75446a45326264394c4c5932636755515a636f316d4744337033444e4b5234456c6576656c01446e616d654e4332564e2d5468e1babf20416e68ff01ff',
  scriptRef: undefined
}
Fields in datum: {
  metadata: {
    description: 'Assignment 3.2 - CIP-68 NFT',
    image: 'ipfs://QmbsU3bTQU9a8yZuDjE2bd9LLY2cgUQZco1mGD3p3DNKR4',
    level: '1',
    name: 'C2VN-Thế Anh'
  },
  version: '1'
}
New fields in datum: {
  metadata: {
    description: 'Assignment 3.2 - CIP-68 NFT',
    image: 'ipfs://QmbsU3bTQU9a8yZuDjE2bd9LLY2cgUQZco1mGD3p3DNKR4',
    level: '2',
    name: 'C2VN-Thế Anh'
  },
  version: '2'
}
Update metadata transaction submitted: 215eca124900816e6b7ec6646620f348f9c9c19751369b975b7e2940e93eb5dc
Waiting for transaction to be confirmed...
Transaction confirmed!
Checking updated reference UTxO...
Found reference UTxO: {
  txHash: '215eca124900816e6b7ec6646620f348f9c9c19751369b975b7e2940e93eb5dc',
  outputIndex: 0,
  assets: {
    lovelace: 2000000n,
    ea18e6a0ee4e64bdffbd23fee4e763feba370ebefda55c78c73f9453000643b04332564e2d5468e1babf20416e68: 1n
  },
  address: 'addr_test1qpmmnat803ask8j875ep9d7pg5tks8m8374ttr8z0h94lj3av070x7r8ul6wym7wehdxapfkstvwrd96qtr6kry7uzyspmd2yd',
  datumHash: undefined,
  datum: 'd8799fbf4b6465736372697074696f6e581b41737369676e6d656e7420332e32202d204349502d3638204e465445696d6167655835697066733a2f2f516d6273553362545155396138795a75446a45326264394c4c5932636755515a636f316d4744337033444e4b5234456c6576656c02446e616d654e4332564e2d5468e1babf20416e68ff02ff',
  scriptRef: undefined
}
Fields in datum: {
  metadata: {
    description: 'Assignment 3.2 - CIP-68 NFT',
    image: 'ipfs://QmbsU3bTQU9a8yZuDjE2bd9LLY2cgUQZco1mGD3p3DNKR4',
    level: '2',
    name: 'C2VN-Thế Anh'
  },
  version: '2'
}
```
#### Txhash của giao dịch update metadata: `215eca124900816e6b7ec6646620f348f9c9c19751369b975b7e2940e93eb5dc`