/* solium-disable security/no-inline-assembly */
pragma solidity ^0.6.3;

contract Doppelganger {
    struct MockCall {
        bool initialized;
        bool reverts;
        bytes returnValue;
    }

    mapping(bytes32 => MockCall) mockConfig;

    fallback() external {
        MockCall storage mockCall = getMockCall();
        if (mockCall.reverts == true) {
            mockRevert();
            return;
        }
        mockReturn(mockCall.returnValue);
    }

    function mockReverts(bytes memory data) public {
        mockConfig[keccak256(data)] = MockCall({
            initialized: true,
            reverts: true,
            returnValue: ""
        });
    }

    function mockReturns(bytes memory data, bytes memory value) public {
        mockConfig[keccak256(data)] = MockCall({
            initialized: true,
            reverts: false,
            returnValue: value
        });
    }

    function getMockCall() view private returns (MockCall storage mockCall) {
        mockCall = mockConfig[keccak256(msg.data)];
        if (mockCall.initialized == true) {
            return mockCall;
        }
        mockCall = mockConfig[keccak256(abi.encodePacked(msg.sig))];
        if (mockCall.initialized == true) {
            return mockCall;
        }
        revert("Method not initialized");
    }

    function mockReturn(bytes memory ret) pure private {
        assembly {
            return (add(ret, 0x20), mload(ret))
        }
    }

    function mockRevert() pure private {
        revert("Mock revert");
    }
}
