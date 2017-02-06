#gulp
##安装
Gulp需要全局安装，然后再在项目的开发目录中安装为本地模块。

1. 全局安装 gulp：

		$ npm install -g gulp
		
	如果安装失败，有可能是你没有root用户权限，可以尝试一下：

		$ sudo install -g gulp

2. 作为项目的开发依赖（devDependencies）安装：

		$ npm install --save-dev gulp
		
3. 在项目根目录下创建一个名为 gulpfile.js 的文件：

		var gulp = require('gulp');
		gulp.task('default', function() {
		  // 将你的默认的任务代码放在这
		});
		
	上面代码中，gulpfile.js加载gulp模块之后，使用gulp模块的task方法指定任务default。task方法有两个参数，第一个是任务名，第二个是任务函数。
	
4. 运行 gulp：

		$ gulp
		
	默认的名为 default 的任务（task）将会被运行，在这里，这个任务并未做任何事情。    
想要单独执行特定的任务（task），请输入 
		
		gulp <task> <othertask>。
		
除了安装gulp以外，不同的任务还需要安装不同的gulp插件模块。举例来说，下面代码安装了gulp-uglify模块。

	$ npm install --save-dev gulp-uglify

##gulpfile.js
项目根目录中的gulpfile.js，是Gulp的配置文件。

##gulp模块的方法
src、dest、task、watch

###1. src()
**gulp.src(globs[, options])**

- globs    
	类型： String 或 Array，所要读取的 glob 或者包含 globs 的数组。
- options    
	类型： Object
	- options.buffer   
	类型： Boolean 默认值： true，如果该项被设置为 false，那么将会以 stream 方式返回 file.contents 而不是文件 buffer 的形式。这在处理一些大文件的时候将会很有用。**注意：**插件可能并不会实现对 stream 的支持。    
	- options.read    
	类型： Boolean 默认值： true，如果该项被设置为 false， 那么 file.contents 会返回空值（null），也就是并不会去读取文件。    
	- options.base    
	类型： String 默认值 如, 请想像一下在一个路径为 client/js/somedir 的目录中，有一个文件叫 somefile.js ：     
	
		gulp.src('client/js/**/*.js') // 匹配 'client/js/somedir/somefile.js' 并且将 `base` 解析为 `client/js/`
		  .pipe(minify())
		  .pipe(gulp.dest('build'));  // 写入 'build/somedir/somefile.js'
		
		gulp.src('client/js/**/*.js', { base: 'client' })
		  .pipe(minify())
		  .pipe(gulp.dest('build'));  // 写入 'build/js/somedir/somefile.js'
		  
		  
	
gulp模块的src方法，用于产生数据流。它的参数表示所要处理的文件，这些指定的文件会转换成数据流。参数的写法一般有以下几种形式。

- js/app.js：指定确切的文件名。
- js/*.js：某个目录所有后缀名为js的文件。
- js/\*\*/*.js：某个目录及其所有子目录中的所有后缀名为js的文件。
- !js/app.js：除了js/app.js以外的所有文件。
- *.+(js|css)：匹配项目根目录下，所有后缀名为js或css的文件。

src方法的参数还可以是一个数组，用来指定多个成员。

	gulp.src(['js/**/*.js', '!js/**/*.min.js'])
	

###2. dest()
**gulp.dest(path[, options])**

- path    
	类型： String or Function，文件将被写入的路径（输出目录）。也可以传入一个函数，在函数中返回相应路径。
- options    
	类型： Object
	- options.cwd    
	类型： String 默认值： process.cwd()，输出目录的 cwd 参数，只在所给的输出目录是相对路径时候有效。    
	- options.mode    
	类型： String 默认值： 0777，八进制权限字符，用以定义所有在输出目录中所创建的目录的权限。

dest方法将管道的输出写入文件，同时将这些输出继续输出，所以可以依次调用多次dest方法，将输出写入多个目录。如果有目录不存在，将会被新建。

	gulp.src('./client/templates/*.jade')
	  .pipe(jade())
	  .pipe(gulp.dest('./build/templates'))
	  .pipe(minify())
	  .pipe(gulp.dest('./build/minified_templates'));
	  
dest方法还可以接受第二个参数，表示配置对象。

	gulp.dest('build', {
	  cwd: './app',
	  mode: '0644'
	})
	
配置对象有两个字段。cwd字段指定写入路径的基准目录，默认是当前目录；mode字段指定写入文件的权限，默认是0777。

###3. task()
**gulp.task(name[, deps], fn)**

- name    
	任务的名字，如果你需要在命令行中运行你的某些任务，那么，请不要在名字中使用空格。
- deps    
	类型： Array，一个包含任务列表的数组，这些任务会在你当前任务运行之前完成。
- fn    
	该函数定义任务所要执行的一些操作。


task方法用于定义具体的任务。它的第一个参数是任务名，第二个参数是任务函数。下面是一个非常简单的任务函数。

	gulp.task('greet', function () {
	   console.log('Hello world!');
	});
	
task方法还可以指定按顺序运行的一组任务。

	gulp.task('build', ['css', 'js', 'imgs']);
	
上面代码先指定build任务，它由css、js、imgs三个任务所组成，task方法会并发执行这三个任务。注意，由于每个任务都是异步调用，所以没有办法保证js任务的开始运行的时间，正是css任务运行结束。

如果希望各个任务严格按次序运行，可以把前一个任务写成后一个任务的依赖模块。

	gulp.task('css', ['greet'], function () {
	   // Deal with CSS here
	});
	
