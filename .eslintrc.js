// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 6,
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    // jest: true
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  // // check if imports actually resolve
  // settings: {
  //   'import/resolver': {
  //     webpack: {
  //       config: 'webpack-config/webpack.base.config.js'
  //     }
  //   }
  // },

  // // required to lint *.vue files
  // plugins: [
  //   "vue",
  //   "node"
  // ],
  globals: {
    name: "off"
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
  rules: {
    'global-require': 0,
    'import/first': 0,
    'no-multi-assign': 0,
    'no-extra-semi': 0,//禁止不必要的分号
    // allow async-await
    'generator-star-spacing': 0, // 强制 generator 函数中 * 号周围使用一致的空格
    'indent': 0,
    // 要求或禁止使用分号而不是 ASI（这个才是控制行尾部分号的，）
    'semi': 0, //['error', 'always'],
    // 要求对象字面量属性名称用引号括起来
    'quote-props': 0,
    // 强制使用一致的反勾号、双引号或单引号
    'quotes': 0,
    // 强制分号之前和之后使用一致的空格
    'semi-spacing': 0,
    // 要求同一个声明块中的变量按顺序排列
    'sort-vars': 0,
    // 强制在块之前使用一致的空格
    'space-before-blocks': 0,
    // 强制在 function的左括号之前使用一致的空格
    'space-before-function-paren': 0,
    // 强制在圆括号内使用一致的空格
    'space-in-parens': 0,
    // 要求操作符周围有空格
    'space-infix-ops': 0,
    // 强制在一元操作符前后使用一致的空格
    'space-unary-ops': 0,
    // 强制在注释中 // 或 /* 使用一致的空格
    'spaced-comment': 0,
    'linebreak-style': 0,
    'strict': 0, // 要求或禁止使用严格模式指令
    'eqeqeq': 0,
    'curly': 0,
    'yoda': 0, // 要求或禁止 “Yoda” 条件 [2, "never"],
    'wrap-iife': 0, // 要求 IIFE 使用括号括起来 [2, "any"],
    'key-spacing': 0, // 强制在对象字面量的属性中键和值之间使用一致的间距
    'keyword-spacing': 0, // 强制在关键字前后使用一致的空格 (前后腰需要)
    'block-spacing': 0, // 禁止或强制在单行代码块中使用空格(禁用)
    'no-loop-func': 0, // 禁止在循环中出现 function 声明和表达式
    'no-labels': 0, //  禁用标签语句
    'no-extra-label': 0, // 禁用不必要的标签
    'consistent-return': 0, //  要求 return 语句要么总是指定返回的值，要么不指定
    'padded-blocks': 0, // 要求或禁止块内填充
    // override default options for rules from base configurations
    'comma-dangle': 0,
    "default-case": 0, // switch 语句强制 default 分支，也可添加 // no default 注释取消此次警告
    'no-plusplus':0, // 禁止使用一元操作符 ++ 和 --
    'prefer-const': 0, //要求使用 const 声明那些声明后不再被修改的变量
    'no-cond-assign': 0, // 禁止条件表达式中出现赋值操作符
    'no-mixed-requires': 0,  // 禁止混合常规 var 声明和 require 调用
    'no-mixed-operators':0, // 禁止混合使用不同的操作符
    'no-mixed-spaces-and-tabs': 0, //不允许空格和 tab 混合缩进
    'no-tabs': 0,
    'no-else-return': 0, // 禁止 if 语句中有 return 之后有 else
    'arrow-spacing': 0, // 强制箭头函数的箭头前后使用一致的空格
    'object-curly-spacing': 0,  // 强制在花括号中使用一致的空格
    'constructor-super': 0, //要求在构造函数中有 super() 的调用
    'no-class-assign': 0, //禁止修改类声明的变量
    'no-const-assign': 0, //禁止修改 const 声明的变量
    'no-unused-vars': 0,  // 禁止出现未使用过的变量
    'no-unused-expressions': 0, // 禁止出现未使用过的表达式
    'no-underscore-dangle': 0,  // 禁止标识符中有悬空下划线_bar
    'block-scoped-var': 0, // 强制把变量的使用限制在其定义的作用域范围内
    'vars-on-top': 0, // 要求所有的 var 声明出现在它们所在的作用域顶部
    'no-eval': 0, // 禁用 eval()
    'no-var': 0, //要求使用 let 或 const 而不是 var
    'one-var': 0, // 强制函数中的变量要么一起声明要么分开声明
    'one-var-declaration-per-line':0, // 要求或禁止在 var 声明周围换行
    'no-use-before-define': 0, // 不允许在变量定义之前使用它们
    'no-shadow': 0, // 禁止 var 声明 与外层作用域的变量同名
    'no-confusing-arrow': 0, //disallow arrow functions where they could be confused with comparisons
    'object-shorthand': 0, //要求或禁止对象字面量中方法和属性使用简写语法
    'prefer-arrow-callback': 0, //要求使用箭头函数作为回调
    'arrow-parens': 0,  // 要求箭头函数的参数使用圆括号
    'arrow-body-style': 0, //要求箭头函数体使用大括号
    'template-curly-spacing': 0, //要求或禁止模板字符串中的嵌入表达式周围空格的使用
    'no-trailing-spaces': 0, //  禁用行尾空格
    'no-undef': 0, // 禁用未声明的变量，除非它们在 /*global */ //注释中被提到
    'no-undef-init': 0, // 禁止将变量初始化为 undefined
    'no-bitwise': 0, // 禁用按位运算符
    'no-restricted-syntax': 0, // 禁止使用特定的语法
    'guard-for-in': 0,  // 要求 for-in 循环中有一个 if 语句
    'eol-last': 0, // 文件末尾强制换行
    'max-len': 0, // 强制一行的最大长度 [1,200]
    'max-lines':0,// 强制最大行数
    'camelcase': 0, // 双峰驼命名格式
    'prefer-template': 0, //要求使用模板字面量而非字符串连接
    'array-callback-return': 0, // 强制数组方法的回调函数中有 return 语句
    'no-array-constructor': 0,
    'radix': 0, // 强制在parseInt()使用基数参数
    'no-restricted-properties': 0,
    'no-useless-concat': 0, // 禁止不必要的字符串字面量或模板字面量的连接
    // 禁止 if 作为唯一的语句出现在 else 语句中
    'no-lonely-if': 0,
    'no-useless-return': 0,
    'no-script-url': 0, //禁止使用 javascript: url
    'no-alert': 0, // 禁用 alert、confirm 和 prompt
    'no-empty': 0,
    //要求或禁止命名的 function 表达式
    'func-names': ['error', 'never'],
    'newline-per-chained-call': 1,// 要求方法链中每个调用都有一个换行符
    'import/newline-after-import': 0,
    'import/prefer-default-export': 0,
    'import/no-mutable-exports': 0,
    'import/no-unresolved': 0,
    // {{#if_eq lintConfig "standard"}}
    // // allow async-await
    // 'generator-star-spacing': 'off',
    // {{/if_eq}}
    // {{#if_eq lintConfig "airbnb"}}
    // don't require .vue extension when importing
    'import/extensions': 0,
    // ['error', 'always', {
    //   js: 'never',
    //   vue: 'never'
    // }],
    'import/no-duplicates': 0,
    'import/order': 0,
    'import/no-self-import': 0,
    'import/no-cycle': 0,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'import/no-useless-path-segments': 0,
    'no-unneeded-ternary': 0,
    'lines-around-directive': 0,
    'prefer-destructuring': 0,
    // disallow reassignment of function parameters 不允许对 function 的参数进行重新赋值
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': 0,
    // 'no-param-reassign': ['error', {
    //   props: true,
    //   ignorePropertyModificationsFor: [
    //     'state', // for vuex state
    //     'acc', // for reduce accumulators
    //     'e' // for e.returnvalue
    //   ]
    // }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    'no-nested-ternary': 0,
    'no-prototype-builtins': 0,
    'no-multi-spaces': 0,
    'import/no-extraneous-dependencies': 0,
    // allow debugger during development
    'no-multiple-empty-lines': process.env.NODE_ENV === 'production' ? 'warn' : 'off',  //["error", { "max": 2, "maxBOF": 1}],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  }
};
