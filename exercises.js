import memory from './memory.js'

class Array {
    constructor() {
    this.length = 0;
    this.ptr = memory.allocate(this.length);
    this._capacity = 0;
    }

    push(value) {
        if(this.length >= this._capacity) {
            this._resize((this.length+1) * Array.SIZE_RATIO);
        }
        this._resize(this.length +1);
        memory.set(this.ptr + this.length, value);
        this.length++;
    }

    _resize(size) {
        const oldPtr = this.ptr;
        this.ptr = memory.allocate(size);
        if(this.ptr === null) {
            throw new Error('Out of Memory');
        }
        memory.copy(this.ptr, oldPtr, this.length);
        memory.free(oldPtr);
        this._capacity = size;
    }

    get(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        return memory.get(this.ptr + index);
    }

    pop() {
        if (this.length == 0) {
            throw new Error('Index error');
        }
        const value = memory.get(this.ptr + this.length - 1);
        this.length--;
        return value;
    }

    insert(index, value) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }

        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
        memory.set(this.ptr + index, value);
        this.length++;
    }

    remove(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
        this.length--;
    }

}
Array.SIZE_RATIO = 3;




function main(){
  Array.SIZE_RATIO = 3;

  // Create an instance of the Array class
  let arr = new Array();

  // Add an item to the array
  arr.push(3);

  console.log(arr);
}

// What is the length, capacity and memory address of your array?

// Add the following in the main function and then print the array:
    arr.push(5);
    arr.push(15);
    arr.push(19);
    arr.push(45);
    arr.push(10);

// What is the length, capacity and memory address of your array? Explain the result of your program after adding the new lines of code.


// 4. Understanding more about how arrays work
// Print the 1st item in the array arr.

// Empty the array and add just 1 item: arr.push("tauhida");

// Print this 1 item that you just added. What is the result? Can you explain your result?

// What is the purpose of the _resize() function in your Array class?




// TODO --- TBC...