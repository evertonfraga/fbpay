pragma solidity ^0.4.2;

contract Pay {
    string public version = '0.1';
    mapping (string => uint256) balanceOf;

    event Transfer(string _from, string _to, uint256 _value);

    function Pay (
        string public name;
        string public symbol; 
    )

    function initAndLoad (string _account, uint256 _value) {
        balanceOf[account] += value;
    }

    function transfer (string _from, string _to, uint256 _value) {
        Transfer(_from, _to, _value);
    }

    function () {
        throw;
    }
}
