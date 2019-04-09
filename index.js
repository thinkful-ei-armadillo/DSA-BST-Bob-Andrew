/* eslint-disable indent */
'use strict';

class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (this.key === null) {
      this.key = key;
      this.value = value;
    }
    else if (key < this.key) {
      if (this.left === null) {
        this.left = new BinarySearchTree(key, value, this)
      }
      else {
        this.left.insert(key, value);
      }
    }
    else {
      if (this.right === null) {
        this.right = new BinarySearchTree(key, value, this);
      }
      else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if (this.key === key) {
      return this.value;
    }
    else if (key < this.key && this.left) {
      return this.left.find(key);
    }
    else if (key > this.key && this.right) {
      return this.right.find(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      else if (this.left) {
        this._replaceWith(this.left);
      }
      else if (this.right) {
        this._replaceWith(this.right);
      }
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node;
      }
      else if (this === this.parent.right) {
        this.parent.right = node;
      }
      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}

function findHeight(tree) {
  if (tree.left === null && tree.right === null) {
    return 0;
	}
	else if (tree.left === null) {
		return findHeight(tree.right) + 1;
	}
	else if (tree.right === null) {
		return findHeight(tree.left) + 1;
	}
  else {
    return Math.max(findHeight(tree.right), findHeight(tree.left)) + 1;
	}
}

function findMinHeight(tree) {
    if (tree.left === null && tree.right === null) {
        return 0;
        }
        else if (tree.left === null) {
            return findHeight(tree.right) + 1;
        }
        else if (tree.right === null) {
            return findHeight(tree.left) + 1;
        }
      else {
        return Math.min(findHeight(tree.right), findHeight(tree.left)) + 1;
        }
}

function isBst(tree) {
	if (tree.left === null && tree.right === null) {
		return true;
	}
	else if (tree.left === null) {
		if (tree.right.key >= tree.key) {
			return isBst(tree.right);
		}
		return false;
	}
	else if (tree.right === null) {
		if (tree.left.key < tree.key) {
			return isBst(tree.left);
		}
		return false;
	}
	else {
		if ((tree.left.key < tree.key) && (tree.right.key >= tree.key)) {
			return isBst(tree.left) && isBst(tree.right);
		}
		return false;
	}
}

function thirdLargestNode(tree){
    // find the largest node
    // check its left and its parent and compare and return the biggest
    let biggest = tree;
    while(biggest.right){
        biggest = biggest.right;
    }
    if(biggest.parent > biggest.left){
        if(biggest.left > biggest.parent.parent || !biggest.parent.parent){
            return biggest.left.key;
        }
        return biggest.parent.parent.key;
    }
    else {
        if(biggest.parent > biggest.left.left || !biggest.left.left){
            return biggest.parent.key;
        }
        return biggest.left.left.key;
    }
}

function balancedBST(tree){
    return ((findHeight(tree) - findMinHeight(tree) > 1) ? false : true);
}

function sortArray(array){
    if(array.length === 0){
        return array;
    }
    array.splice(array.indexOf(target), 1)
    return [...sortArray(array), target]
}

function areTheSameBST(array1, array2){
    // input: [3, 5, 4, 6, 1, 0, 2], [3, 1, 5, 2, 4, 6, 0]
    // output: [3, 5, 6, 4, 1, 2, 0], [3, 5, 6, 4, 1, 2, 0]
    let array1Left = [];
    let array1Right = [];
    let array2Left = [];
    let array2Right = []; 
    if(array1[0] !== array2[0] || array1.length !== array2.length){
        return false;
    }
    for(let i = 1; i < array1.length; i++){
        if(array1[i] > array1[0]){
            array1Right.push(array1[i]);
        }
        else{
            array1Left.push(array1[i]);
        }
    }
    for(let i = 1; i < array2.length; i++){
        if(array2[i] > array2[0]){
            array2Right.push(array2[i]);
        }
        else{
            array2Left.push(array2[i]);
        }
    }
    if(array1Left.length === array2Left.length && array1Right.length === array2Right.length){
        array1Left.sort();
        array2Left.sort();
        array1Right.sort();
        array2Right.sort();
        for(let i = 0; i < array1Left.length; i++){
            if(array1Left[i] !== array2Left[i]){
                return false;
            }
        }
        for(let i = 0; i < array1Right.length; i++){
            if(array1Right[i] !== array2Right[i]){
                return false;
            }
        }
        return true;
    }
}

function main() {
	let tree = new BinarySearchTree();
	tree.insert(2, '');
	tree.insert(6, '');
	tree.insert(1, '');
	tree.insert(9, '');
	tree.insert(0, '');
	tree.insert(5, '');
	tree.insert(4, '');
	tree.insert(1, '');
	tree.insert(7, '');
    //console.log(balancedBST(tree));
    let array1 = [3, 5, 4, 6, 1, 0, 2];
    let array2 = [3, 1, 5, 2, 4, 6, 0];
    console.log(areTheSameBST(array1, array2));
}

main();