上面代码表明，css任务依赖greet任务，所以css一定会在greet运行完成后再运行。

task方法的回调函数，还可以接受一个函数作为参数，这对执行异步任务非常有用。

	// 执行shell命令
	var exec = require('child_process').exec;
	gulp.task('jekyll', function(cb) {
	  // build Jekyll
	  exec('jekyll build', function(err) {
	    if (err) return cb(err); // return error
	    cb(); // finished task
	  });
	});
	
如果一个任务的名字为default，就表明它是“默认任务”，在命令行直接输入gulp命令，就会运行该任务。

	gulp.task('default', function () {
	  // Your default task
	});
	// 或者
	gulp.task('default', ['styles', 'jshint', 'watch']);
	
执行的时候，直接使用gulp，就会运行styles、jshint、watch三个任务。

###4. watch()
**gulp.watch(glob [, opts], tasks) 或 gulp.watch(glob [, opts, cb])**

监视文件，并且可以在文件发生改动时候做一些事情。它总会返回一个 EventEmitter 来发射（emit） change 事件。

**gulp.watch(glob[, opts], tasks)**

- glob    
	类型： String or Array，一个 glob 字符串，或者一个包含多个 glob 字符串的数组，用来指定具体监控哪些文件的变动。
- opts    
	类型： Object
- tasks    
	类型： Array
	
**gulp.watch(glob[, opts, cb])**

- glob    
	类型： String or Array，一个 glob 字符串，或者一个包含多个 glob 字符串的数组，用来指定具体监控哪些文件的变动。
- opts    
	类型： Object
- cb(event)
	类型： Function，每次变动需要执行的 callback。

		gulp.watch('js/**/*.js', function(event) {
		  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		});
		
	callback 会被传入一个名为 event 的对象。这个对象描述了所监控到的变动：

	- event.type
		类型： String，发生的变动的类型：added, changed 或者 deleted。
	- event.path
		类型： String，触发了该事件的文件的路径。


watch方法用于指定需要监视的文件。一旦这些文件发生变动，就运行指定任务。

	gulp.task('watch', function () {
	   gulp.watch('templates/*.tmpl.html', ['build']);
	});
	
上面代码指定，一旦templates目录中的模板文件发生变化，就运行build任务。

watch方法也可以用回调函数，代替指定的任务。

	gulp.watch('templates/*.tmpl.html', function (event) {
	   console.log('Event type: ' + event.type);
	   console.log('Event path: ' + event.path);
	});

另一种写法是watch方法所监控的文件发生变化时（修改、增加、删除文件），会触发change事件。可以对change事件指定回调函数。

	var watcher = gulp.watch('templates/*.tmpl.html', ['build']);
	watcher.on('change', function (event) {
	   console.log('Event type: ' + event.type);
	   console.log('Event path: ' + event.path);
	});

除了change事件，watch方法还可能触发以下事件。

- end：回调函数运行完毕时触发。
- error：发生错误时触发。
- ready：当开始监听文件时触发。
- nomatch：没有匹配的监听文件时触发。

watcher对象还包含其他一些方法。

- watcher.end()：停止watcher对象，不会再调用任务或回调函数。
- watcher.files()：返回watcher对象监视的文件。
- watcher.add(glob)：增加所要监视的文件，它还可以附件第二个参数，表示回调函数。
- watcher.remove(filepath)：从watcher对象中移走一个监视的文件。


##gulp-load-plugins模块
一般情况下，gulpfile.js中的模块需要一个个加载。

	var gulp = require('gulp'),
	    jshint = require('gulp-jshint'),
	    uglify = require('gulp-uglify'),
	    concat = require('gulp-concat');
	
	gulp.task('js', function () {
	   return gulp.src('js/*.js')
	      .pipe(jshint())
	      .pipe(jshint.reporter('default'))
	      .pipe(uglify())
	      .pipe(concat('app.js'))
	      .pipe(gulp.dest('build'));
	});
	
上面代码中，除了gulp模块以外，还加载另外三个模块。

这种一一加载的写法，比较麻烦。使用gulp-load-plugins模块，可以加载package.json文件中所有的gulp模块。上面的代码用gulp-load-plugins模块改写，就是下面这样。

	var gulp = require('gulp'),
	    gulpLoadPlugins = require('gulp-load-plugins'),
	    plugins = gulpLoadPlugins();
	
	gulp.task('js', function () {
	   return gulp.src('js/*.js')
	      .pipe(plugins.jshint())
	      .pipe(plugins.jshint.reporter('default'))
	      .pipe(plugins.uglify())
	      .pipe(plugins.concat('app.js'))
	      .pipe(gulp.dest('build'));
	});
	
上面代码假设package.json文件包含以下内容。

	{
	   "devDependencies": {
	      "gulp-concat": "~2.2.0",
	      "gulp-uglify": "~0.2.1",
	      "gulp-jshint": "~1.5.1",
	      "gulp": "~3.5.6"
	   }
	}


##gulp-livereload模块
gulp-livereload模块用于自动刷新浏览器，反映出源码的最新变化。它除了模块以外，还需要在浏览器中安装插件，用来配合源码变化。

	var gulp = require('gulp'),
	    less = require('gulp-less'),
	    livereload = require('gulp-livereload'),
	    watch = require('gulp-watch');
	
	gulp.task('less', function() {
	   gulp.src('less/*.less')
	      .pipe(watch())
	      .pipe(less())
	      .pipe(gulp.dest('css'))
	      .pipe(livereload());
	});
	
上面代码监视less文件，一旦编译完成，就自动刷新浏览器。
