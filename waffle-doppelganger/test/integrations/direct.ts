import {use, expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {MockProvider, solidity} from 'ethereum-waffle';

import {doppelganger} from '../../src';
import Counter from '../helpers/interfaces/Counter.json';

use(chaiAsPromised);
use(solidity);

describe('Doppelganger - Integration (called directly)', () => {
  const [wallet] = new MockProvider().getWallets();

  it('mocking mechanism works', async () => {
    const mockCounter = await doppelganger(wallet, Counter.interface);
    await mockCounter.mock.read.returns(45291);

    const ret = await expect(mockCounter.read()).to.be.eventually.fulfilled;
    expect(ret.toNumber()).to.be.equal(45291);
  });

  it('reverting works', async () => {
    const mockCounter = await doppelganger(wallet, Counter.interface);
    await mockCounter.read.reverts();
    const {contract} = mockCounter;

    await expect(contract.read()).to.be.revertedWith('Mock revert');
  });
});
