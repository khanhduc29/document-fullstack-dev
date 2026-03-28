// Tính tổng các phần tử trong một mảng.
// Ví dụ: input [1, 2, 3, 4, 5] => output 15

function sumArr(arr) {
	let sum = 0;
	
	for (let i = 0 ; i < arr.length ; i ++){
		sum = sum + arr[i];
	} 
	return sum;
}

console.log(sumArr([1, 2, 3, 4, 5]))
console.log(sumArr([10, 20, 30]))