const babel = require('gulp-babel');
const gulp = require('gulp');
const gulpRm = require('gulp-rimraf');
const rm = require('rimraf');
var exec = require('child_process').exec;

gulp.task('cleandocs', () => {
	return gulp
		.src(['docs/**/*', '!docs/textlogo.svg', '!docs/documentation.yml'])
		.pipe(gulpRm());
});

gulp.task('predocs', () => {
	return gulp
		.src('src/**/*')
		.pipe(
			babel({
				only: 'src/**/*.js',
				presets: ['flow'],
				plugins: [
					'dynamic-import-webpack',
					'syntax-object-rest-spread',
					'syntax-class-properties',
					'syntax-jsx'
				]
			})
		)
		.pipe(gulp.dest('temp'));
});

gulp.task('makedocs', ['predocs'], cb => {
	exec(
		'npx documentation build temp/** -o docs -c docs/documentation.yml -f html',
		(err, stdout, stderr) => {
			console.log(stdout);
			console.log(stderr);
			cb(err);
		}
	);
});

gulp.task('docs', ['predocs', 'makedocs'], cb => {
	rm('temp/', cb);
});
