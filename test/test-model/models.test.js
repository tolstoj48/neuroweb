'use strict';

process.env.NODE_ENV = 'test';

const { oneTaskData } = require('./test-data/taskData')
  , Task = require('../../models/taskModel')
  , { oneCommentData } = require('./test-data/commentData')
  , Comment = require('../../models/commentModel')
  , { oneUserData } = require('./test-data/userData')
  , User = require('../../models/userModel')
  , { oneFileData } = require('./test-data/fileData')
  , File = require('../../models/fileModel')
  , { oneGeneData } = require('./test-data/geneData')
  , Gene = require('../../models/geneModel')
  , Mockgoose = require('mockgoose').Mockgoose
  , mongoose = require('../../node_modules/mongoose')
  , mockgoose = new Mockgoose(mongoose)
  , chai = require('chai')
  , assert = chai.assert
  , { itShouldTestMinConditions, itShouldTestMaxConditionsTask, itShouldTestMaxConditionsComment, itShouldTestMaxConditionsUser } = require('./utils/minMaxUtil')

describe('Initialize', function () {
  it('should successfully load the Task model', async () => {
    try {
      const Task = require('../../models/taskModel');
    } catch (err) {
      if (err) throw err;
    }
  });

  it('should successfully load the Comment model', async () => {
    try {
      const Comment = require('../../models/commentModel');
    } catch (err) {
      if (err) throw err;
    }
  });

  it('should successfully load the User model', async () => {
    try {
      const User = require('../../models/userModel');
    } catch (err) {
      if (err) throw err;
    }
  });

  it('should successfully load the File model', async () => {
    try {
      const File = require('../../models/fileModel');
    } catch (err) {
      if (err) throw err;
    }
  });

  it('should successfully load the Gene model', async () => {
    try {
      const Gene = require('../../models/geneModel');
    } catch (err) {
      if (err) throw err;
    }
  });
});

