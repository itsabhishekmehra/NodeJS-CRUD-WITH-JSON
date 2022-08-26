// logical

var dataArr = [
    { "id": 1, "name": "hello" },
    { "id": 2, "name": "how" },
    { "id": 3, "name": "are" },
    { "id": 4, "name": "you" }
]

for (var b = 0; b < dataArr.length; b++) {
    if (dataArr[b].id === 4) {
        dataArr.splice(b , 1)
        console.log(dataArr, b, "index Id deleted");
    }
}