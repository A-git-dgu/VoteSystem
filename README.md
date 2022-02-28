# <img width="33" alt="logo" src="https://user-images.githubusercontent.com/80964004/155874809-cf871a75-e302-4031-9064-c8037a9c47d3.png"> 투표아지트 (Voting A.git) 

투표 아지트는 안전한 전자투표를 위해 **블록체인을 활용한 투표 시스템**입니다. <br>
블록체인 구현을 위해 **MetaMask**<img width="20" alt="logo" src="https://user-images.githubusercontent.com/26293917/155936348-7252ac8f-a1eb-4fbc-9a04-99361b7a4169.png">(extension)와 **Ganache**<img width="15" alt="logo" src="https://user-images.githubusercontent.com/26293917/155936982-37b6da8a-9b9f-4335-bddd-4412bac56bdc.png"> (For test)를 사용했습니다.

Voting A.git is a voting system using blockchain for safe electronic voting.<br>
We used **MetaMask**<img width="20" alt="logo" src="https://user-images.githubusercontent.com/26293917/155936348-7252ac8f-a1eb-4fbc-9a04-99361b7a4169.png">(extension)와 **Ganache**<img width="15" alt="logo" src="https://user-images.githubusercontent.com/26293917/155936982-37b6da8a-9b9f-4335-bddd-4412bac56bdc.png"> (For test) for blockchain implementation.

## 실행방법 (Usage)

```bash
cd VoteSystem/frontend-blockchain/client
npm install
npm install -g truffle
truffle compile

python runserver manage.py
npm start
```

## 주요기능 소개 (Main Functions)
![image](https://user-images.githubusercontent.com/80963996/155933631-ec9a322f-0070-4599-8e14-42e52e2a57a5.png) <br><br>
투표 아지트는 **선거 관리자**와 **투표자**로 사용자가 나뉘어 사용됩니다. <br>
사용자는 사용 목적에 맞게 관리자 혹은 투표자로 가입하여 아래와 같은 기능을 사용할 수 있습니다.

The users of the voting A.git are divided into election administrator and voters.<br>
The user can use the following functions as an administrator or voter according to the purpose of use.

>  관리자
>   - 선거 개설
>   - 입후보자 관리
>   - 선거정보 관리
>   - 유권자 명부 등록
>   - 선거 종료
>   - 개표 및 선거 결과 조회

>  투표자
>   - 투표
>   - 선거 조회
>   - 선거 정보 조회
>   - 선거 결과 조회
>   - 입후보자 등록


>  Administrator
>   - Opening an election
>   - Candidate management
>   - Election information management
>   - Registering the voter list
>   - Closing an election
>   - Ballot count and Check the election results

>  Voter
>   - Voting
>   - Check election
>   - Check election information
>   - Check the election results
>   - Registration as a candidate


## build requirements

![Generic badge](https://img.shields.io/badge/python-3.8-f2e164.svg?logo=python&logoColor=f2e164)
![Generic badge](https://img.shields.io/badge/django-3.2.9-75b88c.svg?logo=django&logoColor=75b88c)
![Generic badge](https://img.shields.io/badge/react-17.0.2-97d6f8.svg?logo=react&logoColor=97d6f8)
![Generic badge](https://img.shields.io/badge/MySQL-8.0.24-d99734.svg?logo=mysql&logoColor=d99734)
![Generic badge](https://img.shields.io/badge/mui-4.12.3-4e67e6.svg?logo=mui&logoColor=4e67e6)
