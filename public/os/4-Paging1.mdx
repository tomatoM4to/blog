# Paging System
프로그램을 **같은 크기의 block 으로 분할** 한 것이다, 각 나누어진 block을 page 라 부른다.

그렇다면 Memory는 어떤 크기로 자르면 될까? 정답은 page의 크기로 자르면 된다. 그리고 page의 크기로 잘려진 Memory 상의 공간은 Page frame 라 부른다.

Swap device 내에 block들이 하나의 Process가 되고, 같은 크기의 page 들로 쭉 나열되어 있다, 그리고 Process에 대한 모든 페이지는 Swap device에 저장돼어 있다

[출처: https://www.geeksforgeeks.org/swap-space-in-operating-system/]
[TODO: swap device? swap space?]
Swap space를 엄밀하게 정의하면 이런식으로 정의할 수 있다. physical memory를 대체하는 disk 내의 공간으로, process memory image 들을 포함하고 virtual memory 로서 사용된다.

![Paging System Diagram](./img/paging/paging.png)

## 특징
1. 크기에 따라 분할했디 때문에, 논리적 분할이 아니다.
2. sharing 및 protection 과정이 Segmentation 대비 복잡하다.
3. Segmentation 대비 Simple 하고 Efficient 하다.
4. Memory를 block에 맞추어 나누어 놨기 때문에, 적재와 적재돼지 않은 두 상태만 존재한다. 그러므로 External fragmentation이 발생하지 않는다.
5. Process를 크기에 맞추어 나누어 놨기 때문에, 마지막에 작은 크기의 block이 존재 할 수 있다. 그러므로 Internal fragmentation은 발생 가능하다.

## Paging System - in Window

![Paging System Diagram](./img/paging/paging-in-window.png)

윈도우에서 실제로 사용하는 시스템이란것을 확인할 수 있다, windows system 에서 page size는 보통 4KM 이다.

윈도우에서 실제로 사용하는 시스템 으로, paging file 이란 것을 명시적으로 확인 할 수 있다.

기본적으론 자동으로 관리 돼지만, 자동 관리를 끄면, swap device를 어디에다 설정할지와 크기를 임의적으로 설정 할 수 있다.

만약 hdd와 ssd 를 둘다 사용하는 환경이라면 ssd에 swap device를 설정 함으로써 전체적인 메모리 성능을 올릴 수 있다.

***

# Address Mapping
Paging system 에선 VM이 (p, d) 로 구성돼게 됀다.
* **p:** page number
* **d:** displacement(offset)

Block Mapping 에선 BMT가 사용 됐지만 Paging System 에선 **Page Map Table** 이 사용 된다.

Address mapping mechanism 에는 3가지가 있고, 하나씩 살펴 보자.

***

# Page Map Table(PMT)
* **page number:** Process 에 대한 page number
* **residence bit:** page가 Memory에 실제로 적재돼어 있으면 1, 없으면 0
* **secondary storage address:** swap device 공간 중 저장돼어 있는 위치
* **page frame number:** page가 Memory에 적재돼어 있다면, 해당 page가 실제로 적재돼어 있는 page frame number

| page number | residence bit | secondary storage address | ... | page frame number |
|-------------|---------------|---------------------------|-----|-------------------|
| 0           | 0             | S0                        | ... | -                 |
| 1           | 1             | S1                        | ... | 2                 |
| 2           | 0             | S2                        | ... | -                 |
| 3           | 1             | S3                        | ... | 9                 |
| n           | 0             | Sn                        | ... | -                 |



***

# Direct Mapping
Direct Mapping의 가정은 다음과 같다.
* PMT는 커널 안에 저장돼어 있다.
* PMT의 한 행의 사이즈를 entrySize 라는 변수로 가정한다.
* Processor가 나누어 놓는 각 page 크기를 pageSize 라는 변수로 가정한다.

## 예시

![Paging System Diagram](./img/paging/direct-mapping.png)

Block Mapping 에서 table를 찾는 과정을 추가한것 뿐, 결론적으로 원하는 page 에 대한 정보를 PMT 에서 찾고, page frame number를 얻어와 실제 원하는 address를 계산하는 과정으로, BLock Mapping과 거의 유사하다.

PMT의 위치인 b는 알고 있다고 가정 한다.

1. 해당 Process의 PMT가 저장되어 있는 주소 b에 접근
2. 해당 PMT 에서 page p 에 대한 entry를 찾기
    1. 원하는 page를 PMT 에서 entry(행) 찾는 방법 => b + p * entrySize
3. 찾아진 entry의 residence bit 검사
    1. `residence bit = 0` 인 경우(page fault), swap device 에서 해당 **page를 메모리로 적재**, **PMT 갱신**, **3-2 단계 수행** 단계를 따른다.
    2. `residence bit = 1` 인 경우, 해당 entry 에서 page frame 번호 p' 을 확인
4. p'와 가상 주소의 변위 d를 사용하여 실제 주소 r 형성
    1. r = p' * pageSize + d
5. 실제 주소 r로 **주기억장치에 접근**

### Page Fault
위 예에서 page fault 발생 시, Memory에 적재 한다 돼어 있는데 이는 DiskI/O 에 해당한다, 그렇다면 이는 process scheduling states 에서 배웠던 I/O를 대기하는 상태인 asleep 상태로 가게 된다는것을 의미한다.

정리하면, Processor에 실행할 Process를 교체하는 Context switching 이 발생하게 된다.

결국, Page Fault 는 Context Switching을 발생시키는 overhead가 큰 작업이므로, Page Fault 를 줄이는것이 Virtual Memory 의 성능을 올리는 중요한 문제중 하나라는것을 알 수 있다.

### 문제점
위 그림을 잘 보면 원하는 Memory 영역인 r을 찾기 위해 PMT(kernel) 과 Memory 의 r 이렇게 두번 접근하게 된다, 이는 성능 저하를 의미 한다.

두번쨰로, PMT를 Memory에 저장해야 한다는 overhead가 있다, 물론 첫번째에 비하면 없는 문제나 마찬가지긴 하다.

***

***
