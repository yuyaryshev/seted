@echo off
@echo This command:
@echo merges master to yya
@echo So yya is updated from master and then all yya is pushed into master
cd ../../
cls
git status
@echo There should be no uncommited changes or untracked files
pause
git pull
git checkout yya
git merge master
pause
git push
pause
