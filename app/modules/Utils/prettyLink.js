// Link modifier
MainApp.Utils.prettyLink = (text) => (
  text.replace(/href/g, 'class="AnimatedLink basic" href')
  .replace(/SNVEL/g,
    '<a class="AnimatedLink basic" href="http://www.snvel.fr" target="_blank">SNVEL</a>')
);
