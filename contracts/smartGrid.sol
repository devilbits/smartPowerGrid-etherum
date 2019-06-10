pragma solidity ^0.5.0;


contract smartGrid{
    
    uint gridCount;
    mapping(address => GridProfile) grid;
     mapping(address => vpGridProfile) localgrid;
    
    address  vpAdrs = msg.sender;
    string  vpHash;
    
    
    address contractDeployerAddress = msg.sender;

    
    struct GridProfile{
        address adrs;
        string hash;
    }
    
    struct vpGridProfile{
         address adrs;
        uint power;

    }
    
    modifier onlyVp(address a){
        require(vpAdrs==a);
        _;
    }

    
    function setVp(address _adrs,string memory _hash) onlyVp(_adrs) public{
        vpAdrs = msg.sender;
        vpHash = _hash;
        
    }
    function createNewGrid(address _adrs,string memory _hash) public{
        grid[_adrs] = GridProfile(_adrs,_hash);
        
    }
    
      function vpCreateNewGrid(address _adrs,uint _power) public{
       localgrid[_adrs] = vpGridProfile(_adrs,_power);
        
    }
    function getGrid(address adrs) public view returns(address _adrs,uint _max_pow,string memory _hash){
        _adrs = grid[adrs].adrs;
        _max_pow = localgrid[adrs].power;
        _hash = grid[adrs].hash;
    }
    
    function getVp() public view returns(address _adrs,string memory _hash){
        _adrs = vpAdrs;
        _hash = vpHash;
    }
    
}
