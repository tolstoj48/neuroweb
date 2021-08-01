// Tests maxLength mongoose validator
module.exports.itShouldTestMaxConditions = function itShouldTestMaxConditions(oneTaskData, Task, chai, property) {
  it(`shouldn´t create Task with too long property ${property}`, function (done) {
    let nameProperty = Task.schema.obj[property];
    let maxLength = nameProperty.maxLength;
    let maxLengthValue = maxLength[0];
    let maxLengthText = maxLength[1];
    oneTaskData[property] = ''.padStart(maxLengthValue + 2, "#");
    const novaTask = new Task(oneTaskData);
    novaTask.save(function (err) {
      chai.expect(err).to.exist
        .and.be.instanceof(Error)
        // Should equal to particulat validator condition
        .and.have.property("message", `Task validation failed: ${property}: ${maxLengthText}`)
      oneTaskData[property] = ''.padStart(maxLengthValue, "#");
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
    oneTaskData[property] = ''.padStart(minLengthValue - 1, "#");
    const novaTask = new Task(oneTaskData);
    novaTask.save(function (err) {
      chai.expect(err).to.exist
        .and.be.instanceof(Error)
        // Should equal to particulat validator condition
        .and.have.property("message", `Task validation failed: ${property}: ${minLengthText}`)
      oneTaskData[property] = ''.padStart(minLengthValue, "#");
      done();
    });
  });
}