import {expect} from 'chai';
import {link} from '../lib';

const libraryAddress = '0xA193E42526F1FEA8C99AF609dcEabf30C1c29fAA';

describe('UNIT: Linking', () => {
  describe('link with Solidity4 bytecode', () => {
    // tslint:disable-next-line
    const compiledBytecode = '608060405234801561001057600080fd5b50610188806100206000396000f30060806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806332e43a1114610051578063f0ee080614610068575b600080fd5b34801561005d57600080fd5b506100666100a9565b005b34801561007457600080fd5b50610093600480360381019080803590602001909291905050506100ab565b6040518082815260200191505060405180910390f35b565b60008173__test/projects/custom_solidity_4/cust__631f6c6a8790916040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b15801561011a57600080fd5b505af415801561012e573d6000803e3d6000fd5b505050506040513d602081101561014457600080fd5b810190808051906020019092919050505090509190505600a165627a7a7230582058ce2e1827ff8568b87f7ee50960874b315f407a3b3fca7720b22e3049bd907c0029';
    // tslint:disable-next-line
    const runtimeBytecode  = '608060405234801561001057600080fd5b50610188806100206000396000f30060806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806332e43a1114610051578063f0ee080614610068575b600080fd5b34801561005d57600080fd5b506100666100a9565b005b34801561007457600080fd5b50610093600480360381019080803590602001909291905050506100ab565b6040518082815260200191505060405180910390f35b565b60008173A193E42526F1FEA8C99AF609dcEabf30C1c29fAA631f6c6a8790916040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b15801561011a57600080fd5b505af415801561012e573d6000803e3d6000fd5b505050506040513d602081101561014457600080fd5b810190808051906020019092919050505090509190505600a165627a7a7230582058ce2e1827ff8568b87f7ee50960874b315f407a3b3fca7720b22e3049bd907c0029';

    it('long name', async () => {
      const libraryName = 'test/projects/custom_solidity_4/custom_contracts/MyLibrary.sol:MyLibrary';
      const contract = {evm: {bytecode: {object: compiledBytecode}}};
      link(contract, libraryName, libraryAddress);
      expect(contract.evm.bytecode.object).to.eq(runtimeBytecode);
    });

    it('invalid name', async () => {
      const libraryName = 'non_existing';
      const contract = {evm: {bytecode: {object: compiledBytecode}}};
      expect(() => {
        link(contract, libraryName, libraryAddress);
      }).to.throw(Error, `Can't link 'non_existing'.`);
    });
  });

  describe('link with Solidity5 bytecode', () => {
    // tslint:disable-next-line
    const compiledBytecode = '608060405234801561001057600080fd5b50610190806100206000396000f3fe608060405260043610610046576000357c01000000000000000000000000000000000000000000000000000000009004806332e43a111461004b578063f0ee080614610062575b600080fd5b34801561005757600080fd5b506100606100b1565b005b34801561006e57600080fd5b5061009b6004803603602081101561008557600080fd5b81019080803590602001909291905050506100b3565b6040518082815260200191505060405180910390f35b565b60008173__$834a779d64fff2a3ff626ee032010a25b6$__631f6c6a8790916040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b15801561012257600080fd5b505af4158015610136573d6000803e3d6000fd5b505050506040513d602081101561014c57600080fd5b8101908080519060200190929190505050905091905056fea165627a7a72305820fa16bfc67d24cfccfe1e0546934a41580652fec4abea9a3d78136d9101ad82110029';
    // tslint:disable-next-line
    const runtimeBytecode  = '608060405234801561001057600080fd5b50610190806100206000396000f3fe608060405260043610610046576000357c01000000000000000000000000000000000000000000000000000000009004806332e43a111461004b578063f0ee080614610062575b600080fd5b34801561005757600080fd5b506100606100b1565b005b34801561006e57600080fd5b5061009b6004803603602081101561008557600080fd5b81019080803590602001909291905050506100b3565b6040518082815260200191505060405180910390f35b565b60008173A193E42526F1FEA8C99AF609dcEabf30C1c29fAA631f6c6a8790916040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b15801561012257600080fd5b505af4158015610136573d6000803e3d6000fd5b505050506040513d602081101561014c57600080fd5b8101908080519060200190929190505050905091905056fea165627a7a72305820fa16bfc67d24cfccfe1e0546934a41580652fec4abea9a3d78136d9101ad82110029';

    it('proper name', async () => {
      const libraryName = 'test/projects/custom/custom_contracts/MyLibrary.sol:MyLibrary';
      const contract = {evm: {bytecode: {object: compiledBytecode}}};
      link(contract, libraryName, libraryAddress);
      expect(contract.evm.bytecode.object).to.eq(runtimeBytecode);
    });

    it('invalid name', async () => {
      const libraryName = 'non_existing';
      const contract = {evm: {bytecode: {object: compiledBytecode}}};
      expect(() => {
        link(contract, libraryName, libraryAddress);
      }).to.throw(Error, `Can't link 'non_existing'.`);
    });
  });
});
