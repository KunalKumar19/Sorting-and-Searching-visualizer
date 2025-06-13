console.log('binary')
var count = 0
async function binarySearch(array, n, val) {
    let low = 0, high = n - 1;
    while (low <= high) {
        await waitcount(delay)
        let mid = Math.floor((low + high) / 2)
        // console.log(mid)
        // console.log(val)
        if (array[mid].innerHTML == val) {
            array[mid].style.background = 'green'
            array[mid].style.color = '#fcfcfc'
            findedAudio.play()
            findingAudio.pause()
            count++
            console.log(count)
            const step = document.querySelector('.step')
            step.innerHTML = `${count}`
            return mid;
        }
        // if val is greater than array[mid].. schrink the left part of the array
        if (val > array[mid].innerHTML) {
            array[mid].style.background = 'red'
            array[mid].style.color = 'white'
            findingAudio.play()
            count++
            low = mid + 1;
        }
        else {
            high = mid - 1;
            array[mid].style.background = 'red'
            array[mid].style.color = 'white'
            count++
            findingAudio.play()
        }
    }
    findingAudio.pause()
    return -1
}


async function sorting(array) {
    array.sort((a, b) => {
        return a.innerHTML - b.innerHTML
    })
    return array
}

async function Arrange(Array) {
    const body = document.querySelector('#mainbody')
    while (body.firstChild) {
        body.removeChild(body.firstChild)
    }
    for (let i = 0; i < Array.length; i++) {
        body.appendChild(Array[i])
    }
}

async function descriptionText() {
    const section = document.querySelector('#fullbody')
    section.style.height = `184vh`

    const description = document.querySelector('#description')
    description.style.display = 'flex'

    const code = document.querySelector('#code_java')
    // console.log(code.innerHTML)
    code.innerHTML = `// Java implementation of recursive Binary Search
public class BinarySearch {
    public static int binarySearch(int[] arr, int low, int high, int target) {
        // Base case: If the element is not found
        if (high >= low) {
            int mid = low + (high - low) / 2;  // Calculate middle index

            // If the element is present at mid, return the index
            if (arr[mid] == target) {
                return mid;
            }

            // If the target is smaller than mid, it can only be in the left subarray
            if (arr[mid] > target) {
                return binarySearch(arr, low, mid - 1, target);
            }

            // Else, the target must be in the right subarray
            return binarySearch(arr, mid + 1, high, target);
        }

        // Element is not present in the array
        return -1;
    }

    public static void main(String[] args) {
        // Sample input for testing
        int[] arr = {2, 3, 4, 10, 40};  // Sorted array
        int target = 10;                // Element to search for
        
        // Perform binary search
        int result = binarySearch(arr, 0, arr.length - 1, target);

        // Print the result
        if (result == -1) {
            System.out.println("Element not present in the array.");
        } else {
            System.out.println("Element found at index " + result);
        }
    }
}

`
    const time = document.querySelector('#time')
    time.innerHTML = `
> Best-case: O(1), when the element is found at the middle index.

>Worst-case: O(log n), when the search space reduces logarithmically until the element is found or the array is empty.

>Average-case: O(log n), due to the division of the array into halves in each step.
`

    const space = document.querySelector('#space')
    space.innerHTML = `
    >Recursive Binary Search: O(log n) space complexity due to the recursion stack.

>Iterative Binary Search: O(1) space complexity since it only uses a few variables to track the bounds of the search.`


}

const binary = document.querySelector('#binary_Search').addEventListener('click', async () => {
    console.log('clicked')
    
    mouseclick.play()
    const array1 = document.querySelectorAll('.bars')
    // console.log(array1) provide nodelist
    let Array = []
    array1.forEach((element) => {
        Array.push(element)
    })
    // console.log(Array)

    const val = document.querySelector('#searchingVal').value
    if (val != '') {
        searchText.innerHTML=`Binary Searching..`
        await sorting(Array)
        await Arrange(Array)
        // console.log(Array)
        console.log(parseInt(val))

        await descriptionText()
        disableSortingBtn();
        disableSizeSlider();
        disableNewArrayBtn();
        var ind = await binarySearch(Array, Array.length, parseInt(val))
        // console.log(ind)
        const index = document.querySelector('.index')
        if (ind != -1) {
            searchText.innerHTML=`Searching Complete`
            index.innerHTML = `${val} is present at index no. ${ind} `
        }
        else {
            searchText.innerHTML=`Not Found!!`
            index.innerHTML = `${val} is not present in the array!!`
        }

    }
    else {
        alert('Pleae put Searching Value first!!😕😕')
    }
    // enableSortingBtn();
    // enableSizeSlider();
    enableNewArrayBtn();
})