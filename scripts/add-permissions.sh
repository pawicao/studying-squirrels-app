sed -i '/<uses-permission*/ a <uses-permission android:name="android.permission.CAMERA" /><uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />' ./android/app/src/main/AndroidManifest.xml
sed -i '/<application*/ a android:usesCleartextTraffic="true"' ./android/app/src/main/AndroidManifest.xml
sed -i '/studying_squirrels_ui/c\<string name="app_name">Studying Squirrels</string>' ./android/app/src/main/res/values/strings.xml
cp -R ./src/assets/icons/res ./android/app/src/main