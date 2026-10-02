window.MathJax = {
  loader: {
    load: ['[tex]/boldsymbol']
  },
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    processEscapes: true,
    processEnvironments: true,
    packages: {'[+]': ['boldsymbol']},
  },
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex"
  },
  startup: {
    typeset: false,
    pageReady: () => MathJax.startup.defaultPageReady().then(() => {
      let pageVersion = 0;
      document$.subscribe(() => {
        const version = ++pageVersion;
        MathJax.startup.promise = MathJax.startup.promise
          .then(() => {
            if (version !== pageVersion) return;
            MathJax.startup.output.clearCache();
            MathJax.typesetClear();
            MathJax.texReset();
            return MathJax.typesetPromise();
          })
          .catch(error => console.error("MathJax typesetting failed:", error));
      });
    })
  }
};
