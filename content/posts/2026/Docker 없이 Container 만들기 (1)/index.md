---
title: "Docker 없이 Container 만들기 (1)"
description: "Docker container 와 Host 의 차이점 설명"
date: "2026-07-01"
keywords: "Docker, Linux"
---

## Intro
> https://youtu.be/lVtgqmjv4BQ?si=w8j9JNusPcsaz2Fd

* **docker**: Container 를 다루기 위한 tool
* **Container**: 격리하는 환경을 통칭
* **전용 환경**: bin 와 같은 App 실행에 필요한 의존성 라이브러리들과 함깨 패키징, 그리고 해당 환경을 Server 내에서 격리, 자원할당 및 관리

> Container 는 Linux 기반 기술이기 때문에 Linux 환경이 필요함

> 실습 환경: [https://github.com/sam0kim/container-internal](https://github.com/sam0kim/container-internal)

> Prompt: `#` 은 root 계정, `$` 는 일반 계정, 붙여넣기를 해서 앞에 Symbol 이 없을 경우 앞에서 사용했던 Prompt 를 사용

### busybox
```bash
sudo docker run -it busybox
```

이후 `ls` 명령어로 Container 의 root directory 를 확인해보면 Host 의 root directory 와는 다르다는걸 확인 가능, 많은 사람들(강의 제공자 분들 포함, 나)이 Container 도 OS 를 부팅하는건가? 라고 착각이 되는 대목

### FileSystem 비교
```bash
df -h
```

Container 의 FileSystem 과 Host 의 FileSystem 을 비교해보면 **Container 의 root directory 는 FileSystem 이 `overlay` 로 보인다.**

```bash
Filesystem                Size      Used Available Use% Mounted on
overlay                  47.4G      5.7G     41.7G  12% /
tmpfs                    64.0M         0     64.0M   0% /dev
shm                      64.0M         0     64.0M   0% /dev/shm
/dev/sda1                47.4G      5.7G     41.7G  12% /etc/resolv.conf
/dev/sda1                47.4G      5.7G     41.7G  12% /etc/hostname
/dev/sda1                47.4G      5.7G     41.7G  12% /etc/hosts
tmpfs                   477.1M         0    477.1M   0% /proc/acpi
tmpfs                    64.0M         0     64.0M   0% /proc/interrupts
tmpfs                    64.0M         0     64.0M   0% /proc/kcore
tmpfs                    64.0M         0     64.0M   0% /proc/keys
tmpfs                    64.0M         0     64.0M   0% /proc/latency_stats
tmpfs                   477.1M         0    477.1M   0% /proc/scsi
tmpfs                    64.0M         0     64.0M   0% /proc/timer_list
tmpfs                   477.1M         0    477.1M   0% /sys/firmware
```

아래 Host 의 FileSystem 과는 다른 모습

```bash
Filesystem      Size  Used Avail Use% Mounted on
tmpfs            96M  1.1M   95M   2% /run
efivarfs        256K   21K  231K   9% /sys/firmware/efi/efivars
/dev/sda1        48G  5.7G   42G  13% /
tmpfs           478M     0  478M   0% /dev/shm
tmpfs           5.0M     0  5.0M   0% /run/lock
/dev/sda16      881M  156M  664M  19% /boot
/dev/sda15      105M  6.2M   99M   6% /boot/efi
tmpfs            96M   12K   96M   1% /run/user/1001
```

Linux 는 모든게 File 이란 말이 있듯, rootFileSystem 이 다르단 부분은 사실상 모든게 다르단 것과 동일한 의미를 가짐, 향후 이게 무엇을 의미하는지 다루어볼 예정

### Process 비교
```bash
ps aux
```

Container 의 Process 는 2개가 보이는 부분, 특이점으론 1번 Process 가 shell 인 부분도 체크

```
/ # ps aux
PID   USER     TIME  COMMAND
    1 root      0:00 sh
    8 root      0:00 ps aux
```

> Host 에선 수많은 Process 가 돌아가는 중

### Network 비교
```bash
ip link
```

Container 기준 OSI 7 Layer 중 Link Layer 의 LOOPBACK 과 Ethernet 장치들이 Container 내부에 구현되어 있는걸 확인 가능
```bash
PID   USER     TIME  COMMAND
    1 root      0:00 sh
    8 root      0:00 ps aux
/ # ip link
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: eth0@if516: <BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN> mtu 1500 qdisc noqueue
    link/ether 2a:97:20:61:14:11 brd ff:ff:ff:ff:ff:ff
```

> 중요한건 Network 도 다르단 부분, Host 에서 80번 Port 를 이미 써도 Container 에선 80번 Port 를 사용해도 전혀 상관없는 이유

### hostname 비교

```bash
hostname
```

* Container: `a2158d52b12a`
* Host: `instance-20260429-2325`

> 본인의 환경은 Oracle Cloud, Ubuntu 24.04 LTS

### uid, gid 비교

```bash
id
```

* Container: `uid=0(root) gid=0(root) groups=0(root),10(wheel)`
* Host: `uid=1001(ubuntu) gid=1001(ubuntu) groups=1001(ubuntu),4(adm),24(cdrom),27(sudo),30(dip),105(lxd)`

> 살펴볼 점은 Container 는 App 이 실행될 환경인데, root 권한이 있다는 점, App 실행에 root 권한이 주어지는건 보안적으로 굉장히 취약한 부분이기에, Container 의 root 와 Host 의 root 츼 차이점에 대해서도 한번 짚고 넘어가야할 부분