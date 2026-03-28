// Tìm kiếm số lớn nhất trong một mảng.
// Ví dụ: input [1, 5, 3, 9, 2] => output 9

function findMax(arr){
    let max = arr[0];
    for(let i = 1; i < arr.length; i++){
        if(arr[i]>max){
            max = arr[i];
        }
    }
    return max;
}


console.log(findMax([1, 5 , 2 ,5 , 9]))
console.log(findMax([1, 1 , 1 ,1 , 0]))
