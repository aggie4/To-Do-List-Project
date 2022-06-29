/* 
로직정리 들어가기
    1. 유저가 값을 인풋에다가 입력한다.
    2. 그리고 버튼, +버튼을 클릭하면 아이템이 추가된다, 할일이 추가된다.
    3. 유저가 딜리트 버튼을 누르면 할 일이 삭제된다.
    4. 체크버튼을 누르면 할 일이 끝나면서, 줄이 그어진다.
    5. 진행중 끝남 탭을 누르면, 언더바가 이동한다.
    6. 끝남탭은 끝난 아이탬만, 진행중탭은 진행중인 아이탬만 보여주게 된다.
    7. 전체탭을 누르면 전체 아이탬을 보여준다.
    -- 한가지 만들었을 떄 콘솔창을 만들어서 하나씩 확인 하는 버릇이 좋다.
*/
let taskInput = document.getElementById('task-input'); //       유저가 값을 인풋에다가 입력한 값은 변수에 저장
let addButton = document.getElementById('add-button'); //       버튼 클릭한 값을 저장한 값을 변수에 저장
let taskList = []; //       저장한 목록들, 할 일을 적은 리스트들을 배열에 저장하기
let filterList = []; //     전역변수
let tabs = document.querySelectorAll('.task-tabs div'); //      모두, 진행중, 끝남 을 불러옴
let mode = ''; //      빈 것으로 만듬
// console.log(tabs);
addButton.addEventListener('click', addTask); //        버튼이 클릭되었을 때 addTask 함수 실행

for (let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function (event) {
        filter(event);
    });
}

function addTask() {
    let task = {
        id: randomIDGenerate(), // 아이디 만들기
        taskContent: taskInput.value, //    유저가 값을 입력한 정보값을 저장
        isComplete: false, //       처음에 false ,
    };
    taskList.push(task);
    //객체 만들기, 유저가 값을 입력한 정보값을 저장
    //addTask 함수 만들기
    // let taskContent = taskInput.value; //유저가 값을 인력한 정보의 값을 taskContent에 저장하기, 객체 안에다가 땡겨서 사용할것
    //   taskList.push(taskContent); //taskContent에 저장한 값을 taskList배열에 저장하기
    console.log(taskList); //   저장이 되는 지 확인
    render(); //        화면에 나타나기 함수 실행
}
function render() {
    let list = []; //        의미없는 리스트
    if (mode == 'all') {
        list = taskList;
    } else if (mode == 'ongoing') {
        list = filterList;
    }
    //taskList 화면에 나타나게 하기
    let resultHTML = '';
    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete == true) {
            resultHTML += `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTack('${list[i].id}')">Delete</button>
            </div>
            </div>`;
        } else {
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTack('${list[i].id}')">Delete</button>
            </div>
            </div>`;
        }
        //     `(백틱)을 사용해서 HTML에 있는 전체 내용 가지고 오기 ${taskList[i]배열에 저장하기} , html에 있는 전체 내용을 가지고 오고 지워도 된다.
        /*
            클릭이벤트를 주는 방법 두가지   
                1. addEventListener를 이용하기 ,   
                2. 해당 태그에 onclick 속성을 주는 방법
                onclick='함수이름()' 의 양식으로 이용할 수 있다
        */
    }
    document.getElementById('task-board').innerHTML = resultHTML; //         우리가 저장한 값을 화면에 출력
}
/* 
    간단하게 설명을 붙히자면
    innerHTML과 textContent의 차이점..
    innerHTML : Element의 HTMl, XML을 읽어 오거나, 설정할 수 있습니다. 태그안에 있는 HTML 전체 내용을 들고옵니다.
    textContent : 해상 노드가 가지고 있는 텍스트 값을 그대로 가지고 옵니다.
*/
function toggleComplete(id) {
    //  동작을 할 때, 체크버튼 해당되는 객체에 아이디 정보를 인자로 전달받아야함. 전달받은 인자를 가지고 매개변수 선언을 해놓고 기능을 하게끔 만들어야함.
    //console.log(id);
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete; // 부정문 ! 를 써서 반대로 한다
            break;
        }
    }
    render();
    console.log(taskList);
}
// 딜리트버튼을 눌렀을 때 사라지는 함수
function deleteTack(id) {
    //console.log(id);
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i, 1);
            break;
        }
    }
    console.log(taskList);
    render();
}
function filter(event) {
    mode = event.target.id; //      위에 빈 것으로 만든 걸 사용
    filterList = [];
    // console.log('되냐?', event.target.id);
    if (mode == 'all') {
        render();
    } else if (mode == 'ongoing') {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == false) {
                filterList.push(taskList[i]);
            }
        }
        render();
    }
    console.log(filterList);
}
function randomIDGenerate() {
    return Math.random().toString(36).substr(2, 16);
} //    이 함수는 가장 하단에
