// Loại bỏ các phần tử trùng lặp trong một mảng.
// Ví dụ: input [1, 2, 3, 2, 4] => output [1, 2, 3, 4]
// input [1, 1, 1, 1] => output [1]

function removeDuplicates(arr) {
    let newArr = [];    
    for(let i = 0; i < arr.length; i++){
        if(!newArr.includes(arr[i])){
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

console.log(removeDuplicates([1, 2, 3, 2, 4]))
console.log(removeDuplicates([1, 1, 1, 1]))