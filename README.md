### commitit

#### contract
- `npm run wast`
- `npm run abi`
- deploy or update (only both `wast` and `abi` are changed can update deployed): `cleos set contract commititlike commitit.like`
- test create like: `cleos push action commititlike createlike '{"voter":"commitittest","pr_commiter":"foreseaz","pr_url":"github/EOS/pull/123"}' -p commitittest`
- test get like: `cleos get table commititlike commitittest data`

### create account
- create account for contract: `commitit.lkx` (create from [testnet](http://203.195.171.163:8081))
  + public key: `EOS7ogHLWAya3G87c2bimACYrJd9cGhdXLrtgAJzsszuW44H4kWd9`
  + private key: `5JHeN2n3ai7awp9tWDwe12rV5ia9oLfZkxMs9oLz18FND7EvcjT`
  + wallet: commitittest `PW5JbVgTnBXhjG3hrVRVwnSazWStwRLHCcyw6EWzL4R3rVsBEWGPq`
