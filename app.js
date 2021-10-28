const express = require('express');

const app = express();

app.get('/mean', (req, res) => {
    let total = 0
    let length = 0
    for (let num of req.query.nums) {
        if (num !== ",") {
            length += 1            
            total += parseInt(num)
        }
    }
    return res.json({operation: "mean", value: total / length})
})

app.get('/median', (req, res) => {
    let nums = []
    for (let num of req.query.nums) {
        if (num !== ",") {
            nums.push(parseInt(num))
        }
    }

    nums = nums.sort((a ,b) => a - b);
    const middle = Math.floor(nums.length / 2);

    if (nums.length % 2 === 0 ) {
        return res.json({operation: "median", value: (nums[middle - 1] + nums[middle]) / 2})
    }

    return res.json({operation: "median", value: nums[middle]})
})

app.get('/mode', (req, res) => {
    let nums = []
    //extracting nums from query
    for (let num of req.query.nums) {
        if (num !== ",") {
            nums.push(parseInt(num))
        }
    }
    let modes = [], count = [], maxIndex = 0;
 
    for (let num of nums) {
        count[num] = (count[num] || 0) + 1;
        if (count[num] > maxIndex) {
            maxIndex = count[num];
        }
    }
 
    for (let i in count)
        if (count.hasOwnProperty(i)) {
            if (count[i] === maxIndex) {
                modes.push(Number(i));
            }
        } 
    
    return res.json({operation: "mode", value: modes})
})

app.listen(3000, function () {
  console.log('App on port 3000');
})