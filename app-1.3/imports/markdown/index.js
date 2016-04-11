import marked from 'marked';

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight(code) {
    return highlight.highlightAuto(code).value;
  },
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

export default marked;
