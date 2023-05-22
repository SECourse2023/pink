module.exports = {
  apps: [
    {
      script: './build/index.js',
      cwd: './apps/server'
    },
    {
      script: '../../node_modules/next/dist/bin/next',
      args: 'start',
      cwd: './apps/ui'
    }
  ]
}
