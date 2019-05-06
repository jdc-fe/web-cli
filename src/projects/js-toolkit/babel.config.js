module.exports = {
  presets: [
    [
      '@babel/env',
      {
        modules: false,
        useBuiltIns: 'entry',
        corejs: { version: 3, proposals: true },
        shippedProposals: true,
        targets: { ie: 9 }
      }
    ]
  ]
};
