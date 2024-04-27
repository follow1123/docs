@echo off

set doc_path=%USERPROFILE%\space\code\markdown\doc

for /f %%i in ('dir %doc_path% /b') do (
  if exist "%doc_path%\%%i\*" (rmdir /s /q %doc_path%\%%i) else (del /f /q %doc_path%\%%i)
)

mdbook build

xcopy /e book\* %doc_path%
copy README.md %doc_path%

mdbook clean

