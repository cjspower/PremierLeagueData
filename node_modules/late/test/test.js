var chai = require('chai')
chai.should()
chai.use(require('chai-interface'))

describe('late', function () {
  var late = require('../')
  
  it('reads things from a director', function () {
    late('./test').should.have.interface({
      'test.bliss': Function
    })
  })

  it('compiles bliss template functions', function () {
    var template = late('./test')['test.bliss']
    template('world').should.equal('\n<p>hello world!</p>')
  });
})