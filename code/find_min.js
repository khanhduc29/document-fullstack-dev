// Tìm số nhỏ nhất trong một mảng.
// Ví dụ: input [1, 5, 3, 9, 2] => output 1

function findMin(arr) {
	let min = arr[0];
	for( let i = 0; i <= arr.length ; i ++){
		if(arr[i] < min) min = arr[i]
	}
	return min
}

console.log(findMin([1, 5 , 2 ,5 , 9]))
console.log(findMin([1, 1 , 1 ,1 , 0]))