module.exports = {
  root: true,
  extends: [ 'riophae', 'plugin:react/recommended' ],
  parser: 'babel-eslint',

  globals: {
    chrome: true,
  },

  plugins: [ 'react' ],

  settings: {
    'import/resolver': {
      node: null,
      webpack: {
        config: 'build/webpack.config.js',
      },
    },
    'import/extensions': [ '.js', '.json', '.css', '.less' ],

    react: {
      pragma: 'h',
      version: require('preact-compat').version,
    },
  },

  rules: {
    'import/no-extraneous-dependencies': 0,
    'react/no-unknown-property': [ 2, { ignore: [ 'class' ] }],
    'react/prop-types': 0,
    'no-unused-vars': [ 2, {
      varsIgnorePattern: '^h$',
    } ],
    'no-warning-comments': 0,
  },

  overrides: [ {
    files: [ '*.test.js' ],
    env: {
      jest: true,
    },
  } ],
}
