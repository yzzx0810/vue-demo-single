const webpack = require('webpack');
const prodWebpackConfig = require('./webpack.config.prod');
const ora = require('ora');//实现node命令行环境的loading效果，和显示各种状态的图标等
const chalk = require('chalk');//颜色插件

const spinner = ora({
    text: 'building for production...',
    color: 'cyan',//图标的颜色
    hideCursor: true,//隐藏光标
    interval: 100//图标旋转时间间隔
}).start();

webpack(prodWebpackConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
        // 在这里处理错误
        spinner.fail(chalk.red('building failed...'));
        process.exit(1);
    }
    // 处理完成
    spinner.succeed(chalk.green('building succeed'));
    console.log(chalk.cyan('Build complete.\n'));
    console.log(chalk.yellow(
            'Tip: built files are meant to be served over an HTTP server.\n' +
            'Opening test.html over file:// won\'t work.\n'
    ));
});

// setTimeout(() => {
//   spinner.fail('building succeeded...');
// }, 2000);