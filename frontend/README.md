## Run project
1.  clone repo
2. cd dir
3. npm install
4. npm run div

## Save Component Images

Store all component-related images in the `assets` folder.

## Styling

Use **SCSS** instead of CSS — it’s more convenient and powerful.
Reference: [ChatGPT Link](https://chatgpt.com/c/6908c919-d854-8321-b931-df1d23756263)

## Absolute Paths

Use imports like:

```js
import ... from '@/assets'
```

instead of long relative paths like `'../../../assets'`.

## Recommendations

Add some **responsive styles**, for example:

```scss
@media (max-width: 580px) {
  ...
}
```
