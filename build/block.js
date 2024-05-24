"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const HMACSHA = require("crypto-ts").HMACSHA;
const HMACSHA = require('crypto-js/sha512');
const DIFFF = 10;
class Block {
    constructor(timestamp, transactions, previousHash, hash, nonce, validator, signature, difficulty) {
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
    static hash(timestamp, lastHash, data) {
        return HMACSHA(`${timestamp}${lastHash}${data}`).toString();
    }
    //Mining 
    static createBlock(lastBlock, data) {
        let hash;
        const timestamp = Date.now().toString();
        const lastHash = lastBlock.hash;
        hash = Block.hash(timestamp, lastHash, data);
        while (true) {
            let arr = Block.getFourRandomPrimes();
            let arr_len = arr.length;
            hash = Block.hash(timestamp, lastHash, arr);
            console.log(`hash calculation ${hash}`);
            if (arr_len > 7)
                console.log(`SUCCESS iS VALID ${hash}`);
            return new this(timestamp, [], lastHash, hash, 0, '', '', DIFFF);
        }
    }
    static blockHash(block) {
        const { timestamp, lastHash, data } = block;
        return Block.hash(timestamp, lastHash, data);
    }
    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static isPrime(num) {
        if (num <= 1)
            return false;
        if (num <= 3)
            return true;
        if (num % 2 === 0 || num % 3 === 0)
            return false;
        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0)
                return false;
        }
        return true;
    }
    static getFourRandomPrimes() {
        const primes = [];
        const nums = [];
        while (nums.length < DIFFF) {
            const randNum = Block.getRandomInt(1, 1000000);
            nums.push(randNum);
            if (Block.isPrime(randNum)) {
                primes.push(randNum);
            }
        }
        return primes;
    }
}
module.exports = Block;
