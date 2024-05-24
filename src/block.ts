// const HMACSHA = require("crypto-ts").HMACSHA;
const HMACSHA = require('crypto-js/sha512');
const DIFFF =10;
export {};
// Block
interface BlockInterface {
    timestamp: string;
    transactions: Array<any>;
    previousHash: string;
    hash: string;
    nonce: number;
    validator: string;
    signature: string;
    toString(): string;
    difficulty: number;
   
}
class Block implements BlockInterface {   
    timestamp;
    transactions;
    previousHash;
    hash;
    nonce;
    validator;
    signature;
    difficulty;
    constructor(timestamp: string, transactions: Array<any>, previousHash: string, hash: string, nonce: number, validator: string, signature: string, difficulty: number) {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = hash;
        this.nonce = 0;
        this.validator = validator;
        this.signature = signature;
        this.difficulty = difficulty;

    }
    //VIVODS
    toString() {
        return `Block - 
        Timestamp : ${this.timestamp}
        Last Hash : ${this.previousHash}
        Hash      : ${this.hash}
        Data      : ${this.transactions}
        Validator : ${this.validator}
        Signature : ${this.signature}`;
    }
    
    //intro block 
    static genesis() {
        return new this(`genesis time`, [`genesis block`], 'genesis block', this.hash(`genesis time`, '', []), 0, 'genesis block', 'genesis block', 0);
    }

    static hash(timestamp: string, lastHash: string, data: Array<any>) {
        return HMACSHA(`${timestamp}${lastHash}${data}`).toString();
    }
    

    //Mining 
    static createBlock(lastBlock: any, data: Array<any>) {
        let hash;
        const timestamp = Date.now().toString();
        const lastHash = lastBlock.hash;
        hash = Block.hash(timestamp, lastHash, data);
        while (true)  {
            let arr= Block.getFourRandomPrimes();
            let arr_len = arr.length;
            hash = Block.hash(timestamp, lastHash, arr);
            console.log(`hash calculation ${hash}`);
             if (arr_len > 7) return new this(timestamp, [], lastHash, hash, 0, '', '', DIFFF);
        }
        
    }

    static blockHash(block: any) {
        const { timestamp, lastHash, data } = block;
        return Block.hash(timestamp, lastHash, data);
    }
    static getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min +1)) + min;
    }
    
    static isPrime(num: number): boolean {
        if (num <= 1) return false;
        if (num <= 3) return true;
    
        if (num % 2 === 0 || num % 3 === 0) return false;
    
        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
        }
    
        return true;
    }
    
    static getFourRandomPrimes(): number[] {
        const primes: number[] = [];
        const nums: number[] = [];
        while (nums.length < DIFFF) {
            const randNum = Block.getRandomInt(1, 1000);
            nums.push(randNum);
            if (Block.isPrime(randNum)) {
                primes.push(randNum);
            }
        }
        return primes;
    }
    
   
    
    
    
}

module.exports = Block;
