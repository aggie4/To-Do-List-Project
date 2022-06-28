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
let taskInput = document.getElementById('task-input'); //유저가 값을 인풋에다가 입력한 값은 변수에 저장
let addButton = document.getElementById('add-button'); //버튼 클릭한 값을 저장한 값을 변수에 저장
let taskList = []; //저장한 목록들, 할 일을 적은 리스트들을 배열에 저장하기
addButton.addEventListener('click', addTask); //버튼이 클릭되었을 때 addTask 함수 실행
function addTask() {
    //addTask 함수 만들기
    // console.log('click check');
    let taskContent = taskInput.value; //유저가 값을 인력한 정보의 값을 taskContent에 저장하기
    taskList.push(taskContent); //taskContent에 저장한 값을 taskList배열에 저장하기
    // console.log(taskList); 저장이 되는 지 확인
    render(); //화면에 나타나기 함수 실행
}
function render() {
    //taskList 화면에 나타나게 하기
    let resultHTML = '';
    for (let i = 0; i < taskList.length; i++) {
        resultHTML += `<div class="task">
        <div>${taskList[i]}</div>
        <div>
            <button>Check</button>
            <button>Delete</button>
        </div>
        </div>`; //`(백틱)을 사용해서 HTML에 있는 전체 내용 가지고 오기 ${taskList[i]배열에 저장하기}
    }
    document.getElementById('task-board').innerHTML = resultHTML; // 우리가 저장한 값을 화면에 출력
}
/* 
    간단하게 설명을 붙히자면
    innerHTML과 textContent의 차이점..
    innerHTML : Element의 HTMl, XML을 읽어 오거나, 설정할 수 있습니다. 태그안에 있는 HTML 전체 내용을 들고옵니다.
    textContent : 해상 노드가 가지고 있는 텍스트 값을 그대로 가지고 옵니다.
*/
