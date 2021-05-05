describe('Our application', function() {

  // This is the name of the test
  it('should understand basic mathematical principles', function(done) {

    // We want this test to pass.
    const i = 5
    
    if (i === 5) {
      // If the behavior is as expected, call done with no argument.
      done()
    } else {
      // Otherwise, call done with an error.
      done(new Error('Not sure what\'s happened.'))
    }

  })

})