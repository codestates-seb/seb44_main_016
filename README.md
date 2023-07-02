## twin.macro 사전 작업

### 1. 'Tailwind Twin IntelliSense'라는 VSCode 플러그인을 설치한다
https://marketplace.visualstudio.com/items?itemName=lightyen.tailwindcss-intellisense-twin

### 2. settings.json에 세팅을 추가한다

```Ctrl + Shift + P```를 눌러서 Show all commands 검색창 열기.

![image](https://github.com/codestates-seb/seb44_pre_022/assets/65957855/ef640df4-5e8d-4c7b-a330-743609d25e34)

'Preferences: Open Settings (JSON)'이라고 검색 & 열기.

settings.json 파일 맨 아래에 해당 코드 추가

```json
/* Tailwind CSS IntelliSense 설정 */
"scss.validate": false,
"editor.quickSuggestions": {
    "strings": true
},
"editor.autoClosingQuotes": "always",
"tailwindCSS.experimental.classRegex": [
    "tw`([^`]*)", // tw`...`
    "tw='([^']*)", // <div tw="..." />
    "tw={'([^'}]*)", // <div tw={"..."} />
    "tw\\.\\w+`([^`]*)", // tw.xxx`...`
    "tw\\(.*?\\)`([^`]*)" // tw(Component)`...`
],
"tailwindCSS.includeLanguages": {
  "typescript": "javascript",
  "typescriptreact": "javascript"
}
```

↓ 아래 사진처럼 되어 있으면 OK ↓

![image](https://github.com/codestates-seb/seb44_pre_022/assets/65957855/d9e238ea-8db4-467b-9c5f-6230268fd7cf)


### 3. VSCode 하단의 CRLF를 LF로 바꾼다

[Before] 👎
![image](https://github.com/codestates-seb/seb44_pre_022/assets/65957855/0b44894f-ff3d-4196-8544-6704a36f97a6)

[After] 👍
![image](https://github.com/codestates-seb/seb44_pre_022/assets/65957855/ebca1816-1ee3-4165-9dfe-34c2caac3a65)

Prettier에서는 오작동 방지를 위해 CRLF 대신 LF를 사용할 것을 권장하고 있다. 그래서 (굳이 tw 때문이 아니더라도) 모든 .tsx 파일의 설정을 LF로 바꿔놓는 게 좋다.

### 4. 결과
(예시: w-40 / text-center / bg-pink-500)
![tw 자동완성](https://github.com/codestates-seb/seb44_pre_022/assets/65957855/47e8668e-cc0a-4a48-922d-bb169dfcd417)

Tailwind 코드를 넣었을 때 이런 식으로 자동 완성이 되는지 확인해야 한다.