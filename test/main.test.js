require('jest'); // for code / autocompletion

var footer = require('../');
var Vinyl = require('vinyl');

describe('gulp-footer', function() {
  var fakeFile;

  function getFakeFile(fileContent) {
    return new Vinyl({
      path: './test/fixture/file.js',
      cwd: './test/',
      base: './test/fixture/',
      contents: Buffer.from(fileContent || '', 'utf8'),
    });
  }

  beforeEach(function() {
    fakeFile = getFakeFile('Hello world');
  });

  describe('footer', function() {
    it('file should pass through', function(done) {
      expect.assertions(8);

      var file_count = 0;
      var stream = footer();
      stream.on('data', function(newFile) {
        expect(newFile).toBeDefined();
        expect(newFile.path).toBeDefined();
        expect(newFile.relative).toBeDefined();
        expect(newFile.contents).toBeDefined();
        expect(newFile.path).toBe('./test/fixture/file.js');
        expect(newFile.relative).toBe('file.js');
        expect(newFile.contents.toString()).toBe('Hello world');
        ++file_count;
      });

      stream.once('end', function() {
        expect(file_count).toBe(1);
        done();
      });

      stream.write(fakeFile);
      stream.end();
    });

    it('should append the footer to the file content', function(done) {
      expect.assertions(2);

      var stream = footer(' : before I said');
      stream.on('data', function(newFile) {
        expect(newFile.contents).toBeDefined();
        expect(newFile.contents.toString()).toBe('Hello world : before I said');
      });
      stream.once('end', done);

      stream.write(fakeFile);
      stream.end();
    });

    it('should format the footer', function(done) {
      expect.assertions(2);

      var stream = footer(' : and then <%= foo %> said', { foo: 'you' });
      stream.on('data', function(newFile) {
        expect(newFile.contents).toBeDefined();
        expect(newFile.contents.toString()).toBe('Hello world : and then you said');
      });
      stream.once('end', done);

      stream.write(fakeFile);
      stream.end();
    });

    it('should format the footer (ES6 delimiters)', function(done) {
      expect.assertions(2);

      var stream = footer(' : and then ${foo} said', { foo: 'you' });
      stream.on('data', function(newFile) {
        expect(newFile.contents).toBeDefined();
        expect(newFile.contents.toString()).toBe('Hello world : and then you said');
      });
      stream.once('end', done);

      stream.write(fakeFile);
      stream.end();
    });

    it('should access to the current file', function(done) {
      expect.assertions(2);

      var stream = footer('\n<%= file.relative %>\n<%= file.path %>');
      stream.on('data', function(newFile) {
        expect(newFile.contents).toBeDefined();
        expect(newFile.contents.toString()).toBe('Hello world\nfile.js\n./test/fixture/file.js');
      });
      stream.once('end', done);

      stream.write(fakeFile);
      stream.end();
    });
  });
});
