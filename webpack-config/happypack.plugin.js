// const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const HappyPack = require("happypack");
const os = require("os"); // node 提供的系统操作模块
//创建 happypack 共享进程池，其中包含 x 个子进程
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length }); // 根据我的系统的内核数量 指定线程池个数 也可以其他数量
// const postcssNormalize = require('postcss-normalize');
const config = require("./index");
const utils = require("./utils");
const vueLoaderConfig = require("./vue-loader.conf");
// var ROOT_PATH = path.join(__dirname, '../');

const cssLoaders = function(options) {
  options = options || {};
  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    if(!options.sourceMap) {
      return {
        loader: loader + "-loader",
      };
    } else {
      return {
        loader: loader + "-loader",
        options: {
          ...loaderOptions,
          sourceMap: options.sourceMap
        }
      };
    }
  }

  return {
    css: generateLoaders("css"),
    postcss: generateLoaders("postcss"),
    less: generateLoaders("less"),
    // sass: generateLoaders('sass', { indentedSyntax: true }),
    // scss: generateLoaders('sass'),
    // stylus: generateLoaders("stylus"),
    // styl: generateLoaders("stylus")
  };
};
// Generate loaders for standalone style files (outside of .vue)
const styleLoaders = function(options) {
  const output = [];
  const loaders = cssLoaders(options);

  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push(loader);
  }
  console.log("styleLoaders:", output);

  //MiniCssExtractPlugin只用在 production 配置中，并且在loaders链中不使用 style-loader, 特别是在开发中使用HMR，因为这个插件暂时不支持HMR
  if (options.extract) {
    return output;
  } else {
    return ["vue-style-loader"].concat(output);
  }
  // return ["vue-style-loader"].concat(output);
};

const HappyPackPlugin = [
  new HappyPack({
    /** 必须配置, 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件 **/
    // id 标识符，要和 rules 中指定的 id 对应起来
    id: "eslint",
    // 配置的对应文件实际需要运行的 loader，用法和 rules 中 Loader 配置一样
    // 可以直接是字符串，也可以是对象形式
    loaders: [
      {
        loader: "eslint-loader",
        options: {
          emitWarning: !config.dev.showEslintErrorsInOverlay,
          formatter: require("eslint-friendly-formatter"),
          eslintPath: require.resolve("eslint")
        }
      }
    ],
    // 是否允许 HappyPack 输出日志，默认是 true
    verbose: true,
    //verboseWhenProfiling: Boolean 开启webpack --profile ,仍然希望HappyPack产生输出。
    //启用debug 用于故障排查。默认 false
    debug: true,
    // tmpDir: 存放打包缓存文件的位置
    // 是否开启缓存，目前缓存如果开启，(注: 会以数量级的差异来缩短构建时间，很方便日常开发)
    // cache: false,
    // cachePath: 存放缓存文件映射配置的位置
    // 代表开启几个子进程去处理这一类型的文件，默认是3个，类型必须是整数。
    // threads: 3,
    // 使用共享进程池中的进程处理任务, 代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
    threadPool: happyThreadPool
    // verboseWhenProfiling: Boolean 开启webpack --profile ,仍然希望HappyPack产生输出。
  }),
  //js 编译多线程
  new HappyPack({
    id: "babel",
    loaders: [
      {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
          /*cacheDirectory是用来缓存编译结果，下次编译加速*/
          cacheDirectory: true, //process.env.NODE_ENV === 'development' ? true : false,
          cacheCompression:
            process.env.NODE_ENV === "production" ? true : false,
          compact: process.env.NODE_ENV === "production" ? true : false
          // plugins: ['@babel/plugin-syntax-dynamic-import','transform-object-rest-spread']
        }
      }
    ],
    debug: true,
    threadPool: happyThreadPool
  }),
  //vue 编译多线程
  new HappyPack({
    id: "vue",
    loaders: [
      {
        loader: "vue-loader",
        options: vueLoaderConfig
      }
    ],
    debug: true,
    threadPool: happyThreadPool
  }),
  // css 编译多线程
  new HappyPack({
    id: "styles",
    loaders:
      process.env.NODE_ENV === "production"
        ? styleLoaders({
            // sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCSS: true
            // tests: 'css|postcss|less|sass'
          })
        : styleLoaders({
            // sourceMap: config.dev.cssSourceMap,
            usePostCSS: true
            // tests: 'css|less'
          }),
    debug: true,
    threadPool: happyThreadPool
  }),

  // sass 编译多线程
//   new HappyPack({
//     id: "sass",
//     threadPool: happyThreadPool,
//     // loaders: process.env.NODE_ENV === 'production' ? ['css-loader', 'sass-loader']:['style-loader', 'css-loader', 'sass-loader']
//     loaders:
//       process.env.NODE_ENV === "production"
//         ? utils.threadLoaders({
//             sourceMap: config.build.productionSourceMap,
//             extract: true,
//             usePostCSS: false
//           })
//         : utils.threadLoaders({
//             // sourceMap: config.dev.cssSourceMap,
//             usePostCSS: false
//           })
//   }),

  // image 编译多线程
  new HappyPack({
    id: "image",
    loaders: [
      {
        loader: require.resolve("url-loader"),
        options: {
          limit: 10000,
          // name: '[name].[ext]',
          name: utils.assetsPath("img/[name].[hash:7].[ext]")
        }
      }
    ],
    threadPool: happyThreadPool
  })
];

module.exports = HappyPackPlugin;
