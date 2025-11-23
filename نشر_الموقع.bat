@echo off
chcp 65001 >nul
echo ====================================
echo    نشر موقع منظومة المهندس
echo ====================================
echo.

echo [1/4] إضافة الملفات...
git add web/
git add .github/
git add دليل_نشر_الموقع.md

echo.
echo [2/4] حفظ التغييرات...
git commit -m "تحديث الموقع الإلكتروني"

echo.
echo [3/4] رفع إلى GitHub...
git push origin main

echo.
echo [4/4] تم!
echo.
echo ====================================
echo الموقع سيكون متاحاً خلال 2-5 دقائق على:
echo https://etqa.github.io/engineer-system-updates/
echo ====================================
echo.

pause
