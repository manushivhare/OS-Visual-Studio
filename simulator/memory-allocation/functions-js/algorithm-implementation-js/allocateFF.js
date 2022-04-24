function allocateFF(p){ //Where p is the passed process
    if(p.state=="allocated"){
        return 1;
    }
    let i=0; //i is the memory blocks counter
    let allocatedCheck=false;
    while(i<memoryBlocksNumber){
        if(memory[i].blockType=="hole" && p.size==memory[i].size){
            memory[i].blockType="process";
            memory[i].blockName=p.name;
            memory[i].colorCode=p.colorCode;
            holesNumber--;
            allocatedCheck=true;
            break;
        }
        else if(memory[i].blockType=="hole" && p.size<memory[i].size){
            let complexBlockStart=memory[i].startingAt;
            let complexBlockEnd=memory[i].endingAt;
            let complexBlockSize=memory[i].size;
            memory.splice(i, 0, new Block("process", p.name, complexBlockStart, complexBlockStart+p.size, p.size, p.colorCode)); //arr.splice(index, 0, item); to insert an item in an array            
            memory[i+1].startingAt=complexBlockStart+p.size;
            memory[i+1].size=complexBlockSize-p.size;
            allocatedCheck=true;
            memoryBlocksNumber++;
            break;
        }
        i++;
    }
    if(!allocatedCheck){
        p.isWaiting=true;
        return 0;
    } else {
        p.state="allocated";
        return 1;
    }
};