describe('Model Test', function () {
  this.timeout(15000);
  before(function (done) {
    // Connection to db CALLED test and promise to verify, that connection to db works
    mockgoose.prepareStorage().then(function () {
      mongoose.connect('mongodb://localhost:27017/testingDb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        // For longer imports etc. needs higher time in ms to work
        connectTimeoutMS: 3000,
      })
        .then(() => {
          // Not in testing env
          if (process.env.NODE_ENV !== 'test') console.log('Mongo DB connection open!')
          done()
        })
        .catch(err => {
          console.log('Mongo DB error of connection')
          console.log(err)
        })

    });
  });

  // Delete one new task based on own data
  after(function () {
    mongoose.connection.close(function () {
      console.log('Mongoose disconnected on app termination!')
      process.exit(0);
    })
  })

  describe('Task model test', function () {
    describe('check list of entries to Task model', function () {
      before(async function () {
        for (const category in Task.schema.obj['done'].enum) {
          oneTaskData[category] = category;
          let newTask = new Task(oneTaskData);
          await newTask.save();
        }
      });

      after(async function () {
        await Task.deleteMany({ who_wants_it: 'petrioska' });
      });

      it('should have three entries', async function () {
        const arrayOfTasks = await Task.find({});
        assert.exists(arrayOfTasks);
        assert.isArray(arrayOfTasks);
        assert.lengthOf(arrayOfTasks, 3);
      })

      it('should have particular dates', async function () {
        const arrayOfTasks = await Task.find({});
        for (let task of arrayOfTasks) {
          assert.match(task['date'], /2021-08-0/, 'correct key');
        }
      });

      it('shouldn´ have particular dates', async function () {
        const arrayOfTasks = await Task.find({});
        for (let task of arrayOfTasks) {
          assert.notMatch(task['date'], /2021-p08-0/, 'regexp does not match');
        }
      });

      it('should have particular who_wants_it', async function () {
        const arrayOfTasks = await Task.find({});
        for (let task of arrayOfTasks) {
          assert.match(task['who_wants_it'], /petrioska/, 'correct key');
        }
      });

      it('shouldn´t have particular who_wants_it', async function () {
        const arrayOfTasks = await Task.find({});
        for (let task of arrayOfTasks) {
          assert.notMatch(task['who_wants_it'], /petriosky/, 'regexp does not match');
        }
      });

      it('should have particular to_do_task', async function () {
        const arrayOfTasks = await Task.find({});
        for (let task of arrayOfTasks) {
          assert.match(task['to_do_task'], /něco/, 'correct key');
        }
      });

      it('shouldn´t have particular to_do_task', async function () {
        const arrayOfTasks = await Task.find({});
        for (let task of arrayOfTasks) {
          assert.notMatch(task['to_do_task'], /totok/, 'regexp does not match');
        }
      });

      it('should have particular done', async function () {
        const arrayOfTasks = await Task.find({});
        for (let task of arrayOfTasks) {
          assert.match(task['done'], /in process/, 'correct key');
        }
      });

      it('shouldn´t have particular done', async function () {
        const arrayOfTasks = await Task.find({});
        for (let task of arrayOfTasks) {
          assert.notMatch(task['done'], /totok/, 'regexp does not match');
        }
      });
    });

    describe('read a task', function () {
      before(async function () {
        let newTask = new Task(oneTaskData);
        await newTask.save();
      });

      after(async function () {
        await Task.deleteOne({ who_wants_it: 'petrioska' });
      });

      it('should have proper task', async function () {
        const task = await Task.find({ who_wants_it: 'petrioska' });
        assert.exists(task);
        assert.deepEqual({
          date: task[0].date,
          who_wants_it: task[0].who_wants_it,
          to_do_task: task[0].to_do_task,
          done: task[0].done,
        },
          {
            date: '2021-08-05',
            who_wants_it: 'petrioska',
            to_do_task: 'něco',
            done: 'in process',
          })
      });

      // Negativce test that throws should be in try catch block and ensure, that AssertionError is thrown
      it('unknown task should fail', async function () {
        try {
          const task = await Task.find({ date: 'badkey12' });
          assert.notExists(task);
          throw new Error('should not get here');
        } catch (err) {
          /* An error is expected, so it is an error if
          the 'should not get here' error is thrown
          */
          assert.notEqual(err.message, 'should not get here');
        }
      });
    });
  });

  describe('Comment model test', function () {
    describe('check list of entries to Comment model', function () {
      before(async function () {
        let newComment = new Comment(oneCommentData);
        await newComment.save();
      });

      after(async function () {
        await Comment.deleteOne({ name: 'Testovací komentář' });
      });

      it('should have one entry', async function () {
        const arrayOfComments = await Comment.find({});
        assert.exists(arrayOfComments);
        assert.isArray(arrayOfComments);
        assert.lengthOf(arrayOfComments, 1);
      })

      it('should have particular name', async function () {
        const comment = await Comment.find({});
        assert.match(comment[0]['name'], /Testovací komentář/, 'correct key');
      });

      it('shouldn´ have particular name', async function () {
        const comment = await Comment.find({});
        assert.notMatch(comment[0]['name'], /Fufo/, 'regexp does not match');
      });

      it('should have particular content', async function () {
        const comment = await Comment.find({});
        assert.match(comment[0]['content'], /Tohle je obsah prvního testovacího komentáře./, 'correct key');
      });

      it('shouldn´t have particular content', async function () {
        const comment = await Comment.find({});
        assert.notMatch(comment[0]['content'], /petriosky/, 'regexp does not match');
      });
    });

    describe('read a comment', function () {
      before(async function () {
        let newComment = new Comment(oneCommentData);
        await newComment.save();
      });

      after(async function () {
        await Comment.deleteOne({ name: 'Testovací komentář' });
      });

      it('should have proper comment', async function () {
        const comment = await Comment.find({ name: 'Testovací komentář' });
        assert.exists(comment);
        assert.deepEqual({
          name: comment[0].name,
          content: comment[0].content,
        },
          {
            name: 'Testovací komentář',
            content: 'Tohle je obsah prvního testovacího komentáře.',
          })
      });

      // Negative test that throws should be in try catch block and ensure, that AssertionError is thrown
      it('unknown comment should fail', async function () {
        try {
          const comment = await Comment.find({ date: 'badkey12' });
          assert.notExists(comment);
          throw new Error('should not get here');
        } catch (err) {
          /* An error is expected, so it is an error if
          the 'should not get here' error is thrown
          */
          assert.notEqual(err.message, 'should not get here');
        }
      });
    });
  });

  describe('User model test', function () {
    describe('check list of entries to User model', function () {
      before(async function () {
        let newUser = new User(oneUserData);
        await newUser.save();
      });

      after(async function () {
        await User.deleteOne({ username: 'petr' });
      });

      it('should have one entry', async function () {
        const arrayOfUsers = await User.find({});
        assert.exists(arrayOfUsers);
        assert.isArray(arrayOfUsers);
        assert.lengthOf(arrayOfUsers, 1);
      })

      it('should have particular username', async function () {
        const user = await User.find({});
        assert.match(user[0]['username'], /petr/, 'correct key');
      });

      it('shouldn´ have particular username', async function () {
        const user = await User.find({});
        assert.notMatch(user[0]['username'], /Fufo/, 'regexp does not match');
      });

      it('should have particular email', async function () {
        const user = await User.find({});
        assert.match(user[0]['email'], /p@etrioska.cz/, 'correct key');
      });

      it('shouldn´t have particular email', async function () {
        const comment = await User.find({});
        assert.notMatch(comment[0]['content'], /petriosky/, 'regexp does not match');
      });

      it('should have particular role', async function () {
        const user = await User.find({});
        assert.match(user[0]['role'], /Normal/, 'correct key');
      });

      it('shouldn´t have particular role', async function () {
        const user = await User.find({});
        assert.notMatch(user[0]['role'], /petriosky/, 'regexp does not match');
      });

      it('shouldn´t have particular password', async function () {
        const user = await User.find({});
        assert.notMatch(user[0]['password'], /petriosky/, 'regexp does not match');
      });
    });

    describe('read an user', function () {
      before(async function () {
        let newUser = new User(oneUserData);
        await newUser.save();
      });

      after(async function () {
        await User.deleteOne({ username: 'petr' });
      });

      it('should have proper user', async function () {
        const user = await User.find({ username: 'petr' });
        assert.exists(user);
        assert.deepEqual({
          username: user[0].username,
          email: user[0].email,
          role: user[0].role,
        },
          {
            username: 'petr',
            email: 'p@etrioska.cz',
            role: 'Normal',
          })
      });

      // Negative test that throws should be in try catch block and ensure, that AssertionError is thrown
      it('unknown user should fail', async function () {
        try {
          const user = await User.find({ date: 'badkey12' });
          assert.notExists(user);
          throw new Error('should not get here');
        } catch (err) {
          /* An error is expected, so it is an error if
           the 'should not get here' error is thrown
          */
          assert.notEqual(err.message, 'should not get here');
        }
      });
    });
  });

  describe('File model test', function () {
    describe('check list of entries to File model', function () {
      before(async function () {
        for (const category in File.schema.obj['status'].enum) {
          oneFileData[category] = category;
          let newFile = new File(oneFileData);
          await newFile.save();
        }
      });

      after(async function () {
        await File.deleteMany({ status: 'něco' });
      });

      it('should have two entries', async function () {
        const arrayOfFiles = await File.find({});
        assert.exists(arrayOfFiles);
        assert.isArray(arrayOfFiles);
        assert.lengthOf(arrayOfFiles, 2);
      })

      it('should have particular date_of_upload', async function () {
        const arrayOfFiles = await File.find({});
        for (let file of arrayOfFiles) {
          assert.match(file['date_of_upload'], /05-10-2021/, 'correct key');
        }
      });

      it('shouldn´ have particular date_of_upload', async function () {
        const arrayOfFiles = await File.find({});
        for (let file of arrayOfFiles) {
          assert.notMatch(file['date_of_upload'], /2021-p08-0/, 'regexp does not match');
        }
      });

      it('should have particular status', async function () {
        const arrayOfFiles = await File.find({});
        for (let file of arrayOfFiles) {
          assert.match(file['status'], /processed/, 'correct key');
        }
      });

      it('shouldn´t have particular status', async function () {
        const arrayOfFiles = await File.find({});
        for (let file of arrayOfFiles) {
          assert.notMatch(file['status'], /petriosky/, 'regexp does not match');
        }
      });

      it('should have particular local_disk_name', async function () {
        const arrayOfFiles = await File.find({});
        for (let file of arrayOfFiles) {
          assert.match(file['local_disk_name'], /josif.vcf/, 'correct key');
        }
      });

      it('shouldn´t have particular local_disk_name', async function () {
        const arrayOfFiles = await File.find({});
        for (let file of arrayOfFiles) {
          assert.notMatch(file['local_disk_name'], /totok/, 'regexp does not match');
        }
      });

      it('should have particular annotated_filename', async function () {
        const arrayOfFiles = await File.find({});
        for (let file of arrayOfFiles) {
          assert.match(file['annotated_filename'], /josif_annotated.vcf/, 'correct key');
        }
      });

      it('shouldn´t have particular annotated_filename', async function () {
        const arrayOfFiles = await File.find({});
        for (let file of arrayOfFiles) {
          assert.notMatch(file['annotated_filename'], /totok/, 'regexp does not match');
        }
      });
    });

    describe('read a file', function () {
      before(async function () {
        let newFile = new File(oneFileData);
        await newFile.save();
      });

      after(async function () {
        await File.deleteOne({ status: 'processed' });
      });

      it('should have proper file', async function () {
        const file = await File.find({ status: 'processed' });
        assert.exists(file);
        assert.deepEqual({
          local_disk_name: file[0].local_disk_name,
          annotated_filename: file[0].annotated_filename,
          status: file[0].status,
          date_of_upload: file[0].date_of_upload,
        },
          {
            local_disk_name: 'josif.vcf',
            annotated_filename: 'josif_annotated.vcf',
            status: 'processed',
            date_of_upload: '05-10-2021',
          })
      });

      // Negativce test that throws should be in try catch block and ensure, that AssertionError is thrown
      it('unknown file should fail', async function () {
        try {
          const file = await File.find({ status: 'badkey12' });
          assert.notExists(file);
          throw new Error('should not get here');
        } catch (err) {
          /* An error is expected, so it is an error if
          the 'should not get here' error is thrown
          */
          assert.notEqual(err.message, 'should not get here');
        }
      });
    });
  });

  describe('Gene model test', function () {
    describe('check list of entries to gene model', function () {
      before(async function () {
        let newgene = new Gene(oneGeneData);
        await newgene.save();
      })

      after(async function () {
        await Gene.deleteOne({ NO_CALL: 'String' });
      });

      it('should have one entry', async function () {
        const arrayOfGenes = await Gene.find({});
        assert.exists(arrayOfGenes);
        assert.isArray(arrayOfGenes);
        assert.lengthOf(arrayOfGenes, 1);
      })

      it('should have particular gNomen', async function () {
        const arrayOfgenes = await Gene.find({});
        for (let gene of arrayOfgenes) {
          assert.match(gene['gNomen'], /String/, 'correct key');
        }
      });

      it('shouldn´ have particular date_of_upload', async function () {
        const arrayOfGenes = await Gene.find({});
        for (let gene of arrayOfGenes) {
          assert.notMatch(gene['String'], /String/, 'regexp does not match');
        }
      });

    });

    describe('read a gene', function () {
      before(async function () {
        let newGene = new Gene(oneGeneData);
        await newGene.save();
      });

      after(async function () {
        await Gene.deleteOne({ gNomen: 'String' });
      });

      it('should have proper gene', async function () {
        const gene = await Gene.find({ gNomen: 'String' });
        assert.exists(gene);
        assert.deepEqual({
          Chr: gene[0].Chr,
          Start: gene[0].Start,
          End: gene[0].End,
          Ref: gene[0].Ref,
          Alt: gene[0].Alt,
          gNomen: gene[0].gNomen,
          Func_refGene: gene[0].Func_refGene,
          Gene_refGene: gene[0].Gene_refGene,
          AF_GNOMAD: gene[0].AF_GNOMAD,
          InterVar_automated: gene[0].InterVar_automated,
          clinvar: gene[0].clinvar,
          MULTI_ALLELIC: gene[0].MULTI_ALLELIC,
          HOM_VAR: gene[0].HOM_VAR,
          HET_REF: gene[0].HET_REF,
          HET_OTHER: gene[0].HET_OTHER,
          HOM_REF: gene[0].HOM_REF,
          NO_CALL: gene[0].NO_CALL,
          OTHER_GT: gene[0].OTHER_GT,
          VAR: gene[0].VAR,
          CALLED: gene[0].CALLED,
          QUAL: gene[0].QUAL,
          AC: gene[0].AC,
          AF: gene[0].AF,
          HOM_VAR_samples: gene[0].HOM_VAR_samples,
          HET_REF_samples: gene[0].HET_REF_samples,
          HET_OTHERSamples: gene[0].HET_OTHERSamples,
          HOM_REF_samples: gene[0].HOM_REF_samples,
          NO_CALL_samples: gene[0].NO_CALL_samples,
          OTHER_GT_samples: gene[0].OTHER_GT_samples,
        },
          oneGeneData
          )
      });

      // Negativce test that throws should be in try catch block and ensure, that AssertionError is thrown
      it('unknown gene should fail', async function () {
        try {
          const gene = await gene.find({ gNomen: 'badkey12' });
          assert.notExists(gene);
          throw new Error('should not get here');
        } catch (err) {
          /* An error is expected, so it is an error if
          the 'should not get here' error is thrown
          */
          assert.notEqual(err.message, 'should not get here');
        }
      });
    });
  });


  describe('Mongoose validation tests - Task', function () {
    describe('required fields', function () {
      it('shouldn´t create one task without date', function (done) {
        delete oneTaskData.date;
        const newTask = new Task(oneTaskData);
        newTask.save(function (err) {
          chai.expect(err).to.exist
            .and.be.instanceof(Error)
            .and.have.property('message', 'Task validation failed: date: Path `date` is required.')
          oneTaskData.date = '2021-07-30'
          done();
        });
      });

      it('shouldn´t create one task without done', function (done) {
        delete oneTaskData.done;
        const newTask = new Task(oneTaskData);
        newTask.save(function (err) {
          chai.expect(err).to.exist
            .and.be.instanceof(Error)
            .and.have.property('message', 'Task validation failed: done: Path `done` is required.')
          oneTaskData.done = 'in process'
          done();
        });
      });

      describe('check correct model - max and min length mongoose validators', function () {
        // Loop for lengths testing
        for (const property in Task.schema.obj) {
          if (property !== 'done') {
            if (['date'].includes(property)) {
              itShouldTestMinConditions(oneTaskData, Task, chai, property);
              itShouldTestMaxConditionsTask(oneTaskData, Task, chai, property);
            } else {
              itShouldTestMaxConditionsTask(oneTaskData, Task, chai, property);
            }
          }
        }
      });
    });
  });

  describe('Mongoose validation tests - Comment', function () {
    describe('required fields', function () {
      it('shouldn´t create one comment without name', function (done) {
        delete oneCommentData.name;
        const newComment = new Comment(oneCommentData);
        newComment.save(function (err) {
          chai.expect(err).to.exist
            .and.be.instanceof(Error)
            .and.have.property('message', 'comment validation failed: name: Path `name` is required.')
          oneCommentData.name = 'Testovací komentář'
          done();
        });
      });

      describe('check correct model - max and min length mongoose validators', function () {
        // Loop for lengths testing
        for (const property in Comment.schema.obj) {
          if (property !== 'done') {
            itShouldTestMaxConditionsComment(oneCommentData, Comment, chai, property);
          }
        }
      });
    });
  });

  describe('Mongoose validation tests - User', function () {
    describe('required fields', function () {
      it('shouldn´t create one user without role', function (done) {
        delete oneUserData.role;
        const newUser = new User(oneUserData);
        newUser.save(function (err) {
          chai.expect(err).to.exist
            .and.be.instanceof(Error)
            .and.have.property('message', 'User validation failed: role: Path `role` is required.')
          oneUserData.role = 'Normal'
          done();
        });
      });

      it('shouldn´t create one user without email', function (done) {
        delete oneUserData.email;
        const newUser = new User(oneUserData);
        newUser.save(function (err) {
          chai.expect(err).to.exist
            .and.be.instanceof(Error)
            .and.have.property('message', 'User validation failed: email: Path `email` is required.')
          oneUserData.email = 'p@trioska.cz'
          done();
        });
      });

      describe('check correct model - max and min length mongoose validators', function () {
        // Loop for lengths testing
        for (const property in User.schema.obj) {
          if (property !== 'role') {
            itShouldTestMaxConditionsUser(oneUserData, User, chai, property);
          }
        }
      });
    });
  });
});