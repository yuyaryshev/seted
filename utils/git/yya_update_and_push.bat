@echo off
@echo This command:
@echo merges master to yya and then yya to master.
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
git checkout master
git merge yya
pause
git push
git checkout yya
