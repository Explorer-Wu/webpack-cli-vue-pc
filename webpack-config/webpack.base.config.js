"use strict";
const path = require("path");
const webpack = require("webpack"); //访问内置的插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const HappyPackPlugin = require("./happypack.plugin");

const utils = require("./utils");
const config = require("./index");
const vueLoaderConfig = require("./vue-loader.conf");

const createLintingRule = () => ({
  test: /\.(js|vue)$/, // |jsx|ts|tsx
  enforce: "pre",
  exclude: /\/node_modules\//,
  include: [utils.resolve("src"), utils.resolve("test")],
  // include: [utils.resolve('src'), utils.resolve('libs'), utils.resolve('test')],
  // use: 'happypack/loader?id=eslint'
  loader: "eslint-loader",
  options: {
    formatter: require("eslint-friendly-formatter"),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
});

const styleLintRule = () => ({
  test: /\.css$/,
  exclude: /\/node_modules\//,
  loader: "postcss-loader",
  // use: ["vue-style-loader", "css-loader", "postcss-loader"],
  enforce: "pre",
  // include: [utils.resolve('src'), utils.resolve('static'), utils.resolve('test')],
  options: {
    sourceMap: true,
    plugins: [
      require("stylelint")(),
      require("postcss-import")({
        root: utils.resolve("/"),
        path: [utils.resolve("src"), utils.resolve("static"), utils.resolve("test")]
      }),
      require("postcss-cssnext")()
    ]
  }
});

module.exports = {
  context: utils.resolve("/"),
  entry: {
    app: [
      // '@babel/polyfill',
      "./src/main.js" //resolve('/src/main.js')
    ]
  },
  output: {
    path: config.build.assetsRoot, //path: resolve('/dist'),
    filename: "[name].[hash]js",
    chunkFilename: "[name].[chunkhash].js", //决定 non-entry chunk(非入口 chunk) 的名称
    //publicPath: "/"
    publicPath:
      process.env.NODE_ENV === "production"
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
  },
  module: {
    // noParse: /lodash/, // 忽略未采用模块化的文件，因此jquery或lodash将不会被下面的loaders解析
    rules: [
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } },
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      // ...(config.dev.useStylelint ? [styleLintRule()] : []),
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: vueLoaderConfig
        // use: 'happypack/loader?id=vue'
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [
          utils.resolve("src"),
          utils.resolve("test"),
          utils.resolve("node_modules/webpack-dev-server/client")
        ]
      },
      // {
      //   test: /\.js$/,
      //   exclude: /\/node_modules\//,
      //   include: process.env.NODE_ENV === 'production'? [
      //     utils.resolve('src'),
      //     utils.resolve('test'),
      //   ] : [
      //     utils.resolve('src'),
      //     utils.resolve('libs'),
      //     utils.resolve('test'),
      //     // utils.resolve('node_modules/webpack-dev-server/client')
      //   ],
      //   // loader: 'babel-loader',
      //   use: 'happypack/loader?id=babel'
      // },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("images/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("media/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("fonts/[name].[hash:7].[ext]")
        }
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new ManifestPlugin({
      fileName: "asset-manifest.json",
      // publicPath: '/',
      basePath: config.build.assetsRoot,
      publicPath:
        process.env.NODE_ENV === "production"
          ? config.build.assetsPublicPath
          : config.dev.assetsPublicPath,
      generate: (seed, files) => {
        const manifestFiles = files.reduce(function(manifest, file) {
          manifest[file.name] = file.path;
          return manifest;
        }, seed);

        return {
          files: manifestFiles
        };
      }
    }),
    //自动生成html文件
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./public/index.html", //resolve('/public/index.html'),
      title: "Vue App webpack template for PC",
      inject: true,
      hash: true,
      cache: true,
      // chunks: ['main', 'vendors'],
      chunksSortMode: "dependency",
      favicon: utils.resolve("public/static/images/favicon.ico")
    })
    // ...HappyPackPlugin
  ],

  optimization: {
    // runtimeChunk 默认为false,runtime相关的代码(各个模块之间的引用和加载的逻辑)内嵌入每个entry
    runtimeChunk: true,
    //splitChunks（代码分割）主要就是根据不同的策略来分割打包出来的bundle。对应废弃插件：CommonsChunkPlugin
    splitChunks: {
      chunks: "async", // 默认‘async’。共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块)
      minSize: 30000, // 模块超过30k自动被抽离成公共模块
      minChunks: 1, // 最小公用模块次数，默认为1。模块被引用>=1次，便分割
      maxAsyncRequests: 5, // 异步加载chunk的并发请求数量<=5
      maxInitialRequests: 3, // 一个入口并发加载的chunk数量<=3
      automaticNameDelimiter: "~", // 命名分隔符
      //name 分割的js名称，默认为true，返回${cacheGroup的key} ${automaticNameDelimiter} ${moduleName},可以自定义。
      name: true, // 默认由模块名+hash命名，名称相同时多个模块将合并为1个，可以设置为function
      //cacheGroups缓存策略，默认设置了分割node_modules和公用模块。内部的参数可以和覆盖外部的参数。
      cacheGroups: {
        default: {
          // 模块缓存规则，设置为false，默认缓存组将禁用
          minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
          priority: -20, // 优先级， 该配置项是设置处理的优先级，数值越大越优先处理
          reuseExistingChunk: true // 是否复用存在的chunk，默认使用已有的模块，
        },
        vendors: {
          name: "vendor",
          chunks: "initial",
          priority: -10,
          reuseExistingChunk: false,
          test: /[\\/]node_modules[\\/]/
        },
        manifest: {
          name: "manifest",
          chunks: "initial"
        },
        styles: {
          name: "styles",
          test: /\.css|less|sass|scss|stylus$/,
          chunks: "all", // merge all the css chunk to one file
          enforce: true
        }
      }
    },
    // occurrenceOrder 只在Mode: production下设置为true
    occurrenceOrder: true, // To keep filename consistent between different modes (for example building only)
    //在编译出错时，使用 optimization.noEmitOnErrors 来跳过生成阶段(emitting phase)。这可以确保没有生成出错误资源。而 stats 中所有 assets 中的 emitted 标记都是 false
    noEmitOnErrors: true,

    //“作用域提升(scope hoisting)”, 仅适用于由 webpack 直接处理的 ES6 模块。在使用转译器(transpiler)时，你需要禁用对模块的处理（例如 Babel 中的 modules 选项）。
    // 默认 optimization.concatenateModules 在生产模式下被启用，而在其它情况下被禁用。
    concatenateModules: false, //对应废弃插件：ModuleConcatenationPlugin
    //告知 webpack 去确定那些由模块提供的导出内容，为 export * from ... 生成更多高效的代码。 默认 optimization.providedExports 会被启用。
    providedExports: true
  },

  resolve: {
    //webpack 解析模块时应该搜索的目录, （不适用于对 loader 解析）
    modules: [
      // 指定以下目录寻找第三方模块，避免webpack往父级目录递归搜索
      utils.resolve("libs"),
      utils.resolve("node_modules"),
      utils.resolve("src")
    ],
    //mainFields将决定在 package.json 中使用哪个字段导入模块。根据 webpack 配置中指定的 target 不同，默认值也会有所不同。
    // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
    mainFields: ["jsnext:main", "browser", "main"], // 只采用main字段作为入口文件描述字段，减少搜索步骤
    extensions: [
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".json",
      ".vue",
      ".css",
      ".scss",
      ".less",
      ".tpl",
      "png",
      "jpg",
      "jpeg",
      "gif"
    ],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": utils.resolve("/src"),
      "@views": utils.resolve("/src/views"),
      "@components": utils.resolve("/src/components"),
      "@router": utils.resolve("/src/router"),
      "@store": utils.resolve("/src/store"),
      "@utils": utils.resolve("/src/utils"),
      "@api": utils.resolve("/src/api"),
      "@assets": utils.resolve("/src/assets"),
      public: utils.resolve("/public")
      // 'mockserver': utils.resolve('/mockserver'),
    }
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: true, //boolean | "mock" | "empty"
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    process: true, //boolean | "mock"
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    module: "empty",
    dgram: "empty",
    dns: "mock",
    fs: "empty",
    http2: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  }
};
