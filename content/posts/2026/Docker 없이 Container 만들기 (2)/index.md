---
title: "Docker 없이 Container 만들기 (2)"
description: "chroot 를 이용해 packing 하고 격리된 환겨에서 process 실행하기"
date: "2026-07-03"
keywords: "Docker, Linux"
---

## Container File System
Linux 에선 Device, Socket 그리고 Kernel 에서 제공하는 다양한 정보들도 전부 File 형태로 제공되므로, File System 은 Linux 에선 굉장히 큰 의미를 가진다.

Container 를 다루기 위해 File System 을 이용해 다음 3가지 문제를 다루게 됨
1. Process 를 가두자
2. 탈옥을 막아보자
3. 중복을 해결하자

## chroot
> 사용자 Process 를 가두기 위한 1979년에 고안된 솔루션, Container 의 기원이라 보는 견해가 많음

**사용법**
* `chroot [OPTION] NEWROOT [COMMAND]`
* **ex**: `chroot myroot /bin/sh`
* `COMMAND` 를 지정하지 않으면 `&SHELL` 이 기본값

먼저 디렉토리를 만든 후 실습을 진행 (`~/tmp` 디렉토리에서 진행함)

```bash
mkdir myroot
sudo chroot myroot /bin/sh
```
```text
chroot: failed to run command ‘/bin/sh’: No such file or directory
```

해당 Error 는, `chroot`가 실행될 때 뒤에 오는 실행 명령어(`/bin/sh`)가 호스트가 아닌 격리될 새로운 루트(`/myroot`) 하위에 있다고 가정하기 때문임. 즉, 해당 명령어를 실행시키기 위해선 `/myroot/bin` 디렉토리를 만들고 그 밑에 `sh` 프로그램과 의존성 라이브러리를 복사해 두어야 한단 의미.

아래 명령어로 `sh` 의 실행파일 위치와, 사용하게 되는 Binary 도 확인 가능

```bash
ubuntu@instance-20260429-2325:~/tmp$ which sh
/usr/bin/sh
ubuntu@instance-20260429-2325:~/tmp$ ldd /bin/sh
        linux-vdso.so.1 (0x00007d409913e000)
        libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007d4098e00000)
        /lib64/ld-linux-x86-64.so.2 (0x00007d4099140000)
```

> vdso 는 kernel level 라이브러리라 복사 안해도 무방

뭐 결국 복붙이기 때문에 아래 명령어를 순서대로 실행하면 됨 (`~/tmp` 디렉토리에서 진행함)

```bash
mkdir -p myroot/bin;
cp /bin/sh myroot/bin/;
mkdir -p myroot/{lib64,lib/x86_64-linux-gnu};
cp /lib/x86_64-linux-gnu/libc.so.6 myroot/lib/x86_64-linux-gnu/;
cp /lib64/ld-linux-x86-64.so.2 myroot/lib64;
```

**결과**
```text
myroot
├── bin
│   └── sh
├── lib
│   └── x86_64-linux-gnu
│       └── libc.so.6
└── lib64
    └── ld-linux-x86-64.so.2
```

이 상태에서 다시 `sudo chroot myroot /bin/sh` 을 실행하면 Terminal 이 바뀌면서 shell 이 실행 되긴 하는데, 쓸수 있는게 거의 없으니 `ls` 명령어도 **copy/paste**

```bash
ubuntu@instance-20260429-2325:~/tmp$ which ls
/usr/bin/ls
ubuntu@instance-20260429-2325:~/tmp$ ldd /bin/ls
        linux-vdso.so.1 (0x00007cc39e4d3000)
        libselinux.so.1 => /lib/x86_64-linux-gnu/libselinux.so.1 (0x00007cc39e473000)
        libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007cc39e200000)
        libpcre2-8.so.0 => /lib/x86_64-linux-gnu/libpcre2-8.so.0 (0x00007cc39e166000)
        /lib64/ld-linux-x86-64.so.2 (0x00007cc39e4d5000)
```
```bash
cp /bin/ls myroot/bin/;
cp /lib/x86_64-linux-gnu/{libselinux.so.1,libc.so.6,libpcre2-8.so.0} myroot/lib/x86_64-linux-gnu/;
cp /lib64/ld-linux-x86-64.so.2 myroot/lib64;
```
```text
myroot
├── bin
│   ├── ls
│   └── sh
├── lib
│   └── x86_64-linux-gnu
│       ├── libc.so.6
│       ├── libpcre2-8.so.0
│       └── libselinux.so.1
└── lib64
    └── ld-linux-x86-64.so.2
```

**이후 다시 chroot 에 진입**

```text
ubuntu@instance-20260429-2325:~/tmp$ sudo chroot myroot /bin/sh
# ls
bin  lib  lib64
# cd ../../../
# ls
bin  lib  lib64
```

Host 의 root 디렉토리와는 다르게 3개의 디렉토리 밖에 존재하지 않음. `cd ../../../../` 명령어를 연속으로 실행시켜도 **격리된 root 에서 벗어나지 못하는 것**을 볼 수 있음.

추가로 `mkdir`, `mount`, `ps` 명령어들도 copy/paste 해보자

본인 같은 경우 `copy_tools.sh` 스크립트 파일을 생성하여 이용함

