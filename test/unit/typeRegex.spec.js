const typeRegex = require('../../src/typeRegex')

describe('typeRegex', () => {
  describe('replace', () => {
    let clork
    const timestemp = Date.now()
    before(() => {
      clork = sinon.useFakeTimers(timestemp)
    })

    after(() => {
      clork.restore()
    })
    it('replace script tag, the tag src with no query', () => {
      const str = `<script type="text/javascript" src="../dist/index.min.js"></script>`
      const replacedStr = typeRegex.replace(str, 'script')
      expect(replacedStr).toEqual(`<script type="text/javascript" src="../dist/index.min.js?t=${timestemp}"></script>`)
    })

    it('replace script tag, the tag src with query', () => {
      const str = `<script type="text/javascript" src="../dist/index.min.js?t=1510912034329"></script>`
      const replacedStr = typeRegex.replace(str, 'script')
      expect(replacedStr).toEqual(`<script type="text/javascript" src="../dist/index.min.js?t=${timestemp}"></script>`)
    })

    it('replace script tag, the tag src is x.js', () => {
      const str = `<script type="text/javascript" src="x.js"></script>`
      const replacedStr = typeRegex.replace(str, 'script')
      expect(replacedStr).toEqual(`<script type="text/javascript" src="x.js?t=${timestemp}"></script>`)
    })

    it('replace link tag, the tag href is x', () => {
      const str = `<link rel="stylesheet" type="text/css" href="asdf.css?t=">`
      const replacedStr = typeRegex.replace(str, 'link')
      expect(replacedStr).toEqual(`<link rel="stylesheet" type="text/css" href="asdf.css?t=${timestemp}">`)
    })

  })

  describe('filterTypes', () => {
    it(`input: script,css. should return ['script']`, () => {
      expect(typeRegex.filterTypes('script,css')).toEqual(['script'])
    })
  })

  describe('restore', () => {
    it('replace script tag, remove t=timestemp from src', () => {
      const str = `<script type="text/javascript" src="x.js?t=123213"></script>`
      const replacedStr = typeRegex.restore(str, 'script')
      expect(replacedStr).toEqual(`<script type="text/javascript" src="x.js"></script>`)
    })
  })
})