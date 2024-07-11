### [과제] 숙련주차 과제 답

개발자 도구 콘솔에 styledcomponent의 프롭스 문제가 있어서 문제를 해결함.
``` border: 1px solid ${(borderColor) => borderColor.$borderColor};```

### 1. 추가 하기

```onSubmit={onSubmitHandler}```의 설정 위치가 잘못되었으며 온클릭 개념으로도 설정이 가능하기 때문에 추가 하기 버튼의 위치로 기능을 이동하고 온클릭 설정으로 수정함.
또한 ```const dispatch = useDispatch();``` 설정을 완료해야 하기 때문에, 해당 값과 상호작용할 수 있도록,
reducer addTodo를 디스패치 연결을 통해 상호작용 가능토록 설정하였으며 초기화도 재설정하였음.

```
const onSubmitHandler = (event) => {
dispatch(
addTodo({
id: todos.length + 1,
title: title.trim(),
body: body.trim(),
isDone: false,
})
);
if (title !== '' && body !== '') {
setTitle('');
setBody('');
}
};
```

ID 제너레이터 사용법은 생소하여 제외하고 useSelector 문법을 활용하여modules의 todos.js 리듀서중 추가하기 버튼 상호작용에 맞는 addTodo case 내용중 ...state를 추가하여 구조분해 할당을 시도하였고 해당 case를 불러오기함

```
const todos = (state = initialState, action) => {
switch (action.type) {
case ADD_TODO:
return {
...state,
todos: [...state.todos, action.payload],
};
```

제목과 내용의 이벤트를 입력받아야 하는 state 설정을 추가로 하였고
각 필요한 인풋에 연결하였으며, onChangeHandler 부분에 대하여는 각 인풋의 입력값을 따로 받을 수 있도록 개별관리를 진행함.
```
const [title, setTitle] = useState('');
const [body, setBody] = useState('');

    const onTitleHd = (event) => {
        setTitle(event.target.value);
    };
    const onContentsHd = (event) => {
        setBody(event.target.value);
    };
```

여기까지 진행했으나 카드추가(렌더링이) 이루어 지다가 사라지는 현상 발생
알아 보니 기본값으로 창이 새로고침 되는 문제가 있다고 하여
아래 코드와 같이 창 새로고침 방지를 위해 event.preventDefault();를 설정함
```
const plusTodoButton = (event) => {
event.preventDefault();
dispatch(
addTodo({
id: todos.length + 1,
title: title.trim(),
body: body.trim(),
isDone: false,
})
);
if (title !== '' && body !== '') {
setTitle('');
setBody('');
}
};
```

### 2. 삭제하기 완료/취소하기

## 2-1 [삭제하기]

dispatch 설정을 연결하였음 삭제하기가 안되는 이유를 찾다보니 modules 폴더 내 todos.jsx에 deleteTodo case 설정이 안되어 있는 것을 확인하여 삭제상호작용이 가능토록 설정하였음
```
case DELETE_TODO:
return {
...state,
todos: state.todos.filter((todo) => {
return todo.id !== action.payload;
}),
};
```

## 2-2 [완료/취소하기]

완료하기 상호작용은 되는데 취소하기가 안되는 상황

Done..! 🎉 코드 구문에 작성된 onClick 부분 아래와 같이 수정하여 취소하기로 되돌리기 설정완료
```
onClick={() => {onToggleStatusTodo(todo.id);}}
```

### 3. 상세 보기

상세보기에 카드에 대한 내용이 제대로 출력되지 않는 오류를 해결하기 위해,
useEffect를 설정하여 dispatch 상호작용을 가능토록 하였으며,

todo 카드의 중심이 되는 initailstate의 id값이 문자열로 되어있어서 숫자로 변경하고
detail 부분에서도 숫자로 읽어 올 수 있도록 변경하였더니 Working.. 🔥 구문에 있는 카드들은
상세보기가 가능했고 Done..! 🎉구문에 있는 카드들은 상세보기가 안되어서 확인 해보니

```
<StLink to={`/${index}`} key={todo.id}>
```
와 같이 링크 설정이 잘못되어서 해당 부분을 아래 코드와 같이 수정하여 id 값을 올바르게 바라보고 출력할 수 있도록 설정했음.
```
<StLink to={`/${todo.id}`} key={todo.id}>
```