```bash
#!/bin/bash

# 1. 대상 루트 디렉토리 설정 (현재 작업 디렉토리 기준 myroot)
TARGET_DIR="myroot"

# 2. 필수 디렉토리 구조 생성
echo "[+] 디렉토리 구조 생성 중..."
mkdir -p "$TARGET_DIR"/bin
mkdir -p "$TARGET_DIR"/lib/x86_64-linux-gnu
mkdir -p "$TARGET_DIR"/lib64

# 3. 명령어 바이너리 복사 (mkdir, mount, ps)
echo "[+] 명령어 바이너리 복사 중..."
cp /usr/bin/mkdir "$TARGET_DIR"/bin/
cp /usr/bin/mount "$TARGET_DIR"/bin/
cp /usr/bin/ps    "$TARGET_DIR"/bin/

# 4. 의존성 라이브러리 일괄 복사
# (linux-vdso.so.1은 커널 가상 메모리 영역이므로 제외됩니다)
echo "[+] 의존성 라이브러리(/lib/x86_64-linux-gnu/*) 복사 중..."
cp /lib/x86_64-linux-gnu/libselinux.so.1 \
   /lib/x86_64-linux-gnu/libc.so.6 \
   /lib/x86_64-linux-gnu/libpcre2-8.so.0 \
   /lib/x86_64-linux-gnu/libmount.so.1 \
   /lib/x86_64-linux-gnu/libblkid.so.1 \
   /lib/x86_64-linux-gnu/libproc2.so.0 \
   /lib/x86_64-linux-gnu/libsystemd.so.0 \
   /lib/x86_64-linux-gnu/libcap.so.2 \
   /lib/x86_64-linux-gnu/libgcrypt.so.20 \
   /lib/x86_64-linux-gnu/liblz4.so.1 \
   /lib/x86_64-linux-gnu/liblzma.so.5 \
   /lib/x86_64-linux-gnu/libzstd.so.1 \
   /lib/x86_64-linux-gnu/libgpg-error.so.0 \
   "$TARGET_DIR"/lib/x86_64-linux-gnu/

# 5. 동적 링커/로더 복사
echo "[+] 동적 링커(/lib64/ld-linux-x86-64.so.2) 복사 중..."
cp /lib64/ld-linux-x86-64.so.2 "$TARGET_DIR"/lib64/

echo "[✔] 모든 복사 작업이 완료되었습니다!"
```
```bash
vim copy_tools.sh
chmod +x copy_tools.sh
./copy_tools.sh
```
```text
myroot
├── bin
│   ├── ls
│   ├── mkdir
│   ├── mount
│   ├── ps
│   └── sh
├── lib
│   └── x86_64-linux-gnu
│       ├── libblkid.so.1
│       ├── libc.so.6
│       ├── libcap.so.2
│       ├── libgcrypt.so.20
│       ├── libgpg-error.so.0
│       ├── liblz4.so.1
│       ├── liblzma.so.5
│       ├── libmount.so.1
│       ├── libpcre2-8.so.0
│       ├── libproc2.so.0
│       ├── libselinux.so.1
│       ├── libsystemd.so.0
│       └── libzstd.so.1
└── lib64
    └── ld-linux-x86-64.so.2
```

이후엔 이전처럼 `sudo chroot myroot /bin/sh` 로 실행해 내부에서 `ps` 를 쳐보자. 아래와 같은 Error 가 발생한다.

```text
Error, do this: mount -t proc proc /proc
```

아래 순서로 해결
1. `mkdir proc`
2. `mount -t proc proc /proc`

> **mount**: HDD, USB, CD-ROM 같은 물리적 저장 장치나 외부 파일 시스템을 리눅스의 Directory 구조에 연결하여 사용자가 접근할 수 있도록 만드는 과정
> * Window 같은 경우 USB 를 장착하면 `C:\`, `D:\`, `E:\` 처럼 독립된 새로운 드라이브 방이 생김
> * Linux 같은 경우 모든 FileStructure 가 `/` 하나에서 시작되기 때문에, USB나 가상 메모리 장치를 Linux 에 연결하기 위해선 그 장치 안에 들어있는 File들을 기존 root tree `/` 의 특정 빈 Directory에 Mount 시켜야 함
> * `/proc`: 시스템이 부팅될 때 kernel에 의해 memory에 생성되는 가상 파일 시스템(procfs), 현재 실행 중인 process의 상태, CPU 및 메모리 사용량 등 os와 hw의 실시간 정보를 제공, Host 에 위치함
> * `mount -t proc proc /proc` 는 `~/tmp/myroot/proc` 에서도 kernel 의 정보를 볼수 있게 mount 해주는 command

그 결과로 chroot 로 격리된 shell 에서 `ps` 실행이 가능해 진다.

> `ps aux` 를 하면 Host 에서 실행중인 전체 process 가 격리된 shell 에도 노출이 되는 문제가 발생하고 있다. chroot 를 이용해 FileSystem 은 격리했지만, Process 조회 권한은 전혀 격리하지 않았기 때문

### 요약
1. `sh`, `ls` 실행 파일을 copy/paste: 경로에 모으기 (패키징)
2. 경로에 가둬서 실행 (격리)