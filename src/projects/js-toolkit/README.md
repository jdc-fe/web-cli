# javascript toolkit base project

## Usage
```
npm install -S <your project name>
```

### Example
- by es6 import
    ```javascript
    import JSToolkit from 'js-toolkit';

    const cat = new JSToolkit({ name: 'cat' });
    cat.say('miao miao');
    ```

- by html
    ```html
    <html>
      <body>
        <!-- todo something -->
        <script type="text/javascript" src="/index.js"></script></body>
        <script>
        (function() {
            var cat = new JSToolkit({ name: 'cat' })
            cat.say('miao miao')
        })();
        </script>
      </body>
    </html>
    ```

![example image](public/example.jpg)

## Development
- `npm start`
  - web server will open http://localhost:3000
- `npm run build`

## Envirenment
- node `v10.8.0`

## feature list
### 0.1.0
- [ ] todo feature 1
- [ ] todo feature 2
- [ ] todo feature 3