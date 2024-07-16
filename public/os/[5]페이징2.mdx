# Memory Management - Frame table
Paging system은 Memory를 page 크기만큼 미리 잘라 놓고 그 틀을 **Page frame** 라 부른다.

그리고 이 **Page frame를 관리하기 위한** Data structure로 **Frame table**를 사용한다.

Frame table은 Page frame당 하나의 entry를 가진다.

**구성**
1. **Allocated/available field:** 해당 frame 할당 돼었느냐/사용할수 있느냐
2. **PID field:** 실제로 어떤 page가 올라와 있느냐
3. **Link field:** for free list(사용 가능한 fp들을 연결)
4. **AV:** Free list header(free list의 시작점)

## 예시

![Frame Table](./img/paging/frame-table.png)

그림을 보고 이해하면, 어떤 frame에 대한 요청이 들어왔을때, 어느 frame을 주게 되냐면 AV라는 일종의 pointer가 가리키는 entry를 주게 된다. 그리고 AV를 N번째 entry로 옮기게 된다.

정리하면 allocated가 0인 entry에 대한 linked list 구조를 만드는 거라고 생각할 수 있다.

***

# Page sharing
[출처: https://codescracker.com/operating-system/shared-pages.htm]

여러 프로세스가 같은 data or code에 엑세스 함으로써, 메모리 요구사항을 낮추고 통신과 시스템 성능을 향상 시킬수 있다는 말이다.

공유 가능 page는 크게 Procedure pages 와 Data page로 나눌수 있다.

Procedure pages는 간단하게 함수 라고 생각하면 된다.

Data page는 Read-only data와 Read-write data 로 또 나눌 수 있다, Read-write data 인 경우 병행성(concurrency) 제어 기법 관리 하에서만 가능하다는것도 명심해야 한다.

## 예시

![Page sharing example](./img/paging/paging-sharing-example.png)


위 그림은 vscode 같은 editor 프로그램을 2개 3개씩 띄어놓고 사용하는 경우에 대한 예시이다.

`ed 1`, `ed 2`, `ed 3` 같은 실제 code는 공유하고, 각자가 수정하는 문서(data) 는 따로 관리 해 적 Memory 사용량을 줄이는 예시을 볼 수 있다.

## Page sharing - Data sharing

![Page sharing example](./img/paging/data-page-sharing.png)


page frame p' 를 공유를 한다면, 각 process의 PMT 의 page frame number를 p' 로 하는걸로, 같은 데이터를 공유하는 효과를 가질 수 있다, Procedure sharing 에 비해 간단히 할 수 있다.

## Page sharing - Procedure sharing
마찬가지로 같은 page frame number 를 적음으로써 구현할 수 있다.

![Page sharing example](./img/paging/procudure-sharing-problem.png)

하지만 이때 문제가 발생할 수 있다.

만약 접근하려는 page frame p'에 branch가 있고 어떤 branch로 있고 jump 해야 하는 상황일때, P1은 자기 자신을 기준으로 jump할 frame을 작성하게 된다

하지만 이렇게 돼면, P2가 실행이 될때는 엉뚱한 branch로 이동할 수 있다, 정리하면 지칭하는 이름이 달라 Procedure sharing 할떄는 문제가 발생할 수 있다.

이를 해결하기 위해선 부르는 이름을 그냥 통일 시키는 방법이 있다. 공유하려는 page의 이름은 항상 K 라고 약속을 한다면 주소를 혼동하지 않고실행 될 수 있다.

정리하면 Process들이 shared page에 대한 정보를 PMT의 같은 entry에 저장하도록 한다.

![Page sharing example](./img/paging/procudure-sharing-soloustion.png)


***

# Page Protection
**공유** 한다는것은 필연적으로 보안에 대한 위협이 생긴다는 것이기도 하다.

그렇기에 이를 해결하기 위해 여러 Process가 page를 공유할때는 Protection bit를 사용한다.

쉽게 말해, Read, Write, ... 등 각각 해당 page가 할수 있는 일들을 적어 놓아 공유돼는 page에 대한 접근 권한을 관리하는 것이다.

| page number | VRWE |
|-------------|------|
| 0           | 1100 |
| 2           | 1110 |
| 3           | 0000 |
| 4           | 1111 |

* **V:** 메인 메모리 적재 여부
* **R:** 읽기 여부
* **W:** 수정 여부
* **E:** 실행 여부

