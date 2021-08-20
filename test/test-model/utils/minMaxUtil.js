// Tests maxLength mongoose validator
module.exports.itShouldTestMaxConditionsTask = function itShouldTestMaxConditionsTask(oneTaskData, Task, chai, property) {
  it(`shouldn´t create Task with too long property ${property}`, function (done) {
    let nameProperty = Task.schema.obj[property];
    let maxLength = nameProperty.maxLength;
    let maxLengthValue = maxLength[0];
    let maxLengthText = maxLength[1];
    oneTaskData[property] = ''.padStart(maxLengthValue + 2, '#');
    const newTask = new Task(oneTaskData);
    newTask.save(function (err) {
      chai.expect(err).to.exist
        .and.be.instanceof(Error)
        // Should equal to particulat validator condition
        .and.have.property('message', `Task validation failed: ${property}: ${maxLengthText}`)
      oneTaskData[property] = ''.padStart(maxLengthValue, '#');
      done();
    });
  });
}

// Tests maxLength mongoose validator
module.exports.itShouldTestMaxConditionsComment = function itShouldTestMaxConditionsComment(oneCommentData, Comment, chai, property) {
  it(`shouldn´t create Comment with too long property ${property}`, function (done) {
    let nameProperty = Comment.schema.obj[property];
    let maxLength = nameProperty.maxLength;
    let maxLengthValue = maxLength[0];
    let maxLengthText = maxLength[1];
    oneCommentData[property] = ''.padStart(maxLengthValue + 2, '#');
    const newComment = new Comment(oneCommentData);
    newComment.save(function (err) {
      chai.expect(err).to.exist
        .and.be.instanceof(Error)
        // Should equal to particulat validator condition
        .and.have.property('message', `comment validation failed: ${property}: ${maxLengthText}`)
      oneCommentData[property] = ''.padStart(maxLengthValue, '#');
      done();
    });
  });
}

// Tests minLength mongoose validator
module.exports.itShouldTestMinConditions = function itShouldTestMinConsitions(oneTaskData, Task, chai, property) {
  it(`shouldn´t create Task with too short property ${property}`, function (done) {
    let nameProperty = Task.schema.obj[property];
    let minLength = nameProperty.minLength;
    let minLengthValue = minLength[0];
    let minLengthText = minLength[1];
    oneTaskData[property] = ''.padStart(minLengthValue - 1, '#');
    const newTask = new Task(oneTaskData);
    newTask.save(function (err) {
      chai.expect(err).to.exist
        .and.be.instanceof(Error)
        // Should equal to particulat validator condition
        .and.have.property('message', `Task validation failed: ${property}: ${minLengthText}`)
      oneTaskData[property] = ''.padStart(minLengthValue, '#');
      done();
    });
  });
}