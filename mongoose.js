const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  comments: Array
}, {versionKey: 'commentcount'});

const Books = mongoose.model('Books', bookSchema);

const findBooksArr = (done) => {
  Books.find({}, ['title', '_id', 'commentcount'], (err, docs) => {
    if (err) return console.error(err);
    done(null, docs);
  });
}

const addBook = (title, done) => {
  Books.create({title: title}, (err, doc) => {
    if (err) return console.error(err);
    doc.save((err, data) => {
      if (err) return console.error(err);
      done(null, data)
    });
  });
}

const deleteAll = (done) => {
  Books.deleteMany({}, err => {
    if (err) return console.error(err);
    done(null); 
  });
}

const findBook = (id, done) => {
  Books.findById(id, (err, doc) => {
    if (err || !doc) return done(null, null);
    done(null, doc);
  });
}

const addComment = (id, comment, done) => {
  Books.findById(id, (err, doc) => {
    if (err || !doc) return done(null, null);
    doc.comments.push(comment);
    doc.save((err, data) => {
      if (err) return console.error(err);
      done(null, data)
    });
  })
}

const deleteOne = (id, done) => {
  Books.findByIdAndDelete(id, (err, doc) => {
    if (err || !doc) return done(null, null);
    done(null, doc);
  });
}

exports.findBooksArr = findBooksArr;
exports.addBook = addBook;
exports.deleteAll = deleteAll;
exports.findBook = findBook;
exports.addComment = addComment;
exports.deleteOne = deleteOne;