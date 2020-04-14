import {use, expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {deployContract, MockProvider, solidity} from 'ethereum-waffle';

import {doppelganger} from '../../src';
import Counter from '../helpers/interfaces/Counter.json';
import Cap from '../helpers/interfaces/Cap.json';

use(chaiAsPromised);
use(solidity);

describe('Doppelganger - Integration (called by other contract)', () => {
  const [wallet] = new MockProvider().getWallets();

  const deploy = async () => {
    const mockCounter = await doppelganger(wallet, Counter.interface);
    const capContract = await deployContract(
      wallet,
      Cap,
      [mockCounter.address]
    );

    return {mockCounter, capContract};
  };

  it('mocking mechanism works', async () => {
    const {capContract, mockCounter} = await deploy();

    await mockCounter.mock.read.returns(5);
    const ret1 = await expect(capContract.read()).to.be.eventually.fulfilled;
    expect(ret1.toNumber()).to.be.equal(5);

    await mockCounter.mock.read.returns(12);
    const ret2 = await expect(capContract.read()).to.be.eventually.fulfilled;
    expect(ret2.toNumber()).to.be.equal(10);
  });

  it('revert mechanism works', async () => {
    const {capContract, mockCounter} = await deploy();

    await mockCounter.read.reverts();
    await expect(capContract.read()).to.be.revertedWith('Mock revert');
  });
});
