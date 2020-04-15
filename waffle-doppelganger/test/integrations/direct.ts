import {use, expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {MockProvider, solidity} from 'ethereum-waffle';

import {doppelganger} from '../../src';
import Counter from '../helpers/interfaces/Counter.json';

use(chaiAsPromised);
use(solidity);

describe('Doppelganger - Integration (called directly)', () => {
  const [wallet] = new MockProvider().getWallets();

  it('throws readable error if mock was not set up for a method', async () => {
    const mockCounter = await doppelganger(wallet, Counter.interface);

    await expect(mockCounter.read()).to.be.revertedWith('Method not initialized');
  });

  it('mock resolve works', async () => {
    const mockCounter = await doppelganger(wallet, Counter.interface);
    await mockCounter.mock.read.returns(45291);

    const ret = await expect(mockCounter.read()).to.be.eventually.fulfilled;
    expect(ret.toNumber()).to.be.equal(45291);
  });

  it('mock revert works', async () => {
    const mockCounter = await doppelganger(wallet, Counter.interface);
    await mockCounter.mock.read.reverts();

    await expect(mockCounter.read()).to.be.revertedWith('Mock revert');
  });

  it('mock with call arguments', async () => {
    const mockCounter = await doppelganger(wallet, Counter.interface);
    await mockCounter.mock.add.returns(1);
    await mockCounter.mock.add.withArgs(1).returns(2);
    await mockCounter.mock.add.withArgs(2).reverts();

    expect(await mockCounter.add(0)).to.equal(1);
    expect(await mockCounter.add(1)).to.equal(2);
    await expect(mockCounter.add(2)).to.be.revertedWith('Mock revert');
    expect(await mockCounter.add(3)).to.equal(1);
  });
});
