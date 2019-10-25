module.exports = {
  presets: [
    // '@vue/cli-plugin-babel/preset'
    '@vue/app'
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        //style: true
        // 指定样式路径
        style: name => `${name}/style/less`
      },
      'vant'
    ]
  ]
}
