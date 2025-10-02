표준 작전 절차서: 중앙 DB 첩보 배포 (Phase 2)
작전 목표: 로컬 시스템에 생성된 최신 blacklist.json 파일을 GitHub 중앙 정보 저장소로 안전하게 전송한다.

사전 조건:

첩보 수집 완료: update_blacklist_node.js 실행을 통해 blacklist.json 파일이 최신 상태로 업데이트되었는지 확인.

작전 구역 이동: 보안 터미널(Git Bash, VS Code 터미널 등)을 열고, phishguard-blacklist-db GitHub 저장소를 clone한 폴더로 이동.

첩보 배치: 업데이트된 blacklist.json 파일을 해당 폴더로 복사 또는 이동.

1단계: 작전 구역 상태 확인
명령어: git status

임무: 현재 작전 구역의 변경 사항을 확인한다. blacklist.json 파일이 '수정됨(modified)' 상태로 보고되는지 확인한다.

2단계: 첩보 준비 (Staging)
명령어: git add blacklist.json

임무: 배포할 첩보(blacklist.json)를 전송 목록에 공식적으로 추가한다.

3단계: 첩보 기록 (Commit)
명령어: git commit -m "Update blacklist - $(date)"

임무: 전송할 첩보에 공식 기록(버전 설명 및 시간)을 남긴다. 이 기록은 추후 모든 작전 일지에서 추적 가능하다.

4단계: 중앙 DB로 전송 (Push)
명령어: git push origin main

임무: 기록된 첩보를 보안 채널을 통해 중앙 정보 저장소(GitHub)로 전송한다. 이 명령이 성공하면, 모든 현장 요원(사용자)이 새로운 정보를 내려받을 준비가 완료된다.

작전 완료 후 확인 사항:

GitHub 저장소에 접속하여 blacklist.json 파일의 내용과 최종 수정 시간이 정상적으로 변경되었는지 육안으로 최종 확인한다.