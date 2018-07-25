module.exports = {
  PROJECT_TYPES: ['vue-eslint'],
  SOURCE_PATH_PREFIX: './projects',
  LOG_PREFIX: 'web-cli',
  EXCLUDE: {
    directory: ['node_modules'],
    file: ['package-lock.json']
  },
  // fix gitignore be renamed to npmignore
  // [from, to]
  RENAME: ['.npmignore', '.gitignore'],
  Logo: `


  ▄▀▀▄    ▄▀▀▄  ▄▀▀█▄▄▄▄  ▄▀▀█▄▄       ▄▀▀▄ ▄▀▀▄  ▄▀▄▄▄▄
  █   █    ▐  █ ▐  ▄▀   ▐ ▐ ▄▀   █     █   █    █ █ █    ▌
  ▐  █        █   █▄▄▄▄▄    █▄▄▄▀      ▐  █    █  ▐ █
    █   ▄    █    █    ▌    █   █        █    █     █
     ▀▄▀ ▀▄ ▄▀   ▄▀▄▄▄▄    ▄▀▄▄▄▀         ▀▄▄▄▄▀   ▄▀▄▄▄▄▀
           ▀     █    ▐   █    ▐                  █     ▐
                 ▐        ▐                       ▐
  `
}