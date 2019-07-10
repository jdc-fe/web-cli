# name of the package
a simple, concise description of what it does. [link to demo](http://your-name.github.io/repository-name)

![example image](public/example.jpg)

## Install
```
npm install -S <your project name>
```

## Rquirements
- node 10.8.0

### Usage
- by es6 import
    ```javascript
    import Animal from 'js-toolkit';

    const cat = new Animal({ name: 'cat' });
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
            var cat = new Animal({ name: 'cat' })
            cat.say('miao miao')
        })();
        </script>
      </body>
    </html>
    ```
## API

### `const animal = new Animal(options)`
Create a new `animal` instance

options
attribute|type|description
--|--|--
name|string|name of animal

methods
method|returns|description
--|--|--
say(`<string>msg`)|none|will print `<name> say <msg>`

## Development
- `npm start`
  - web server will open http://localhost:3000
- `npm run build`

## feature list
### 0.1.0
- [ ] todo feature 1
- [ ] todo feature 2
- [ ] todo feature 3

## [Reference](https://github.com/Leaflet/Leaflet/blob/master/PLUGIN-GUIDE.md#demo)
