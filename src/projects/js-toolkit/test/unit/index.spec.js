const Animal = require('../../src/index');

describe('test animal', () => {
  it('normal，print cat say hello', () => {
    const name = 'cat';
    const msg = 'hello';
    const stub = sinon.stub(console, 'log').callsFake((log) => {
      assert(log === `${name} say ${msg}`);
    });
    const cat = new Animal({ name });
    assert(cat.name === name);
    stub.restore();
  });

  it('normal, no option will print no name', () => {
    const msg = 'hello';
    const stub = sinon.stub(console, 'log').callsFake((log) => {
      assert(log === ` say ${msg}`);
    });
    const cat = new Animal();
    cat.say(msg);
    stub.restore();
  });
});
